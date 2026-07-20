"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Collections", href: "/collections" },
  { label: "Craftsmanship", href: "/craftsmanship" },
  { label: "Commission", href: "/commission/bespoke" },
  { label: "Journal", href: "/journal" },
  { label: "Film", href: "/film" },
  { label: "Masterclass", href: "/masterclass" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-16 py-6 mix-blend-difference pointer-events-none">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-light uppercase tracking-[0.25em] text-white pointer-events-auto hover:opacity-70 transition-opacity"
        >
          Nelson
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10 pointer-events-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-white pointer-events-auto"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center gap-8 animate-in fade-in duration-300">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-8 text-foreground"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-light uppercase tracking-widest text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
