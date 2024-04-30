'use client'

import Link from 'next/link'
import junkfood from '@/public/icons/json/junk-food.json'
import working from '@/public/icons/json/working.json'
import Lootti from '@/components/publicComponents/Lootti'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import queryString from 'query-string'

export default function Home() {

  const router = useRouter()
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    const stringified = queryString.stringify({ theme })
    router.push(`/?${stringified}`)
    localStorage.setItem('theme', theme)
  }, [router, theme])

  return (

    <main className=" w-full">
      <section className="flex flex-col w-full relative h-full">
        <video autoPlay muted loop className=" flex h-full w-full object-cover fixed">
          <source type="video/mp4" src="./bgVideo/v-bg.mp4" />
        </video>
      </section>

      <section className=" left-5 py-5 absolute z-20 flex flex-col h-full w-28 items-center justify-between">
        <Link href='./menuPage?theme=light'>
          <Lootti
            animationData={junkfood}
            loop={true}
          />
        </Link>
        <Link href={`./dashboard?theme=${theme}&sidebarVisible=false&sidebarControl=false`}>
          <Lootti
            animationData={working}
            loop={true}
          />
        </Link>
      </section>
    </main>
  )
}