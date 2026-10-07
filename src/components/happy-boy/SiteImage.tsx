import Image, { type ImageProps } from "next/image";

/** Placeholders load directly; real local/approved remote images use Next optimization. */
export function SiteImage(props: ImageProps) {
  const temporary = typeof props.src === "string" && props.src.startsWith("https://placehold.co/");
  return <Image {...props} alt={props.alt} unoptimized={temporary || props.unoptimized} />;
}
