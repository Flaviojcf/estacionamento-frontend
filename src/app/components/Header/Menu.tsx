'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import { NavItem } from './NavItem'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { NavItensLinks } from '@/mock/header/navItens'
import { CiMenuBurger } from 'react-icons/ci'

export function Menu() {
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setOpen}>
      <DropdownMenu.Trigger className="hidden lg:flex">
        <div>
          <CiMenuBurger size={30} />
        </div>
      </DropdownMenu.Trigger>
      <AnimatePresence>
        {isOpen && (
          <DropdownMenu.Content
            className="h-[269px] -mt-12 mr-1"
            asChild
            forceMount
          >
            <motion.ul
              className="flex flex-col px-2 py-4 pt-10 
              rounded-md gap-4 text-black w-[320px] z-50 drop-shadow-2xl bg-gray-600"
              initial={{ x: 200 }}
              animate={{ x: 0 }}
              exit={{ x: 200 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <div className="flex items-center justify-center -mt-4 border-b border-orange-600">
                  <Image
                    alt="Decola logo"
                    src="/images/decola-tech.webp"
                    width={80}
                    height={80}
                    className="object-fit"
                  />
                  <div
                    className="w-6 h-6 relative cursor-pointer ml-auto"
                    onClick={() => setOpen(false)}
                  >
                    <div className="w-full h-0.5 bg-black absolute top-1/2 transform -translate-y-1/2 rotate-45 dark:bg-orange-600"></div>
                    <div className="w-full h-0.5 bg-black absolute top-1/2 transform -translate-y-1/2 -rotate-45 dark:bg-orange-600"></div>
                  </div>
                </div>
              </div>

              <h1 className="text-white font-bold">
                Mais informações? Entre em contato:
              </h1>
              {NavItensLinks.map((item) => (
                <li key={`label-${item.label}`}>
                  <NavItem href={item.href} label={item.label} />
                </li>
              ))}
            </motion.ul>
          </DropdownMenu.Content>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  )
}
