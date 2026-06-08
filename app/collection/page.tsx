import Header from "@/components/Header"
import Image from "next/image"
import Link from "next/link"
import { watches } from "@/data/watches"

export default function CollectionPage() {
  return (
    <main className="min-h-screen bg-[#06060a]">
      <Header />

      {/* Filter bar */}
      <div className="pt-24 pb-6 px-8 md:px-12 border-b border-white/8 bg-[#06060a]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-6">
          {/* Collection filter */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase">Collection</span>
            <div className="flex items-center gap-2">
              {watches.map((w) => (
                <button
                  key={w.slug}
                  title={w.name}
                  className="w-7 h-7 rounded-full border-2 border-transparent hover:border-white/50 transition-all duration-200 hover:scale-110"
                  style={{ background: w.theme.accent }}
                />
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="hidden md:block w-px h-4 bg-white/10" />

          {/* Material filter */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase">Matière</span>
            <div className="flex items-center gap-2">
              {["Bois olive", "Noyer", "Ébène", "Burl"].map((mat) => (
                <button
                  key={mat}
                  className="px-3 py-1 rounded-full text-[10px] tracking-widest text-white/50 border border-white/15 hover:border-white/40 hover:text-white transition-all uppercase"
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <span className="ml-auto text-[11px] tracking-widest text-white/30 hidden sm:block">
            5 MONTRES
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-14">
        <h2 className="text-[11px] tracking-[0.4em] text-white/30 uppercase mb-10">
          Toute la collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {watches.map((watch) => (
            <Link
              key={watch.slug}
              href={`/collection/${watch.slug}`}
              className="group relative rounded-2xl overflow-hidden border border-white/6 hover:border-white/20 transition-all duration-500 bg-[#0a0a0f]"
            >
              {/* Card background */}
              <div
                className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-80"
                style={{ background: watch.theme.bg }}
              />

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-[0.15em] uppercase text-white/70 bg-white/8 border border-white/12 backdrop-blur-sm">
                  LIMITED{" "}
                  <span className="font-semibold" style={{ color: watch.theme.accentLight }}>
                    {watch.limited}
                  </span>
                </span>
              </div>

              {/* Watch image */}
              <div className="relative h-72 flex items-center justify-center p-8">
                <Image
                  src={watch.image}
                  alt={watch.name}
                  width={280}
                  height={280}
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-700"
                  style={{
                    filter: `drop-shadow(0 20px 50px ${watch.theme.glow})`,
                  }}
                />
              </div>

              {/* Info */}
              <div className="relative p-6 border-t border-white/8">
                <p className="text-[10px] tracking-[0.25em] text-white/35 uppercase mb-1">
                  {watch.ref}
                </p>
                <h3 className="text-lg font-bold text-white tracking-wide uppercase">
                  {watch.name.replace("SYLVARA ", "")}
                </h3>
                <p className="text-[11px] tracking-wider uppercase mt-0.5" style={{ color: watch.theme.accentLight }}>
                  {watch.subtitle}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-white">${watch.price}</span>
                  <span
                    className="text-[10px] tracking-[0.2em] uppercase font-medium"
                    style={{ color: watch.available ? watch.theme.accent : "#ff6060" }}
                  >
                    {watch.available ? "Disponible" : "Épuisé"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
