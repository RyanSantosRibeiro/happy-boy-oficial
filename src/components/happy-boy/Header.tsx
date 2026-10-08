"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BrandMark } from "./BrandMark";

const links = [{ href: "/#collection", label: "Coleção" }, { href: "/#shop", label: "Peças" }, { href: "/#about", label: "Sobre nós" }];

export function Header() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onPointer = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape" && open) { setOpen(false); trigger.current?.focus(); } };
    const media = window.matchMedia("(min-width: 761px)");
    const close = () => setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    media.addEventListener("change", close);
    return () => { document.removeEventListener("pointerdown", onPointer); document.removeEventListener("keydown", onKey); media.removeEventListener("change", close); };
  }, [open]);
  return <header className="site-header" ref={header}>
    <Link href="/#top" aria-label="Happy Boy — início" className="brand-link" onClick={() => setOpen(false)}><BrandMark /></Link>
    <nav className="desktop-nav" aria-label="Navegação principal">{links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
    <Link className="header-edition" href="/#contact"><span className="status-dot" /> Fale com a gente</Link>
    <button className="menu-button" aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)} ref={trigger}>
      <span>{open ? "Fechar" : "Menu"}</span><span className="menu-icon" data-open={open}><i /><i /></span>
    </button>
    <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação mobile" hidden={!open} onBlur={(event) => { if (!header.current?.contains(event.relatedTarget as Node | null)) setOpen(false); }}>
      {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<span aria-hidden="true">↗</span></Link>)}
      <span className="eyebrow">Happy Boy / Travel Edition / 2026</span>
    </nav>
  </header>;
}
