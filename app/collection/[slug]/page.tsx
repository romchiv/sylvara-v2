import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/Header"
import { watches, getWatch } from "@/data/watches"

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

      {/* ── Hero product ── */}
      <section className="relative min-h-screen flex items-center">
        {/* Background gradient */}
        <div className="absolute inset-0" style={{ background: watch.theme.bg }} />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#06060a] to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-10 md:px-16 pt-28 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: info */}
          <div>
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase text-white/80 bg-white/8 border border-white/15 backdrop-blur-sm">
                LIMITED TO{" "}
                <span style={{ color: watch.theme.accentLight }} className="font-semibold">
                  {watch.limited} PIECES
                </span>
              </span>
            </div>

            {/* Ref */}
            <p className="text-[11px] tracking-[0.3em] text-white/40 uppercase mb-3">
              {watch.ref}
            </p>

            {/* Name */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none text-white mb-2">
              {watch.name.replace("SYLVARA ", "")}
            </h1>
            <p
              className="text-sm tracking-[0.15em] uppercase mb-8 font-light"
              style={{ color: watch.theme.accentLight }}
            >
              {watch.subtitle}
            </p>

            {/* Price */}
            <p
              className="text-4xl font-bold mb-8"
              style={{ color: watch.theme.accentLight }}
            >
              ${watch.price}
            </p>

            {/* Description */}
            <p className="text-sm text-white/60 leading-relaxed mb-10 max-w-sm">
              {watch.longDescription}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-4 flex-wrap">
              <button
                className="px-10 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  background: watch.theme.button,
                  boxShadow: `0 0 30px ${watch.theme.glow}`,
                }}
              >
                Acheter maintenant
              </button>
              <button className="px-8 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-semibold text-white/70 border border-white/20 hover:border-white/50 hover:text-white transition-all duration-300">
                Ajouter aux favoris
              </button>
            </div>

            {/* Materials */}
            <div className="mt-10 pt-8 border-t border-white/8">
              <p className="text-[10px] tracking-[0.3em] text-white/35 uppercase mb-4">
                Matériaux
              </p>
              <div className="flex flex-wrap gap-2">
                {watch.materials.map((mat) => (
                  <span
                    key={mat}
                    className="px-3 py-1 rounded-full text-[10px] tracking-wider text-white/60 border border-white/15 uppercase"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative flex items-center justify-center">
            {/* Action icons */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
              {[
                {
                  label: "Favoris",
                  icon: (
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  ),
                },
                {
                  label: "Partager",
                  icon: (
                    <>
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </>
                  ),
                },
              ].map((action) => (
                <button
                  key={action.label}
                  title={action.label}
                  className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center text-white/50 hover:text-white transition-all backdrop-blur-sm bg-black/20"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {action.icon}
                  </svg>
                </button>
              ))}
            </div>

            {/* Watch */}
            <Image
              src={watch.image}
              alt={watch.name}
              width={520}
              height={520}
              className="object-contain w-[300px] h-[300px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px]"
              style={{
                filter: `drop-shadow(0 40px 100px ${watch.theme.glow}) drop-shadow(0 0 80px ${watch.theme.glow})`,
              }}
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Other models ── */}
      <section className="bg-[#06060a] px-10 md:px-16 py-16 border-t border-white/6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-2">
                Découvrez aussi
              </p>
              <h2 className="text-2xl font-bold text-white tracking-wide uppercase">
                Autres modèles
              </h2>
            </div>
            <Link
              href="/collection"
              className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
            >
              Voir tout
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 7h10M8 4l3 3-3 3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {others.map((w) => (
              <Link
                key={w.slug}
                href={`/collection/${w.slug}`}
                className="group relative rounded-xl overflow-hidden border border-white/6 hover:border-white/20 transition-all duration-400 bg-[#0a0a0f]"
              >
                <div
                  className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                  style={{ background: w.theme.bg }}
                />
                <div className="relative h-48 flex items-center justify-center p-6">
                  <Image
                    src={w.image}
                    alt={w.name}
                    width={160}
                    height={160}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                    style={{ filter: `drop-shadow(0 10px 30px ${w.theme.glow})` }}
                  />
                </div>
                <div className="relative px-4 py-4 border-t border-white/8">
                  <p className="text-[10px] tracking-[0.2em] text-white/35 uppercase truncate">
                    {w.ref}
                  </p>
                  <p className="text-sm font-bold text-white uppercase mt-0.5 truncate">
                    {w.name.replace("SYLVARA ", "")}
                  </p>
                  <p className="text-xs font-semibold mt-2" style={{ color: w.theme.accentLight }}>
                    ${w.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
