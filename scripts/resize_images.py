#!/usr/bin/env python3
"""Resize images to a maximum width while preserving their aspect ratio.

Examples:
    python scripts/resize_images.py public/images
    python scripts/resize_images.py public/images --output public/images/optimized
    python scripts/resize_images.py ./photos --max-width 1080 --quality 88

The original files are never overwritten. Pillow is required:
    python -m pip install Pillow
"""

from __future__ import annotations

import argparse
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ModuleNotFoundError as error:
    raise SystemExit(
        "Pillow não está instalado. Execute: python -m pip install Pillow"
    ) from error


SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input_dir", type=Path, help="Pasta com as imagens originais")
    parser.add_argument(
        "--output",
        dest="output_dir",
        type=Path,
        help="Pasta de saída (padrão: <input_dir>/optimized)",
    )
    parser.add_argument(
        "--max-width",
        type=int,
        default=1080,
        help="Largura máxima em pixels (padrão: 1080)",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=88,
        help="Qualidade JPEG/WebP de 1 a 100 (padrão: 88)",
    )
    parser.add_argument(
        "--prefix",
        default="RAY",
        help="Processa apenas arquivos com este prefixo (padrão: RAY; use --prefix \"\" para todos)",
    )
    return parser.parse_args()


def iter_images(input_dir: Path, output_dir: Path, prefix: str):
    """Yield supported images without accidentally reprocessing the output folder."""
    output_dir = output_dir.resolve()
    for path in input_dir.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in SUPPORTED_EXTENSIONS:
            continue
        if prefix and not path.name.lower().startswith(prefix.lower()):
            continue
        try:
            path.resolve().relative_to(output_dir)
        except ValueError:
            yield path


def save_image(image: Image.Image, destination: Path, quality: int) -> None:
    suffix = destination.suffix.lower()
    save_kwargs: dict[str, object] = {"optimize": True}

    if suffix in {".jpg", ".jpeg"}:
        if image.mode not in {"RGB", "L"}:
            image = image.convert("RGB")
        save_kwargs.update(quality=quality, progressive=True)
    elif suffix == ".webp":
        save_kwargs.update(quality=quality, method=6)
    elif suffix == ".png":
        save_kwargs["compress_level"] = 9

    image.save(destination, **save_kwargs)


def resize_one(source: Path, destination: Path, max_width: int, quality: int) -> tuple[int, int, int, int]:
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        before = image.size

        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)

        destination.parent.mkdir(parents=True, exist_ok=True)
        save_image(image, destination, quality)
        return (*before, *image.size)


def main() -> None:
    args = parse_args()
    input_dir = args.input_dir.expanduser().resolve()
    output_dir = (args.output_dir or input_dir / "optimized").expanduser().resolve()

    if not input_dir.is_dir():
        raise SystemExit(f"Pasta não encontrada: {input_dir}")
    if args.max_width < 1:
        raise SystemExit("--max-width precisa ser maior que zero.")
    if not 1 <= args.quality <= 100:
        raise SystemExit("--quality precisa estar entre 1 e 100.")

    processed = 0
    for source in iter_images(input_dir, output_dir, args.prefix):
        destination = output_dir / source.relative_to(input_dir)
        before_width, before_height, after_width, after_height = resize_one(
            source, destination, args.max_width, args.quality
        )
        processed += 1
        print(
            f"{source.relative_to(input_dir)}: "
            f"{before_width}x{before_height} -> {after_width}x{after_height}"
        )

    print(f"\n{processed} imagem(ns) salva(s) em: {output_dir}")


if __name__ == "__main__":
    main()
