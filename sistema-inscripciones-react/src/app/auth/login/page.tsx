"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { googleSVG, facebookSVG } from "@/utils/images"
import PasswordInput from "@/components/PasswordInput"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { useTheme } from "@/context/ThemeContext"
import { useSession } from "next-auth/react"

export default function SignIn() {
  const { darkMode } = useTheme()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      if ((session.user as any).role === "ADMIN") {
        return router.push("/admin")
      }
      return router.push("/")
    }
  }, [session, router])

  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError("Please fill in all fields.")
      return
    }

    try {
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (signInResponse?.error) {
        setError("Failed to sign in.")
      }
    } catch (err) {
      setError("An error occurred while signing in.")
      console.error("Sign-in error:", err)
    }
  }

  const handleProviderSignIn = async (provider: string) => {
    const signInResponse = await signIn(provider, { redirect: false })

    if (signInResponse?.error) {
      setError("Failed to sign in with provider.")
    }
  }

  return (
    <>
      <div
        className={`flex justify-center items-center min-h-screen transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-[#D6F4FF] text-black"
        }`}
      >
        <div
          className={`p-10 rounded-lg shadow-lg w-full max-w-lg transition-colors duration-300 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <h2
            className={`text-[38px] font-bold text-center font-roboto mt-8  ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            Inicia sesión en tu cuenta
          </h2>
          <p
            className={`text-center mb-6 text-xs mt-4 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Bienvenido de nuevo
          </p>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => handleProviderSignIn("google")}
              className="flex-1 py-2 rounded border border-[#1034FF] font-roboto flex justify-center items-center text-xs"
            >
              <Image src={googleSVG} alt="Google" className="w-5 h-5 mr-2" />
              Inicia sesión con Google
            </button>
            <button
              onClick={() => handleProviderSignIn("facebook")}
              className="flex-1 py-1 rounded border border-[#1034FF] font-roboto flex justify-center items-center text-xs"
            >
              <Image
                src={facebookSVG}
                alt="Facebook"
                className="w-5 h-5 mr-2"
              />
              Inicia sesión con Facebook
            </button>
          </div>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-[#1034FF]" />
            <span className="mx-4">o</span>
            <hr className="flex-grow border-t border-[#1034FF]" />
          </div>
          <form className="m-6" onSubmit={handleSignIn}>
            <h1
              className={`text-sm mb-2 font-roboto text-[16px] ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            >
              Dirección de correo electrónico
            </h1>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-1.5 mb-4 border border-[#1034FF] rounded-md focus:outline-none ${
                darkMode
                  ? "bg-gray-800 text-white focus:ring-2 focus:ring-blue-400"
                  : "bg-white text-black focus:ring-2 focus:ring-blue-500"
              }`}
              required
            />
            <h1
              className={`text-sm mb-2 font-roboto text-[16px] ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            >
              Contraseña
            </h1>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <p className="flex-1 text-center text-[10px] mt-4">
              Al hacer clic en &quot;Iniciar sesión&quot;, aceptas nuestros Términos y
              Política de Privacidad
            </p>
            <button
              type="submit"
              className={`w-60 mx-auto text-[18px] font-bold py-2 rounded-lg font-roboto mt-6 block ${
                darkMode
                  ? "bg-green-400 text-black hover:bg-green-500"
                  : "bg-[#05F26C] text-black hover:bg-[#05F26C]"
              }`}
            >
              Iniciar Sesión
            </button>
          </form>
          <div className="text-center mt-6">
            <Link
              href="/auth/forgot-password"
              className={`font-bold hover:underline ${
                darkMode ? "text-blue-300" : "text-[#1034FF]"
              }`}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
