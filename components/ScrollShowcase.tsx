"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { watches } from "@/data/watches"

const taglines: Record<string, string> = {
  terra: "Desert · Canyon · Golden Hour",
  forest: "Alpine Forest · Moss · Pine",
  glacier: "Peak · Snowfield · Pure Light",
  lagoon: "Turquoise · Horizon · Freedom",
  aurora: "Arctic Night · Mystery · Cosmos",
}

// ─── Desktop scroll-driven showcase ───────────────────────────────────────────

function DesktopShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(
      watches.length - 1,
      Math.floor(latest * watches.length)
    )
    setActiveIndex(idx)
  })

  const watch = watches[activeIndex]

  // Parallax orbs that move at different speeds based on scroll
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const orb3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])

  return (
    <div
      ref={containerRef}
      className="hidden lg:block relative"
      style={{ height: "500vh" }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: "#06060a" }}>

        {/* ── Animated background gradient ── */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`bg-desktop-${activeIndex}`}
            className="absolute inset-0"
            style={{ background: watch.theme.bg }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/20 pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#06060a] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#06060a] to-transparent pointer-events-none z-10" />

        {/* ── Parallax depth layers (blurred orbs) ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          <motion.div
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: 500,
              height: 500,
              background: watch.theme.accent,
              left: "55%",
              top: "10%",
              y: orb1Y,
            }}
          />
          <motion.div
            className="absolute rounded-full blur-2xl opacity-15"
            style={{
              width: 300,
              height: 300,
              background: watch.theme.accentLight,
              left: "70%",
              top: "55%",
              y: orb2Y,
            }}
          />
          <motion.div
            className="absolute rounded-full blur-3xl opacity-10"
            style={{
              width: 400,
              height: 400,
              background: watch.theme.glow,
              left: "40%",
              top: "30%",
              y: orb3Y,
            }}
          />
        </div>

        {/* ── Radial glow behind watch ── */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`glow-${activeIndex}`}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div
              className="rounded-full blur-3xl"
              style={{
                width: 480,
                height: 480,
                background: `radial-gradient(circle, ${watch.theme.glow} 0%, transparent 70%)`,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Main content grid ── */}
        <div className="relative z-20 h-full max-w-7xl mx-auto px-16 grid grid-cols-2 gap-12 items-center">

          {/* Left: text panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${activeIndex}`}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col"
            >
              {/* Ref number */}
              <motion.p
                className="text-[10px] tracking-[0.35em] text-white/40 uppercase mb-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.5 }}
              >
                {watch.ref}
              </motion.p>

              {/* Watch name */}
              <motion.h2
                className="text-6xl xl:text-7xl font-black uppercase tracking-tight leading-none text-white mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                {watch.name.replace("SYLVARA ", "")}
              </motion.h2>

              {/* Tagline */}
              <motion.p
                className="text-sm tracking-[0.2em] uppercase font-light mb-6"
                style={{ color: watch.theme.accentLight }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.5 }}
              >
                {taglines[watch.slug]}
              </motion.p>

              {/* Description */}
              <motion.p
                className="text-sm text-white/55 leading-relaxed max-w-xs mb-10"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26, duration: 0.5 }}
              >
                {watch.description}
              </motion.p>

              {/* Discover link */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.5 }}
              >
                <Link
                  href={`/collection/${watch.slug}`}
                  className="inline-flex items-center gap-3 px-7 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    background: watch.theme.button,
                    boxShadow: `0 0 24px ${watch.theme.glow}`,
                  }}
                >
                  Discover
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 6h8M7 3l3 3-3 3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Right: watch image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`watch-${activeIndex}`}
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0, scale: 1.06 }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image
                src={watch.image}
                alt={watch.name}
                width={520}
                height={520}
                className="object-contain w-[380px] h-[380px] xl:w-[460px] xl:h-[460px]"
                style={{
                  filter: `drop-shadow(0 40px 100px ${watch.theme.glow}) drop-shadow(0 0 80px ${watch.theme.glow})`,
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Scroll progress dots (right side) ── */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          {watches.map((w, i) => (
            <div key={w.slug} className="flex items-center gap-2">
              <span
                className="text-[9px] tracking-[0.2em] uppercase transition-all duration-500"
                style={{
                  color: i === activeIndex ? watch.theme.accentLight : "transparent",
                  opacity: i === activeIndex ? 1 : 0,
                }}
              >
                {w.name.replace("SYLVARA ", "")}
              </span>
              <motion.div
                animate={{
                  width: i === activeIndex ? 20 : 6,
                  height: i === activeIndex ? 6 : 6,
                  opacity: i === activeIndex ? 1 : 0.3,
                  borderRadius: i === activeIndex ? 3 : 3,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                  background: i === activeIndex ? watch.theme.accent : "rgba(255,255,255,0.4)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Section label */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2 -rotate-90 origin-center z-20 pointer-events-none">
          <p className="text-[9px] tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">
            Scroll to explore
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Mobile stacked cards ──────────────────────────────────────────────────────

function MobileShowcase() {
  return (
    <div className="lg:hidden flex flex-col gap-0">
      {watches.map((watch) => (
        <motion.div
          key={watch.slug}
          className="relative w-full overflow-hidden"
          style={{ minHeight: "100svh", background: "#06060a" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0" style={{ background: watch.theme.bg }} />

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none z-10" />

          {/* Glow orb */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none z-5"
            style={{
              width: 360,
              height: 360,
              background: `radial-gradient(circle, ${watch.theme.glow} 0%, transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-20 flex flex-col items-center justify-between h-full min-h-screen px-8 pt-20 pb-16">
            {/* Watch image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              whileInView={{ opacity: 1, scale: 1.0 }}
              viewport={{ once: false, margin: "-15%" }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex-1 flex items-center justify-center w-full"
            >
              <Image
                src={watch.image}
                alt={watch.name}
                width={360}
                height={360}
                className="object-contain w-[280px] h-[280px] sm:w-[340px] sm:h-[340px]"
                style={{
                  filter: `drop-shadow(0 30px 80px ${watch.theme.glow}) drop-shadow(0 0 60px ${watch.theme.glow})`,
                }}
              />
            </motion.div>

            {/* Text block */}
            <motion.div
              className="w-full text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              <p className="text-[10px] tracking-[0.35em] text-white/40 uppercase mb-2">
                {watch.ref}
              </p>
              <h3 className="text-4xl font-black uppercase tracking-tight leading-none text-white mb-2">
                {watch.name.replace("SYLVARA ", "")}
              </h3>
              <p
                className="text-xs tracking-[0.2em] uppercase font-light mb-2"
                style={{ color: watch.theme.accentLight }}
              >
                {taglines[watch.slug]}
              </p>
              <p className="text-2xl font-bold text-white mb-6">
                ${watch.price}
              </p>
              <Link
                href={`/collection/${watch.slug}`}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-medium text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: watch.theme.button,
                  boxShadow: `0 0 24px ${watch.theme.glow}`,
                }}
              >
                Discover
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 6h8M7 3l3 3-3 3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────

export default function ScrollShowcase() {
  return (
    <section style={{ background: "#06060a" }}>
      <DesktopShowcase />
      <MobileShowcase />
    </section>
  )
}
