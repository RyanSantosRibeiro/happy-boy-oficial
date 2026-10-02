"use client";

import { useEffect, useRef, useState } from "react";
import { BrandMark } from "./BrandMark";

const links = [{ href: "#experience", label: "Collection" }, { href: "#shop", label: "Shop" }, { href: "#about", label: "About" }];

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
    <a href="#top" aria-label="Happy Boy — início" className="brand-link" onClick={() => setOpen(false)}><BrandMark /></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
    <a className="header-edition" href="#looks"><span className="status-dot" /> SEA SKY / 26</a>
    <button className="menu-button" aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)} ref={trigger}>
      <span>{open ? "Fechar" : "Menu"}</span><span className="menu-icon" data-open={open}><i /><i /></span>
    </button>
    <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação mobile" hidden={!open} onBlur={(event) => { if (!header.current?.contains(event.relatedTarget as Node | null)) setOpen(false); }}>
      {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<span aria-hidden="true">↗</span></a>)}
      <span className="eyebrow">Happy Boy / SEA SKY / 2026</span>
    </nav>
  </header>;
}
