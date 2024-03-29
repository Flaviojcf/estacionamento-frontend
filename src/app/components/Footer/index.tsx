import Link from 'next/link'

export function Footer() {
  return (
    <footer className="flex flex-col text-black-100 dark:border-gray-700 transition-colors duration-200">
      <div
        className="flex justify-between items-center flex-wrap mt-10 border-t 
      border-orange-600 px-24 py-10 sm:px-16 dark:border-gray-700 transition-colors duration-200 gap-2 "
      >
        <Link
          className="text-gray-800 dark:text-gray-200 transition-colors duration-200"
          href="https://www.dio.me/bootcamp/decola-tech-avanade-net-developer"
          target="blank"
        >
          <p className="hover:opacity-70 hover:underline transition-colors duration-100 font-bold">
            @DecolaTech 2024
          </p>
        </Link>

        <Link
          className="text-gray-800 dark:text-gray-200 transition-colors duration-200"
          href="https://github.com/Flaviojcf"
          target="blank"
        >
          <p className="hover:opacity-70 hover:underline transition-colors duration-100 font-bold">
            @FlavioJcf
          </p>
        </Link>
      </div>
    </footer>
  )
}
