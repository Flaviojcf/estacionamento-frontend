import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from './components/Header'
import { BacktoTopButton } from './components/BacktoTopButton'
import { Footer } from './components/Footer'
import { Dashboard } from './components/Dashboard'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Home | Flaviojcf',
    template: '%s | Flaviojcf',
  },
  description: 'Created by @Flaviojcf',
  icons: [
    {
      url: '/images/avanade-logo.png',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} dark:bg-gray-800 flex flex-col gap-1`}
      >
        <Header />
        <div className="flex gap-2 lg:flex-col lg:gap-6 lg:p-2">
          <Dashboard />
          {children}
        </div>
        <Footer />
        <BacktoTopButton />
      </body>
    </html>
  )
}
