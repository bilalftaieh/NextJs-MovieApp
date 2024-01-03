import type { Metadata } from 'next'
import './globals.css'
import { bebas, inter, lusitana, oswald, oswald_700 } from '@/lib/font'
import Link from 'next/link'
import Image from 'next/image'
import { SearchBar } from '@/components/FilterOptions'
import HeaderSearchBar from '@/components/HeaderSearchBar'
import Footer from '@/components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${oswald.className} antialiased w-full`}>
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row p-4 justify-center bg-slate-700 
            text-gray-300 h-full md:space-x-6 items-center space-y-4 ">

            <header >
              <Link href={'/'}>
                <div className='flex flex-row space-x-4'>
                  <Image src={'/movieLogo.svg'} alt='no image' height={50} width={50} />
                  <h1 className={`text-2xl font-bold ${oswald_700.className}`}>Movie App</h1>
                </div>
              </Link>
            </header>

            <div className='flex flex-row space-x-4'>
              <Link href={'/movies'}>
                <p className="text-lg hover:text-yellow-500 cursor-pointer">Movies</p>
              </Link>
              <Link href={'/tv-series'}>
                <p className="text-lg hover:text-yellow-500 cursor-pointer">Tv Series</p>
              </Link>
            </div>


            <HeaderSearchBar />
          </div>

          {children}
          <Footer />
        </div>
      </body>
    </html>
  )

}
