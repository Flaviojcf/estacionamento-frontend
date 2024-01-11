'use client'
import { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { dashboardTitle } from '@/mock/constants/contants'
import { FaCar, FaPlus } from 'react-icons/fa'
import { LuParkingCircle } from 'react-icons/lu'

export function Dashboard() {
  const [isExpanded, setIsExpanded] = useState(false)
  const controls = useAnimation()

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
    controls.start({
      width: isExpanded ? 300 : 30,
    })
  }

  return (
    <motion.nav
      className="relative bg-orange-600 h-[600px] w-[300px] mb-10 overflow-hidden rounded-md"
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
        <motion.li
          className="px-4 flex items-center gap-2 h-12 transition duration-200 hover:bg-black mt-4 cursor-pointer"
          animate={{ opacity: isExpanded ? 0 : 1 }}
        >
          <LuParkingCircle />
          Estacionamentos
        </motion.li>
        <motion.li
          className="px-4 flex items-center gap-2 h-12 transition duration-200 hover:bg-black cursor-pointer"
          animate={{ opacity: isExpanded ? 0 : 1 }}
        >
          <FaCar />
          Veículos
        </motion.li>
        <motion.li
          className="px-4 flex items-center gap-2  h-12 transition duration-200 hover:bg-black cursor-pointer"
          animate={{ opacity: isExpanded ? 0 : 1 }}
        >
          <FaPlus />
          Novo Veículo
        </motion.li>
        <motion.li
          className="px-4 flex items-center gap-2 h-12 transition duration-200 hover:bg-black cursor-pointer"
          animate={{ opacity: isExpanded ? 0 : 1 }}
        >
          <FaPlus />
          Novo Estacionamento
        </motion.li>
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
