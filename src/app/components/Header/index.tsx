'use client'
import { NavItensLinks } from '@/mock/header/navItens'
import { MdDarkMode } from 'react-icons/md'
import { CiDark, CiLinkedin } from 'react-icons/ci'
import Image from 'next/image'
import { NavItem } from './NavItem'
import { useEffect, useState } from 'react'

export function Header() {
  const [theme, setTheme] = useState<string>('dark')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="flex h-20 bg-orange-600 px-12 pl-14 justify-between items-center ">
      <div className="flex">
        <Image
          alt="Estacionamento Logo"
          src="/images/meu-estacionamento.png"
          width={90}
          height={90}
          className="object-contain"
        />
      </div>

      <nav className="flex items-center justify-between w-[479px] lg:hidden ">
        {NavItensLinks.map((item) => (
          <NavItem
            href={item.href}
            label={item.label}
            key={`label-${item.label}`}
          />
        ))}
      </nav>

      <div className="flex items-center gap-20">
        <div className="">
          <Image
            alt="Decola logo"
            src="/images/decola-tech.webp"
            width={100}
            height={100}
            className="object-fit"
          />
        </div>
        <div onClick={handleThemeSwitch} className="">
          <CiDark
            size={40}
            className={`cursor-pointer ${
              theme === 'dark' ? 'hidden' : 'flex'
            } fill-white`}
          />
          <MdDarkMode
            size={40}
            className={`cursor-pointer ${
              theme === 'dark' ? 'flex' : 'hidden'
            } fill-gray-800`}
          />
        </div>
      </div>
    </header>
  )
}
