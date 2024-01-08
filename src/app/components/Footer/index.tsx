import Link from 'next/link'

export function Footer() {
  return (
    <footer className="flex flex-col text-black-100 mt-5  dark:border-gray-700 transition-colors duration-200">
      <div
        className="flex justify-between items-center flex-wrap mt-10 border-t 
      border-gray-100 px-6 py-10 sm:px-16 dark:border-gray-700 transition-colors duration-200 gap-2 "
      >
        <Link
          className="dark:text-gray-200 transition-colors duration-200"
          href="https://www.dio.me/bootcamp/decola-tech-avanade-net-developer"
          target="blank"
        >
          @DecolaTech 2024
        </Link>

        <Link
          className="dark:text-gray-200 transition-colors duration-200"
          href="https://github.com/Flaviojcf"
          target="blank"
        >
          @FlavioJcf
        </Link>
      </div>
    </footer>
  )
}
