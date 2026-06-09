import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/Header"
import { watches, getWatch } from "@/data/watches"
import { getCheckoutUrl } from "@/lib/shopify"

export function generateStaticParams() {
  return watches.map((w) => ({ slug: w.slug }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const watch = getWatch(slug)
  if (!watch) notFound()

  const others = watches.filter((w) => w.slug !== watch.slug)

  return (
    <main className="min-h-screen bg-[#06060a] overflow-hidden">
      <Header />

      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: watch.theme.bg }} />

        {/* Bokeh orbs centered on watch area */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full" style={{
            width: 1000, height: 1000, right: "-5%", top: "50%", transform: "translateY(-50%)",
            background: `radial-gradient(circle, ${watch.theme.glow.replace(/[\d.]+\)$/, "0.38)")} 0%, transparent 62%)`,
            filter: "blur(60px)",
          }} />
          <div className="absolute rounded-full" style={{
            width: 650, height: 650, right: "12%", top: "40%", transform: "translateY(-50%)",
            background: `radial-gradient(circle, ${watch.theme.glow.replace(/[\d.]+\)$/, "0.55)")} 0%, transparent 55%)`,
            filter: "blur(40px)",
          }} />
        </div>

        {/* Vignettes */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(6,6,10,0.82) 0%, rgba(6,6,10,0.35) 42%, transparent 65%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,6,10,0.98) 0%, transparent 20%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,6,10,0.75) 0%, transparent 18%)" }} />
        </div>

        <div className="relative w-full max-w-[1440px] mx-auto px-10 md:px-16 pt-28 pb-24 grid items-center"
          style={{ zIndex: 10, gridTemplateColumns: "1fr 1.35fr", gap: "2rem" }}>

          {/* Left: info */}
          <div className="max-w-md">
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase text-white/80 backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                LIMITED TO{" "}
                <span style={{ color: watch.theme.accentLight }} className="font-semibold">{watch.limited} PIECES</span>
              </span>
            </div>

            <p className="text-[11px] tracking-[0.35em] text-white/40 uppercase mb-3">{watch.ref}</p>

            <h1 className="font-black uppercase leading-none text-white mb-2"
              style={{ fontSize: "clamp(3rem, 6vw, 6.5rem)", letterSpacing: "-0.025em" }}>
              {watch.name.replace("SYLVARA ", "")}
            </h1>

            <div className="h-px mb-5 mt-3"
              style={{ background: `linear-gradient(90deg, ${watch.theme.accent} 0%, transparent 60%)`, width: "180px" }} />

            <p className="text-[12px] tracking-[0.15em] uppercase mb-6 font-light" style={{ color: watch.theme.accentLight }}>
              {watch.subtitle}
            </p>

            <p className="text-4xl md:text-5xl font-bold text-white mb-8">${watch.price}</p>

            <p className="text-sm text-white/55 leading-[1.9] mb-10 max-w-sm">{watch.longDescription}</p>

            <div className="flex items-center gap-4 flex-wrap mb-10">
              <a href={getCheckoutUrl(watch.shopifyVariantId)} target="_blank" rel="noopener noreferrer"
                className="px-10 py-3.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold text-white transition-all duration-300 hover:scale-105 inline-block text-center"
                style={{ background: watch.theme.button, boxShadow: `0 0 36px ${watch.theme.glow}, 0 4px 24px rgba(0,0,0,0.5)` }}>
                Buy now
              </a>
              <button className="px-8 py-3.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold text-white/60 transition-all duration-300 hover:text-white"
                style={{ border: "1px solid rgba(255,255,255,0.18)" }}>
                Add to wishlist
              </button>
            </div>

            <div className="pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-4">Materials</p>
              <div className="flex flex-wrap gap-2">
                {watch.materials.map((mat) => (
                  <span key={mat} className="px-3 py-1 rounded-full text-[10px] tracking-wider text-white/55 uppercase"
                    style={{ border: "1px solid rgba(255,255,255,0.14)" }}>
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: watch */}
          <div className="relative flex items-center justify-center" style={{ minHeight: "70vh" }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20 hidden lg:flex">
              {[
                { label: "Wishlist", icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /> },
                { label: "Share", icon: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></> },
              ].map((a) => (
                <button key={a.label} title={a.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.14)", background: "rgba(0,0,0,0.25)", backdropFilter: "blur(8px)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{a.icon}</svg>
                </button>
              ))}
            </div>

            <Image src={watch.image} alt={watch.name} width={700} height={700} priority className="object-contain"
              style={{
                width: "clamp(300px, 38vw, 620px)", height: "clamp(300px, 38vw, 620px)",
                transform: "rotate(-8deg)",
                filter: [
                  `drop-shadow(0 60px 130px ${watch.theme.glow})`,
                  `drop-shadow(0 20px 60px ${watch.theme.glow.replace(/[\d.]+\)$/, "0.65)")})`,
                  `drop-shadow(0 0 80px ${watch.theme.glow.replace(/[\d.]+\)$/, "0.4)")})`,
                ].join(" "),
              }} />
          </div>
        </div>
      </section>

      {/* Other models */}
      <section className="px-10 md:px-16 py-16" style={{ background: "#06060a", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-2">Also discover</p>
              <h2 className="text-2xl font-bold text-white tracking-wide uppercase">Other models</h2>
            </div>
            <Link href="/collection" className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors">
              View all
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M8 4l3 3-3 3" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {others.map((w) => (
              <Link key={w.slug} href={`/collection/${w.slug}`}
                className="group relative rounded-xl overflow-hidden transition-all duration-400"
                style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#0a0a0f" }}>
                <div className="absolute inset-0 opacity-50 group-hover:opacity-80 transition-opacity duration-500" style={{ background: w.theme.bg }} />
                <div className="relative h-48 flex items-center justify-center p-6">
                  <Image src={w.image} alt={w.name} width={160} height={160}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                    style={{ filter: `drop-shadow(0 10px 30px ${w.theme.glow})` }} />
                </div>
                <div className="relative px-4 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-[10px] tracking-[0.2em] text-white/35 uppercase truncate">{w.ref}</p>
                  <p className="text-sm font-bold text-white uppercase mt-0.5 truncate">{w.name.replace("SYLVARA ", "")}</p>
                  <p className="text-xs font-semibold mt-2" style={{ color: w.theme.accentLight }}>${w.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
