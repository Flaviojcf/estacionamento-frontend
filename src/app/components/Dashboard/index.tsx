'use client'
import { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { dashboardTitle } from '@/mock/constants/contants'
import { FaCar, FaPlus, FaHome } from 'react-icons/fa'
import { LuParkingCircle } from 'react-icons/lu'
import * as Dialog from '@radix-ui/react-dialog'
import { VeiculoModal } from '../Modal/VeiculoModal'
import { EstacionamentoModal } from '../Modal/EstacionamentoModal'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

export function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEstacionamentoModalOpen, setIsEstacionamentoModalOpen] =
    useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()
  const controls = useAnimation()

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
    controls.start({
      width: isExpanded ? 300 : 30,
    })
  }

  function handleCloseOnSubmit() {
    setIsOpen(!isOpen)
  }

  function handleCloseEstacionamentoOnSubmit() {
    setIsEstacionamentoModalOpen(!isEstacionamentoModalOpen)
  }

  return (
    <motion.nav
      className="relative bg-orange-600 h-[600px] w-[300px] overflow-hidden rounded-md"
      initial={{ width: 300, opacity: 1 }}
      animate={controls}
    >
      <button className="absolute bottom-0 transform -translate-y-1/2 right-0 p-1 cursor-pointer h-10 mb-10">
        <div onClick={handleToggle} className="text-4xl text-gray-800">
          {isExpanded ? '>' : '<'}
        </div>
      </button>
      <ul
        style={{ display: isExpanded ? 'none' : 'block' }}
        className="flex flex-col justify-center gap-10 w-full mt-4 text-left"
      >
        <motion.h1
          animate={{ opacity: isExpanded ? 0 : 1 }}
          className="text-black font-bold text-center border-b border-black p-2"
        >
          {dashboardTitle}
        </motion.h1>

        <Link href="/">
          <motion.li
            className={clsx(
              'px-4 flex items-center gap-2 h-12 transition duration-200 hover:bg-black mt-4 cursor-pointer',
              { 'bg-black': pathname === '/' },
            )}
            animate={{ opacity: isExpanded ? 0 : 1 }}
          >
            <FaHome />
            Dashboard
          </motion.li>
        </Link>

        <Link href="/estacionamentos/list">
          <motion.li
            className={clsx(
              'px-4 flex items-center gap-2 h-12 transition duration-200 hover:bg-black cursor-pointer',
              { 'bg-black': pathname.includes('estacionamentos') },
            )}
            animate={{ opacity: isExpanded ? 0 : 1 }}
          >
            <LuParkingCircle />
            Estacionamentos
          </motion.li>
        </Link>
        <Link href="/veiculos/list">
          <motion.li
            className={clsx(
              'px-4 flex items-center gap-2 h-12 transition duration-200 hover:bg-black cursor-pointer',
              { 'bg-black': pathname.includes('veiculos') },
            )}
            animate={{ opacity: isExpanded ? 0 : 1 }}
          >
            <FaCar />
            Veículos
          </motion.li>
        </Link>
        <Dialog.Root open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <Dialog.Trigger className="w-full">
            <motion.li
              className="px-4 flex items-center gap-2  h-12 transition duration-200 hover:bg-black cursor-pointer w-full"
              animate={{ opacity: isExpanded ? 0 : 1 }}
            >
              <FaPlus />
              Novo Veículo
            </motion.li>
          </Dialog.Trigger>
          <VeiculoModal handleCloseOnSubmit={handleCloseOnSubmit} />
        </Dialog.Root>

        <Dialog.Root
          open={isEstacionamentoModalOpen}
          onOpenChange={(open) => setIsEstacionamentoModalOpen(open)}
        >
          <Dialog.Trigger className="w-full">
            <motion.li
              className="px-4 flex items-center gap-2 h-12 transition duration-200 hover:bg-black cursor-pointer"
              animate={{ opacity: isExpanded ? 0 : 1 }}
            >
              <FaPlus />
              Novo Estacionamento
            </motion.li>
          </Dialog.Trigger>
          <EstacionamentoModal
            handleCloseOnSubmit={handleCloseEstacionamentoOnSubmit}
          />
        </Dialog.Root>
      </ul>
      <motion.div
        animate={{
          opacity: isExpanded ? 0 : 1,
        }}
        style={{ display: isExpanded ? 'none' : 'block' }}
        className="absolute bottom-0 w-full py-2 bg-orange-400 text-black font-bold text-center mb-0"
      >
        <h2>&copy; Sistema de Estacionamento .</h2>
      </motion.div>
    </motion.nav>
  )
}
