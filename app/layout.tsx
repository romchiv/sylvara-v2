import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "SYLVARA — Montres en bois naturel",
  description: "Montres artisanales en bois naturel. Cinq collections inspirées de la nature sauvage.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#06060a] text-white font-sans">
        {children}
      </body>
    </html>
  )
}
