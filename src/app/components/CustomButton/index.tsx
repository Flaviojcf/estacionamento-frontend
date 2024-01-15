'use client'
import ICustomButton from '@/app/interfaces/ICustomButton'
import Image from 'next/image'

export function CustomButton({
  text,
  containerStyle,
  handleClick,
  textStyles,
  btnType,
  isDisabled,
  rightIcon,
}: ICustomButton) {
  return (
    <button
      disabled={false}
      type={btnType || 'button'}
      className={`custom-btn ${containerStyle}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{text}</span>
      {rightIcon && <div className="relative">{rightIcon}</div>}
    </button>
  )
}
