import type { Metadata } from 'next'
import './globals.css'
import { bebas, inter, lusitana, oswald, oswald_700 } from '@/lib/font'
import Link from 'next/link'
import Image from 'next/image'
import HeaderSearchBar from '@/components/HeaderSearchBar'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import {Providers} from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className={`${oswald.className} antialiased w-full bg-custom-one text-custom-two`}>
      <Providers>
        <div className="flex flex-col">
          <Header/>

          {children}
          <Footer />
        </div>
        </Providers>
        <SpeedInsights/>
      </body>
    </html>
  )

}
