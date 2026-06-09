"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="hover:opacity-75 transition-opacity duration-300">
        <Image
          src="/images/logo.png"
          alt="Sylvara"
          width={160}
          height={40}
          className="object-contain"
          style={{ height: "32px", width: "auto" }}
          priority
        />
      </Link>

      {/* Hamburger (mobile) */}
      <button
        className="lg:hidden text-white/70 hover:text-white"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </svg>
      </button>

      {/* Nav center */}
      <nav className="hidden lg:flex items-center gap-10">
        {[
          { label: "COLLECTION", href: "/collection" },
          { label: "OUR DNA", href: "/histoire" },
          { label: "STORES", href: "/boutiques" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-xs tracking-[0.2em] text-white/70 hover:text-white transition-colors uppercase"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right actions */}
      <div className="hidden lg:flex items-center gap-3">
        {/* Currency */}
        <button className="flex items-center gap-1 text-xs tracking-widest text-white/60 hover:text-white border border-white/15 rounded px-3 py-1.5 hover:border-white/30 transition-colors">
          USD
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
        </button>
        {/* Language */}
        <button className="flex items-center gap-1 text-xs tracking-widest text-white/60 hover:text-white border border-white/15 rounded px-3 py-1.5 hover:border-white/30 transition-colors">
          EN
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
        </button>

        {/* Icons */}
        <div className="flex items-center gap-4 ml-2">
          {/* Wishlist */}
          <button className="text-white/60 hover:text-white transition-colors" aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          {/* Account */}
          <button className="text-white/60 hover:text-white transition-colors" aria-label="Account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
          {/* Cart */}
          <button className="text-white/60 hover:text-white transition-colors" aria-label="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 py-8 px-8 flex flex-col gap-6 lg:hidden">
          {[
            { label: "COLLECTION", href: "/collection" },
            { label: "OUR DNA", href: "/histoire" },
            { label: "STORES", href: "/boutiques" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-[0.2em] text-white/80 hover:text-white uppercase"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
