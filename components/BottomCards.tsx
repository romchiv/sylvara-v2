import Link from "next/link"

const cards = [
  {
    id: "craft",
    label: "L'artisanat",
    title: "Un bois, un récit",
    gradient: "from-[#0a1a0a] via-[#1a3520] to-[#0d1a10]",
    overlay: "bg-green-900/20",
    href: "/histoire",
  },
  {
    id: "collection",
    label: "La collection",
    title: "5 univers naturels",
    gradient: "from-[#060c18] via-[#0a1e32] to-[#060e1c]",
    overlay: "bg-blue-900/20",
    href: "/collection",
  },
  {
    id: "story",
    label: "Notre histoire",
    title: "Né dans la forêt",
    gradient: "from-[#120800] via-[#281402] to-[#180a00]",
    overlay: "bg-amber-900/20",
    href: "/histoire",
  },
]

export default function BottomCards() {
  return (
    <section className="bg-[#06060a] px-8 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {cards.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} transition-transform duration-700 group-hover:scale-105`} />
            <div className={`absolute inset-0 ${card.overlay}`} />

            {/* Grid texture overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.3) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.3) 40px)`,
              }}
            />

            {/* Content */}
            <div className="absolute inset-0 p-7 flex flex-col justify-end">
              <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-2">
                {card.label}
              </p>
              <h3 className="text-xl font-bold text-white tracking-wide">
                {card.title}
              </h3>
            </div>

            {/* Arrow on hover */}
            <div className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-white/50">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M2 10L10 2M4 2h6v6" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
