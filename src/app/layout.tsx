import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Footer } from '@/components'
import { ReduxProvider } from '@/redux/provider'


export const metadata: Metadata = {
  title: 'E-Voting System',
  description: 'Decentralized Voting System Using Blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={"relative"}>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
