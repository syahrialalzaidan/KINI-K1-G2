import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets:["latin"],
  variable: "--font-noto-sans",
})

export const metadata: Metadata = {
  title: 'KINI',
  description: 'Ur best POS exist',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={notoSans.className}>{children}</body>
    </html>
  )
}
