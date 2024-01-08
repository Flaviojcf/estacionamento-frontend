import { INavItem } from '@/app/interfaces/INavItem'
import Link from 'next/link'
import { CiLinkedin } from 'react-icons/ci'
import { FaGithub } from 'react-icons/fa'
import { CgWebsite } from 'react-icons/cg'

export function NavItem({ href, label }: INavItem) {
  return (
    <Link href={href} className="flex items-center" target="blank">
      <span
        className="text-white font-bold text-sm hover:text-navHoverColor transition-colors duration-200 
        hover:text-black flex items-center gap-2"
      >
        {label === 'Linkedin' ? (
          <CiLinkedin size={20} />
        ) : label === 'Github' ? (
          <FaGithub size={20} />
        ) : (
          <CgWebsite size={20} />
        )}

        {label}
      </span>
    </Link>
  )
}
