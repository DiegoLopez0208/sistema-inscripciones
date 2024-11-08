"use client"

import Image from "next/image"
import { EduLinkPositivo, EduLinkNegativo } from "@/utils/images"
import { useTheme } from "@/context/ThemeContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import axios from "axios"

export default function Navigation() {
  const { darkMode, setDarkMode } = useTheme()
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const isAdminPage = pathname.startsWith("/admin")

  const handleLogout = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`,
      { withCredentials: true }
    )
    signOut({ callbackUrl: "/" })
  }

  return (
    <nav
      className={`navbar p-3 flex items-center justify-between transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-light text-black"
      }`}
    >
      <aside className="flex items-center">
        <a href="/">
          <Image
            className="h-24 w-24 ml-10 object-contain"
            width={100}
            height={100}
            src={darkMode ? EduLinkNegativo : EduLinkPositivo}
            alt="Home"
          />
        </a>
      </aside>
      {isAdminPage ? null : (
        <div className="flex-1 flex items-center justify-center">
          <ul className="flex space-x-6">
            <Link href="/courses">
              <li>Cursos</li>
            </Link>
            <li>
              <a href="" className="hover:text-accent">
                Mentores
              </a>
            </li>
            <li>
              <a href="" className="hover:text-accent">
                Inscripciones
              </a>
            </li>
          </ul>
        </div>
      )}
      <div className="flex items-center">
        <label className="flex items-center cursor-pointer relative ">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="hidden"
          />
          <div className="w-12 h-6 bg-gray-300 rounded-full flex items-center p-1">
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
          <FontAwesomeIcon
            icon={faMoon}
            width={16}
            height={16}
            className={`absolute left-1 text-gray-600 ${
              darkMode ? "text-gray-700" : ""
            }`}
          />
          <FontAwesomeIcon
            icon={faSun}
            width={16}
            height={16}
            className={`absolute right-1 text-yellow-400 ${
              darkMode ? "" : "text-gray-700"
            }`}
          />
        </label>
        <div className="ml-6">
          {session ? (
            <div className="flex items-center space-x-4">
              <span>Bienvenido {session.user?.name}!</span>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-accent"
              >
                Salir
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => router.push("/auth/login")}
                className="btn btn-outline btn-accent"
              >
                <strong>Iniciar Sesión</strong>
              </button>
              <button
                onClick={() => router.push("/auth/register")}
                className="btn btn-accent ml-3"
              >
                <strong>Registrarse</strong>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
