import Image from 'next/image'
import { Hero, LocationBox } from '@/components'
import ResolvePage from '@/lib/resolver'

export default function Home() {
  return (
    <main className="overflow-hidden">
      <ResolvePage/>
    </main>
  )
}
