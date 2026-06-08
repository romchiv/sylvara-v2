"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { watches } from "@/data/watches"

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [locked, setLocked] = useState(false)

  const total = watches.length
  const prev = (current - 1 + total) % total
  const next = (current + 1) % total

  const goTo = useCallback(
    (index: number) => {
      if (locked || index === current) return
      setLocked(true)
      setCurrent(index)
      setTimeout(() => setLocked(false), 900)
    },
    [locked, current]
  )

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, 6000)
    return () => clearInterval(t)
  }, [total])

  const watch = watches[current]

  return (
    <section className="relative w-full h-screen overflow-hidden select-none">
      {/* ── Animated background ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          className="absolute inset-0"
          style={{ background: watch.theme.bg }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20 pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#06060a] to-transparent pointer-events-none z-10" />

      {/* ── Top badges ── */}
      <div className="absolute top-24 left-10 z-20">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase text-white/80 bg-white/8 border border-white/15 backdrop-blur-sm">
          LIMITED TO{" "}
          <span style={{ color: watch.theme.accentLight }} className="font-semibold">
            {watch.limited} PIECES
          </span>
        </span>
      </div>

      <div className="absolute top-24 right-10 z-20">
        <span
          className="text-[11px] tracking-[0.25em] uppercase font-medium"
          style={{ color: watch.available ? watch.theme.accentLight : "#ff6060" }}
        >
          {watch.available ? "AVAILABLE" : "SOLD OUT"}
        </span>
      </div>

      {/* ── Watch image ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`watch-${current}`}
          className="absolute inset-0 flex items-center justify-center z-20"
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.06, y: -10 }}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={watch.image}
            alt={watch.name}
            width={500}
            height={500}
            className="object-contain w-[320px] h-[320px] md:w-[440px] md:h-[440px] lg:w-[500px] lg:h-[500px]"
            style={{
              filter: `drop-shadow(0 30px 80px ${watch.theme.glow}) drop-shadow(0 0 120px ${watch.theme.glow})`,
            }}
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Next watch thumbnail (right) ── */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <button
          onClick={() => goTo(next)}
          className="group relative w-[88px] h-[88px] rounded-xl overflow-hidden border border-white/15 hover:border-white/35 transition-all duration-300"
        >
          <div className="absolute inset-0" style={{ background: watches[next].theme.bg }} />
          <Image
            src={watches[next].image}
            alt={watches[next].name}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
          {/* Play indicator */}
          <div className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg width="6" height="6" viewBox="0 0 6 6" fill="white">
              <polygon points="1,0.5 5.5,3 1,5.5" />
            </svg>
          </div>
        </button>
      </div>

      {/* ── Info block (left) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`info-${current}`}
          className="absolute left-10 bottom-28 z-30 max-w-sm"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <p className="text-[11px] tracking-[0.3em] text-white/50 uppercase mb-2">
            {watch.ref}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none text-white mb-1">
            {watch.name.replace("SYLVARA ", "")}
          </h1>
          <p
            className="text-sm tracking-[0.15em] uppercase mb-8 font-light"
            style={{ color: watch.theme.accentLight }}
          >
            {watch.subtitle}
          </p>
          <Link
            href={`/collection/${watch.slug}`}
            className="inline-flex items-center gap-3 px-7 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: watch.theme.button,
              boxShadow: `0 0 24px ${watch.theme.glow}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = watch.theme.buttonHover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = watch.theme.button
            }}
          >
            Discover
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 6h8M7 3l3 3-3 3" />
            </svg>
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom navigation ── */}
      <div className="absolute bottom-8 left-0 right-0 px-10 z-30 flex items-center justify-between">
        {/* Prev label */}
        <button
          onClick={() => goTo(prev)}
          className="hidden sm:flex items-center gap-2.5 group"
        >
          <span className="w-6 h-px bg-white/30 group-hover:bg-white/60 transition-colors" />
          <span className="text-[10px] tracking-[0.2em] text-white/40 group-hover:text-white/70 uppercase transition-colors">
            {watches[prev].name.replace("SYLVARA ", "")}
          </span>
        </button>

        {/* Slide indicators */}
        <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
          {watches.map((w, i) => (
            <button
              key={w.slug}
              onClick={() => goTo(i)}
              className="flex items-center py-2"
              aria-label={`Go to ${w.name}`}
            >
              <motion.div
                animate={{
                  width: i === current ? 40 : 10,
                  opacity: i === current ? 1 : 0.3,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="h-[2px] rounded-full bg-white"
                style={i === current ? { backgroundColor: watch.theme.accent } : {}}
              />
            </button>
          ))}
        </div>

        {/* Next label */}
        <button
          onClick={() => goTo(next)}
          className="hidden sm:flex items-center gap-2.5 group"
        >
          <span className="text-[10px] tracking-[0.2em] text-white/40 group-hover:text-white/70 uppercase transition-colors">
            {watches[next].name.replace("SYLVARA ", "")}
          </span>
          <span className="w-6 h-px bg-white/30 group-hover:bg-white/60 transition-colors" />
        </button>
      </div>
    </section>
  )
}
