"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { watches } from "@/data/watches"

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [locked, setLocked] = useState(false)
  const [watchVisible, setWatchVisible] = useState(true)

  const total = watches.length
  const prev = (current - 1 + total) % total
  const next = (current + 1) % total

  const floatY = useMotionValue(0)
  useEffect(() => {
    const controls = animate(floatY, [0, -18, 0], {
      repeat: Infinity,
      duration: 5.5,
      ease: "easeInOut",
      repeatType: "mirror",
    })
    return controls.stop
  }, [floatY])

  const goTo = useCallback(
    (index: number) => {
      if (locked || index === current) return
      setLocked(true)
      setWatchVisible(false)
      setTimeout(() => {
        setCurrent(index)
        setWatchVisible(true)
        setTimeout(() => setLocked(false), 900)
      }, 100)
    },
    [locked, current]
  )

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, 7000)
    return () => clearInterval(t)
  }, [total])

  const watch = watches[current]

  return (
    <section className="relative w-full h-screen overflow-hidden select-none">

      {/* ── Animated gradient background ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          className="absolute inset-0"
          style={{ background: watch.theme.bg }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: EASE }}
        />
      </AnimatePresence>

      {/* ── Bokeh orbs ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`orbs-${current}`}
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <div className="absolute rounded-full" style={{
            width: 880, height: 880,
            left: "calc(50% - 440px)", top: "calc(50% - 440px)",
            background: `radial-gradient(circle, ${watch.theme.glow.replace(/[\d.]+\)$/, "0.32)")} 0%, transparent 65%)`,
            filter: "blur(60px)",
          }} />
          <div className="absolute rounded-full" style={{
            width: 540, height: 540,
            left: "calc(50% - 270px)", top: "calc(47% - 270px)",
            background: `radial-gradient(circle, ${watch.theme.glow.replace(/[\d.]+\)$/, "0.52)")} 0%, transparent 55%)`,
            filter: "blur(35px)",
          }} />
          <div className="absolute rounded-full" style={{
            width: 320, height: 320,
            right: "8%", top: "10%",
            background: `radial-gradient(circle, ${watch.theme.accentLight}1a 0%, transparent 65%)`,
            filter: "blur(40px)",
          }} />
        </motion.div>
      </AnimatePresence>

      {/* ── Vignettes ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(6,6,10,0.78) 0%, rgba(6,6,10,0.28) 42%, transparent 62%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,6,10,0.72) 0%, transparent 22%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,6,10,0.96) 0%, transparent 24%)" }} />
      </div>

      {/* ── Limited badge ── */}
      <div className="absolute top-24 left-10 z-20">
        <AnimatePresence mode="wait">
          <motion.span
            key={`badge-${current}`}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase text-white/80 backdrop-blur-sm"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            LIMITED TO{" "}
            <span style={{ color: watch.theme.accentLight }} className="font-semibold">{watch.limited} PIECES</span>
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── Availability ── */}
      <div className="absolute top-24 right-10 z-20">
        <AnimatePresence mode="wait">
          <motion.span
            key={`avail-${current}`}
            className="text-[11px] tracking-[0.25em] uppercase font-medium"
            style={{ color: watch.available ? watch.theme.accentLight : "#ff6060" }}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {watch.available ? "AVAILABLE" : "SOLD OUT"}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── Watch image: large, 6° tilt, floating ── */}
      <div className="absolute z-20 pointer-events-none" style={{ left: "50%", top: "50%", transform: "translate(-44%, -51%)" }}>
        <AnimatePresence mode="wait">
          {watchVisible && (
            <motion.div
              key={`watch-${current}`}
              style={{ y: floatY }}
              initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
              animate={{ opacity: 1, scale: [0.8, 1.05, 1.0], rotate: -6 }}
              exit={{ opacity: 0, scale: 1.06, rotate: -4 }}
              transition={{
                opacity: { duration: 0.9, ease: EASE },
                scale: { duration: 1.2, ease: EASE, times: [0, 0.65, 1] },
                rotate: { duration: 1.1, ease: EASE },
              }}
            >
              <Image
                src={watch.image}
                alt={watch.name}
                width={700}
                height={700}
                className="object-contain"
                style={{
                  width: "clamp(300px, 44vw, 660px)",
                  height: "clamp(300px, 44vw, 660px)",
                  filter: [
                    `drop-shadow(0 55px 130px ${watch.theme.glow})`,
                    `drop-shadow(0 15px 55px ${watch.theme.glow.replace(/[\d.]+\)$/, "0.65)")})`,
                    `drop-shadow(0 0 65px ${watch.theme.glow.replace(/[\d.]+\)$/, "0.4)")})`,
                  ].join(" "),
                }}
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Next watch thumbnail ── */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <button
          onClick={() => goTo(next)}
          className="group relative w-[88px] h-[88px] rounded-xl overflow-hidden transition-all duration-300"
          style={{ border: "1px solid rgba(255,255,255,0.12)" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.32)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
        >
          <div className="absolute inset-0" style={{ background: watches[next].theme.bg }} />
          <Image src={watches[next].image} alt={watches[next].name} fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg width="6" height="6" viewBox="0 0 6 6" fill="white"><polygon points="1,0.5 5.5,3 1,5.5" /></svg>
          </div>
        </button>
      </div>

      {/* ── Info block ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`info-${current}`}
          className="absolute left-10 bottom-28 z-30 max-w-sm"
          initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 28 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <p className="text-[10px] tracking-[0.35em] text-white/40 uppercase mb-3">{watch.ref}</p>
          <h1
            className="font-black uppercase leading-none text-white mb-2"
            style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)", letterSpacing: "-0.025em" }}
          >
            {watch.name.replace("SYLVARA ", "")}
          </h1>
          <motion.div
            key={`line-${current}`}
            className="h-px mb-4 mt-2"
            style={{ width: 160, background: `linear-gradient(90deg, ${watch.theme.accent} 0%, transparent 80%)`, transformOrigin: "left center" }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          />
          <p className="text-[11px] tracking-[0.2em] uppercase mb-8 font-light" style={{ color: watch.theme.accentLight }}>
            {watch.subtitle}
          </p>
          <Link
            href={`/collection/${watch.slug}`}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-medium text-white transition-all duration-300 hover:scale-105"
            style={{ background: watch.theme.button, boxShadow: `0 0 32px ${watch.theme.glow}, 0 4px 20px rgba(0,0,0,0.4)` }}
            onMouseEnter={(e) => { e.currentTarget.style.background = watch.theme.buttonHover }}
            onMouseLeave={(e) => { e.currentTarget.style.background = watch.theme.button }}
          >
            Discover
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 6h8M7 3l3 3-3 3" />
            </svg>
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom nav ── */}
      <div className="absolute bottom-8 left-0 right-0 px-10 z-30 flex items-center justify-between">
        <button onClick={() => goTo(prev)} className="hidden sm:flex items-center gap-2.5 group">
          <span className="w-6 h-px bg-white/25 group-hover:bg-white/55 transition-colors" />
          <span className="text-[10px] tracking-[0.2em] text-white/35 group-hover:text-white/65 uppercase transition-colors">
            {watches[prev].name.replace("SYLVARA ", "")}
          </span>
        </button>

        <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
          {watches.map((w, i) => (
            <button key={w.slug} onClick={() => goTo(i)} className="flex items-center py-2" aria-label={`Go to ${w.name}`}>
              <motion.div
                animate={{ width: i === current ? 40 : 10, opacity: i === current ? 1 : 0.25 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="h-[2px] rounded-full"
                style={i === current ? { backgroundColor: watch.theme.accent } : { backgroundColor: "rgba(255,255,255,0.4)" }}
              />
            </button>
          ))}
        </div>

        <button onClick={() => goTo(next)} className="hidden sm:flex items-center gap-2.5 group">
          <span className="text-[10px] tracking-[0.2em] text-white/35 group-hover:text-white/65 uppercase transition-colors">
            {watches[next].name.replace("SYLVARA ", "")}
          </span>
          <span className="w-6 h-px bg-white/25 group-hover:bg-white/55 transition-colors" />
        </button>
      </div>
    </section>
  )
}
