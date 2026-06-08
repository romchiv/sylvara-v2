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
    subtitle: 'Terre & aventure',
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
    description: 'Forgée dans la roche. Un chronographe inspiré des canyons désertiques et des golden hours à couper le souffle.',
    materials: ['Bois racine (burl)', 'Acier noir', 'Verre saphir'],
    longDescription: 'La TERRA est née au cœur des terres arides — là où la roche brûlée par le soleil rencontre le bois patiné par le temps. Son cadran sombre aux reflets profonds capture l\'essence même du désert : mystérieux, intemporel, magnétique.',
  },
  {
    slug: 'forest',
    name: 'SYLVARA FOREST',
    subtitle: 'Forêt suisse',
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
    description: 'Née sous les pins suisses. Un cadran vert profond, un bracelet en bois d\'olivier — la forêt à votre poignet.',
    materials: ['Bois d\'olivier', 'Acier brossé', 'Verre saphir'],
    longDescription: 'La FOREST capture l\'âme des forêts suisses alpines — la mousse sur la pierre, les rayons filtrés entre les pins, le silence parfait des sous-bois. Son cadran vert émeraude est un hommage à la nature préservée des montagnes.',
  },
  {
    slug: 'glacier',
    name: 'SYLVARA GLACIER',
    subtitle: 'Glacier alpin',
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
    description: 'Pure comme la neige éternelle. Le cadran cristallin réfléchit le silence infini des glaciers alpins.',
    materials: ['Noyer américain', 'Acier argenté', 'Verre saphir'],
    longDescription: 'La GLACIER incarne la pureté absolue des sommets alpins. Son cadran blanc immaculé évoque les champs de neige vierge, tandis que le bois de noyer foncé contraste avec la clarté du cadran — comme la roche noire sous la glace.',
  },
  {
    slug: 'lagoon',
    name: 'SYLVARA LAGOON',
    subtitle: 'Lagon turquoise',
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
    description: 'Là où le ciel rencontre la mer. Le cadran turquoise capture l\'horizon infini des lagons tropicaux.',
    materials: ['Noyer américain', 'Acier noir', 'Accents burl', 'Verre saphir'],
    longDescription: 'La LAGOON est une invitation au voyage. Son cadran bleu turquoise évoque la transparence des eaux tropicales, le reflet du ciel dans un lagon immobile. Le contraste avec le bois sombre du bracelet rappelle le bois flotté des plages sauvages.',
  },
  {
    slug: 'aurora',
    name: 'SYLVARA AURORA',
    subtitle: 'Nuit boréale',
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
    description: 'Le mystère des nuits boréales. Un cadran noir absolu, un bois d\'ébène — l\'élégance de l\'obscurité.',
    materials: ['Ébène', 'Bois zébré', 'Acier noir', 'Verre saphir'],
    longDescription: 'La AURORA naît dans la nuit arctique. Son cadran noir absolu est une fenêtre sur le cosmos, traversé par les aurores boréales. L\'ébène du bracelet plonge le regard dans une obscurité veloutée, d\'où émergent les lumières mystérieuses du Grand Nord.',
  },
]

export function getWatch(slug: string): Watch | undefined {
  return watches.find((w) => w.slug === slug)
}
