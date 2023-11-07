import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import Provider from "@/app/context/client-provider"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ToasterContext from './context/ToasterContext'
import Sidebar from '@/components/Sidebar'

const notoSans = Noto_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets:["latin"],
  variable: "--font-noto-sans",
})

export const metadata: Metadata = {
  title: 'KINI',
  description: 'Ur best POS exist',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <Provider session={session}>
          <ToasterContext />
          {children}
        </Provider>
      </body>
    </html>
  )
}
