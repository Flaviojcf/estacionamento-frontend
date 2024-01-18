'use client'
import { useState } from 'react'
import Image from 'next/image'
import IVeiculoCard from '@/app/interfaces/IVeiculoCard'
import { generateCarImageUrl } from '@/utils/generateCarImageUrll'
import { CustomButton } from '../CustomButton'
import { FaLongArrowAltRight } from 'react-icons/fa'
import * as Dialog from '@radix-ui/react-dialog'
import { VeiculoInfoModal } from '../Modal/VeiculoInfoModal'
import { IVeiculo } from '@/app/interfaces/IVeiculo'

export function VeiculoCard({ ...veiculo }: IVeiculo) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="car-card group dark:bg-slate-500 transition-colors duration-200 w-80">
      <div className="w-6 h-6 relative cursor-pointer ml-auto mt-4">
        <div className="w-full h-0.5 bg-black absolute top-1/2 transform -translate-y-1/2 rotate-45 dark:bg-orange-600"></div>
        <div className="w-full h-0.5 bg-black absolute top-1/2 transform -translate-y-1/2 -rotate-45 dark:bg-orange-600"></div>
      </div>
      <div className="car-card__content dark:text-gray-300 transition-colors duration-200 flex text-center">
        <h2 className="font-bold text-xl w-full">{veiculo.placa}</h2>
      </div>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={generateCarImageUrl()}
          alt="Car model"
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-col w-full gap-4">
        <Dialog.Root>
          <Dialog.Trigger className="w-full">
            <p
              className="custom-btn w-full py-[16px] rounded-full
             bg-primary-blue hover:opacity-75 text-white text-[14px] leading-[17px] font-bold"
              onClick={() => setIsOpen(true)}
            >
              Informações Completas
              <FaLongArrowAltRight size={25} color="White" />
            </p>
          </Dialog.Trigger>
          <VeiculoInfoModal {...veiculo} />
        </Dialog.Root>
        <CustomButton
          text="Realizar Checkout"
          containerStyle="w-full py-[16px] rounded-full bg-green-700 hover:opacity-75"
          textStyles="text-white text-[14px] leading-[17px] font-bold"
          rightIcon={<FaLongArrowAltRight size={25} color="White" />}
          handleClick={() => setIsOpen(true)}
          btnType={'button'}
        />
      </div>
    </div>
  )
}
