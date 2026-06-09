"use client"

import { useRef, useState, useEffect } from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
} from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { watches } from "@/data/watches"

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]

const taglines: Record<string, string> = {
  terra: "Desert · Canyon · Golden Hour",
  forest: "Alpine Forest · Moss · Pine",
  glacier: "Peak · Snowfield · Pure Light",
  lagoon: "Turquoise · Horizon · Freedom",
  aurora: "Arctic Night · Mystery · Cosmos",
}

const specs: Record<string, string[]> = {
  terra: ["Chronograph", "Burl Wood · Black Steel", "Limited 50 pieces"],
  forest: ["Chronograph", "Olive Wood · Brushed Steel", "Limited 50 pieces"],
  glacier: ["Chronograph", "American Walnut · Silver Steel", "Limited 25 pieces"],
  lagoon: ["Chronograph", "American Walnut · Black Steel", "Limited 30 pieces"],
  aurora: ["Chronograph", "Ebony · Zebra Wood", "Limited 20 pieces"],
}

function CinematicBg({ watch }: { watch: (typeof watches)[0] }) {
  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={`bg-${watch.slug}`}
        className="absolute inset-0"
        style={{ background: watch.theme.bg }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.2, ease: EASE }}
      />
    </AnimatePresence>
  )
}

function WatchGlow({ watch }: { watch: (typeof watches)[0] }) {
  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={`glow-${watch.slug}`}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 8 }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.08 }}
        transition={{ duration: 2.0, ease: EASE }}
      >
        <div className="absolute rounded-full" style={{ width: 720, height: 720, background: `radial-gradient(circle, ${watch.theme.glow.replace(/[\d.]+\)$/, "0.14)")} 0%, transparent 68%)`, filter: "blur(42px)" }} />
        <div className="absolute rounded-full" style={{ width: 520, height: 520, background: `radial-gradient(circle, ${watch.theme.glow.replace(/[\d.]+\)$/, "0.30)")} 0%, transparent 65%)`, filter: "blur(26px)" }} />
        <div className="absolute rounded-full" style={{ width: 300, height: 300, background: `radial-gradient(circle, ${watch.theme.glow.replace(/[\d.]+\)$/, "0.58)")} 0%, transparent 60%)`, filter: "blur(14px)" }} />
      </motion.div>
    </AnimatePresence>
  )
}

function FloatingWatch({ watch, visible }: { watch: (typeof watches)[0]; visible: boolean }) {
  const floatY = useMotionValue(0)
  useEffect(() => {
    const ctrl = animate(floatY, [0, -14, 0], { repeat: Infinity, duration: 4.8, ease: "easeInOut", repeatType: "mirror" })
    return ctrl.stop
  }, [floatY])

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={`fw-${watch.slug}`}
          className="flex items-center justify-center w-full h-full"
          style={{ y: floatY }}
          initial={{ opacity: 0, scale: 0.75, rotate: -2 }}
          animate={{ opacity: 1, scale: [0.75, 1.05, 1.0], rotate: -6 }}
          exit={{ opacity: 0, scale: 1.06, rotate: -4 }}
          transition={{
            opacity: { duration: 0.9, ease: EASE },
            scale: { duration: 1.15, ease: EASE, times: [0, 0.65, 1] },
            rotate: { duration: 1.1, ease: EASE },
          }}
        >
          <Image
            src={watch.image} alt={watch.name}
            width={600} height={600} priority className="object-contain"
            style={{
              width: "min(520px, 44vw)", height: "min(520px, 44vw)",
              filter: [
                `drop-shadow(0 60px 120px ${watch.theme.glow})`,
                `drop-shadow(0 20px 60px ${watch.theme.glow.replace(/[\d.]+\)$/, "0.6)")})`,
                `drop-shadow(0 0 40px ${watch.theme.glow.replace(/[\d.]+\)$/, "0.35)")})`,
              ].join(" "),
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function TextPanel({ watch }: { watch: (typeof watches)[0] }) {
  const lines = specs[watch.slug]
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`text-${watch.slug}`}
        className="flex flex-col"
        initial="hidden" animate="visible" exit="exit"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07 } },
          exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
        }}
      >
        <motion.p className="text-[9px] tracking-[0.45em] text-white/30 uppercase mb-6"
          variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } }, exit: { opacity: 0, x: 20, transition: { duration: 0.5, ease: EASE } } }}>
          {watch.ref} · Sylvara Timepieces
        </motion.p>

        <div className="mb-2 overflow-hidden">
          <motion.span className="block text-[10px] tracking-[0.5em] text-white/45 uppercase font-light mb-1"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } }, exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: EASE } } }}>
            Collection 2024
          </motion.span>
        </div>

        <div className="overflow-hidden mb-1">
          <motion.h2 className="font-black uppercase leading-none text-white"
            style={{ fontSize: "clamp(3.5rem, 6.5vw, 6.5rem)", letterSpacing: "-0.025em" }}
            variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: EASE } }, exit: { opacity: 0, y: -30, transition: { duration: 0.5, ease: EASE } } }}>
            {watch.name.replace("SYLVARA ", "")}
          </motion.h2>
        </div>

        <motion.div className="h-px mb-5 mt-4"
          style={{ background: `linear-gradient(90deg, ${watch.theme.accent} 0%, transparent 70%)` }}
          variants={{ hidden: { scaleX: 0, originX: "0%" }, visible: { scaleX: 1, transition: { duration: 1.0, ease: EASE } }, exit: { scaleX: 0, originX: "100%", transition: { duration: 0.4, ease: EASE } } }} />

        <motion.p className="text-[11px] tracking-[0.3em] uppercase font-light mb-4" style={{ color: watch.theme.accentLight }}
          variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } }, exit: { opacity: 0, x: 16, transition: { duration: 0.4, ease: EASE } } }}>
          {taglines[watch.slug]}
        </motion.p>

        <motion.p className="text-sm leading-[1.85] text-white/50 max-w-[280px] mb-8"
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }, exit: { opacity: 0, transition: { duration: 0.3 } } }}>
          {watch.description}
        </motion.p>

        <motion.div className="flex flex-col gap-1.5 mb-10"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } }, exit: { opacity: 0, transition: { duration: 0.3 } } }}>
          {lines.map((line, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: watch.theme.accent }} />
              <span className="text-[10px] tracking-[0.25em] text-white/35 uppercase">{line}</span>
            </div>
          ))}
        </motion.div>

        <motion.div className="flex items-center gap-6"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } }, exit: { opacity: 0, transition: { duration: 0.3 } } }}>
          <div>
            <p className="text-[9px] tracking-[0.3em] text-white/30 uppercase mb-0.5">Price</p>
            <p className="text-2xl font-bold text-white">${watch.price}</p>
          </div>
          <Link href={`/collection/${watch.slug}`}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 text-[10px] tracking-[0.25em] uppercase font-medium text-white overflow-hidden transition-all duration-300"
            style={{ border: `1px solid ${watch.theme.accent}`, borderRadius: "2px" }}>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: watch.theme.button }} />
            <span className="relative z-10 flex items-center gap-3">
              Discover
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" className="group-hover:translate-x-1 transition-transform duration-300">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function DesktopShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [watchVisible, setWatchVisible] = useState(true)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })
  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 30, restDelta: 0.001 })

  const orb1Y = useTransform(smooth, [0, 1], ["0%", "-55%"])
  const orb2Y = useTransform(smooth, [0, 1], ["0%", "38%"])
  const orb3Y = useTransform(smooth, [0, 1], ["0%", "-28%"])
  const orb4Y = useTransform(smooth, [0, 1], ["0%", "22%"])
  const orb1X = useTransform(smooth, [0, 1], ["0%", "8%"])
  const orb3X = useTransform(smooth, [0, 1], ["0%", "-5%"])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(watches.length - 1, Math.floor(latest * watches.length))
    if (idx !== activeIndex) {
      setWatchVisible(false)
      setTimeout(() => { setActiveIndex(idx); setWatchVisible(true) }, 60)
    }
  })

  const watch = watches[activeIndex]

  return (
    <div ref={containerRef} className="hidden lg:block relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: "#06060a" }}>
        <CinematicBg watch={watch} />

        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(6,6,10,0.88) 0%, rgba(6,6,10,0.45) 38%, transparent 62%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,6,10,0.95) 0%, transparent 18%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,6,10,0.85) 0%, transparent 16%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to left, rgba(6,6,10,0.4) 0%, transparent 30%)" }} />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 5 }}>
          <motion.div className="absolute rounded-full" style={{ width: 700, height: 700, background: `radial-gradient(circle, ${watch.theme.glow.replace(/[\d.]+\)$/, "0.18)")} 0%, transparent 65%)`, filter: "blur(60px)", right: "0%", top: "5%", y: orb1Y, x: orb1X }} />
          <motion.div className="absolute rounded-full" style={{ width: 380, height: 380, background: `radial-gradient(circle, ${watch.theme.accentLight}22 0%, transparent 65%)`, filter: "blur(40px)", right: "8%", bottom: "10%", y: orb2Y }} />
          <motion.div className="absolute rounded-full" style={{ width: 500, height: 500, background: `radial-gradient(circle, ${watch.theme.glow.replace(/[\d.]+\)$/, "0.12)")} 0%, transparent 60%)`, filter: "blur(50px)", left: "30%", top: "25%", y: orb3Y, x: orb3X }} />
          <motion.div className="absolute rounded-full" style={{ width: 220, height: 220, background: `radial-gradient(circle, ${watch.theme.accent}1a 0%, transparent 60%)`, filter: "blur(30px)", left: "15%", bottom: "20%", y: orb4Y }} />
        </div>

        <WatchGlow watch={watch} />

        <AnimatePresence mode="sync">
          <motion.div key={`divider-${watch.slug}`} className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: "50%", width: 1, height: "60vh", zIndex: 18, background: `linear-gradient(to bottom, transparent, ${watch.theme.accent}30, transparent)` }}
            initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: EASE }} />
        </AnimatePresence>

        <div className="relative h-full max-w-[1440px] mx-auto px-16 xl:px-24 grid items-center" style={{ zIndex: 20, gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          <div className="pr-16 xl:pr-24"><TextPanel watch={watch} /></div>
          <div className="relative flex items-center justify-center h-full"><FloatingWatch watch={watch} visible={watchVisible} /></div>
        </div>

        <div className="absolute right-8 xl:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
          {watches.map((w, i) => {
            const isActive = i === activeIndex
            return (
              <div key={w.slug} className="flex items-center gap-3 justify-end">
                <AnimatePresence>
                  {isActive && (
                    <motion.span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: watch.theme.accentLight }}
                      initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.4, ease: EASE }}>
                      {w.name.replace("SYLVARA ", "")}
                    </motion.span>
                  )}
                </AnimatePresence>
                <motion.div
                  animate={{ width: isActive ? 24 : 4, opacity: isActive ? 1 : 0.2 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ height: 4, borderRadius: 2, flexShrink: 0, background: isActive ? watch.theme.accent : "rgba(255,255,255,0.4)" }} />
              </div>
            )
          })}
        </div>

        <motion.div className="absolute left-16 xl:left-24 bottom-12 z-30 flex items-center gap-3"
          animate={{ opacity: activeIndex === 0 ? 1 : 0.3 }} transition={{ duration: 0.6 }}>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
              <rect x="1" y="1" width="14" height="22" rx="7" />
              <motion.rect x="6.5" y="4" width="3" height="5" rx="1.5" fill="rgba(255,255,255,0.4)" stroke="none"
                animate={{ y: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} />
            </svg>
          </motion.div>
          <span className="text-[9px] tracking-[0.4em] text-white/25 uppercase">Scroll</span>
        </motion.div>

        <div className="absolute z-20 pointer-events-none" style={{ left: 20, top: "50%", transform: "translateY(-50%) rotate(-90deg)", transformOrigin: "center center" }}>
          <p className="text-[8px] tracking-[0.5em] text-white/15 uppercase whitespace-nowrap">Sylvara · Natural Timepieces</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={`counter-${activeIndex}`} className="absolute right-8 xl:right-12 bottom-12 z-30 text-right"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}>
            <span className="text-4xl font-black text-white/10" style={{ letterSpacing: "-0.05em" }}>0{activeIndex + 1}</span>
            <span className="text-sm text-white/10"> / 0{watches.length}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function MobileShowcase() {
  return (
    <div className="lg:hidden flex flex-col">
      {watches.map((watch) => (
        <div key={watch.slug} className="relative w-full overflow-hidden flex flex-col items-center justify-between" style={{ minHeight: "100svh", background: "#06060a" }}>
          <div className="absolute inset-0" style={{ background: watch.theme.bg }} />
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,6,10,0.92) 0%, transparent 30%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,6,10,0.7) 0%, transparent 20%)" }} />
          </div>
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ zIndex: 5 }}>
            <div className="rounded-full" style={{ width: 480, height: 480, background: `radial-gradient(circle, ${watch.theme.glow.replace(/[\d.]+\)$/, "0.24)")} 0%, transparent 68%)`, filter: "blur(40px)" }} />
          </div>

          <div className="relative z-20 flex flex-col items-center w-full min-h-screen px-8 pt-20 pb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: [0.75, 1.05, 1.0] }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ opacity: { duration: 0.9, ease: EASE }, scale: { duration: 1.2, ease: EASE, times: [0, 0.65, 1] } }}
              className="flex-1 flex items-center justify-center w-full"
            >
              <Image src={watch.image} alt={watch.name} width={420} height={420} className="object-contain"
                style={{
                  width: "min(360px, 75vw)", height: "min(360px, 75vw)", transform: "rotate(-6deg)",
                  filter: [`drop-shadow(0 40px 90px ${watch.theme.glow})`, `drop-shadow(0 10px 40px ${watch.theme.glow.replace(/[\d.]+\)$/, "0.55)")})`].join(" "),
                }} />
            </motion.div>

            <motion.div className="w-full text-center"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}>
              <p className="text-[8px] tracking-[0.45em] text-white/30 uppercase mb-3">{watch.ref} · Sylvara</p>
              <h3 className="font-black uppercase leading-none text-white mb-2" style={{ fontSize: "clamp(2.5rem, 12vw, 4rem)", letterSpacing: "-0.02em" }}>
                {watch.name.replace("SYLVARA ", "")}
              </h3>
              <div className="h-px mx-auto mb-3 mt-3" style={{ width: 80, background: `linear-gradient(90deg, transparent, ${watch.theme.accent}, transparent)` }} />
              <p className="text-[10px] tracking-[0.28em] uppercase font-light mb-2" style={{ color: watch.theme.accentLight }}>{taglines[watch.slug]}</p>
              <p className="text-xs text-white/40 leading-relaxed max-w-xs mx-auto mb-4">{watch.description}</p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-6">
                {specs[watch.slug].map((s, i) => <span key={i} className="text-[8px] tracking-[0.2em] text-white/25 uppercase">{s}</span>)}
              </div>
              <div className="flex flex-col items-center gap-4">
                <p className="text-2xl font-bold text-white">${watch.price}</p>
                <Link href={`/collection/${watch.slug}`}
                  className="inline-flex items-center gap-3 px-8 py-3.5 text-[10px] tracking-[0.25em] uppercase font-medium text-white transition-all duration-300 hover:scale-105"
                  style={{ border: `1px solid ${watch.theme.accent}`, borderRadius: "2px", boxShadow: `0 0 30px ${watch.theme.glow}` }}>
                  Discover
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ScrollShowcase() {
  return (
    <section style={{ background: "#06060a" }}>
      <DesktopShowcase />
      <MobileShowcase />
    </section>
  )
}
