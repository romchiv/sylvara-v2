export interface Watch {
  slug: string
  name: string
  subtitle: string
  ref: string
  limited: number
  available: boolean
  price: number
  image: string
  shopifyVariantId: string
  theme: {
    bg: string
    accent: string
    accentLight: string
    button: string
    buttonHover: string
    glow: string
  }
  description: string
  materials: string[]
  longDescription: string
}

export const watches: Watch[] = [
  {
    slug: 'terra',
    name: 'SYLVARA TERRA',
    subtitle: 'Earth & Adventure',
    ref: 'SY-2401-TERR',
    limited: 50,
    available: true,
    price: 195,
    image: '/images/watches/terra.png',
    shopifyVariantId: '51936835698974',
    theme: {
      bg: 'radial-gradient(ellipse 90% 90% at 62% 42%, rgba(160,90,20,0.5) 0%, rgba(30,12,4,0.97) 60%, #070302 100%)',
      accent: '#c47a38',
      accentLight: '#e8a060',
      button: '#8a5020',
      buttonHover: '#a86030',
      glow: 'rgba(180,100,30,0.4)',
    },
    description: 'Forged from the earth itself. A chronograph born in desert canyons and golden hours.',
    materials: ['Burl wood', 'Black steel', 'Sapphire crystal'],
    longDescription: 'TERRA is born in arid lands — where sun-scorched rock meets time-worn wood. Its deep dark dial captures the essence of the desert: mysterious, timeless, magnetic.',
  },
  {
    slug: 'forest',
    name: 'SYLVARA FOREST',
    subtitle: 'Swiss Forest',
    ref: 'SY-2402-FRST',
    limited: 50,
    available: true,
    price: 195,
    image: '/images/watches/forest.png',
    shopifyVariantId: '51936836157726',
    theme: {
      bg: 'radial-gradient(ellipse 90% 90% at 62% 42%, rgba(40,110,40,0.55) 0%, rgba(6,18,6,0.97) 60%, #020602 100%)',
      accent: '#5aaa5a',
      accentLight: '#80cc80',
      button: '#2d6630',
      buttonHover: '#3a7a3d',
      glow: 'rgba(50,130,40,0.4)',
    },
    description: 'Born beneath Swiss pines. A deep green dial meets natural olive wood in perfect harmony.',
    materials: ['Olive wood', 'Brushed steel', 'Sapphire crystal'],
    longDescription: 'FOREST captures the soul of the Alpine forests — moss on stone, light filtering through pines, the perfect silence of the undergrowth. Its emerald green dial is a tribute to nature preserved in the mountains.',
  },
  {
    slug: 'glacier',
    name: 'SYLVARA GLACIER',
    subtitle: 'Alpine Glacier',
    ref: 'SY-2403-GLCR',
    limited: 25,
    available: true,
    price: 195,
    image: '/images/watches/glacier.png',
    shopifyVariantId: '51936836288798',
    theme: {
      bg: 'radial-gradient(ellipse 90% 90% at 62% 42%, rgba(90,140,200,0.4) 0%, rgba(6,12,22,0.97) 60%, #030609 100%)',
      accent: '#8ab8e0',
      accentLight: '#b8d8f4',
      button: '#3a6a9a',
      buttonHover: '#4a80b8',
      glow: 'rgba(90,150,210,0.35)',
    },
    description: 'Pure as eternal snow. The crystal-clear dial reflects the infinite silence of alpine glaciers.',
    materials: ['American walnut', 'Silver steel', 'Sapphire crystal'],
    longDescription: 'GLACIER embodies the absolute purity of Alpine peaks. Its immaculate white dial evokes virgin snowfields, while the dark walnut bracelet contrasts with the clarity of the dial — like black rock beneath the ice.',
  },
  {
    slug: 'lagoon',
    name: 'SYLVARA LAGOON',
    subtitle: 'Turquoise Lagoon',
    ref: 'SY-2404-LAGN',
    limited: 30,
    available: true,
    price: 195,
    image: '/images/watches/lagoon.png',
    shopifyVariantId: '51936836419870',
    theme: {
      bg: 'radial-gradient(ellipse 90% 90% at 62% 42%, rgba(20,110,150,0.55) 0%, rgba(2,10,20,0.97) 60%, #010508 100%)',
      accent: '#3acce0',
      accentLight: '#70e8f8',
      button: '#1a7a9a',
      buttonHover: '#2090b8',
      glow: 'rgba(20,170,210,0.4)',
    },
    description: 'Where sky meets sea. The turquoise dial captures the infinite horizon of tropical lagoons.',
    materials: ['American walnut', 'Black steel', 'Burl accents', 'Sapphire crystal'],
    longDescription: 'LAGOON is an invitation to travel. Its turquoise blue dial evokes the transparency of tropical waters, the reflection of the sky in a still lagoon. The contrast with the dark wood recalls the driftwood of wild beaches.',
  },
  {
    slug: 'aurora',
    name: 'SYLVARA AURORA',
    subtitle: 'Northern Lights',
    ref: 'SY-2405-AURR',
    limited: 20,
    available: true,
    price: 195,
    image: '/images/watches/aurora.png',
    shopifyVariantId: '51936837435678',
    theme: {
      bg: 'radial-gradient(ellipse 90% 90% at 62% 42%, rgba(40,30,100,0.55) 0%, rgba(4,3,14,0.98) 60%, #020108 100%)',
      accent: '#8070ff',
      accentLight: '#b0a8ff',
      button: '#3a30aa',
      buttonHover: '#5040c8',
      glow: 'rgba(60,40,200,0.35)',
    },
    description: 'The magic of northern lights, captured in ebony. A timepiece as mysterious as the arctic night.',
    materials: ['Ebony', 'Zebra wood', 'Black steel', 'Sapphire crystal'],
    longDescription: 'AURORA is born in the arctic night. Its absolute black dial is a window on the cosmos, crossed by northern lights. The ebony bracelet plunges the gaze into a velvety darkness from which mysterious lights emerge.',
  },
]

export function getWatch(slug: string): Watch | undefined {
  return watches.find((w) => w.slug === slug)
}
