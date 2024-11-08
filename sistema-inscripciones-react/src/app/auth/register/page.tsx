/* eslint-disable react/no-unescaped-entities */
"use client"

import React, { useState } from "react"
import { facebookSVG, googleSVG } from "@/utils/images"
import Image from "next/image"
import PasswordInput from "../../../components/PasswordInput"
import axios from "axios"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useTheme } from "@/context/ThemeContext"

const SignUp: React.FC = () => {
  const { darkMode } = useTheme()
  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [surname, setSurname] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!email || !name || !surname || !password || !confirmPassword) {
      setError("Please fill in all fields.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
        {
          email,
          name,
          role: "STUDENT",
          surname,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (res.status === 201) {
        router.push("/auth/login")
      } else {
        setError("Failed to register. Please try again.")
      }
    } catch (err) {
      setError("An error occurred while signing up.")
      console.error("Sign-up error:", err)
    }
  }

  const handleProviderSignIn = async (provider: string) => {
    setError(null)
    try {
      await signIn(provider, { callbackUrl: "/auth/verify-email" })
    } catch (err) {
      setError("An error occurred while signing in with " + provider + ".")
      console.error("Sign-in error with provider:", err)
    }
  }

  return (
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
          Regístrate
        </h2>
        <p
          className={`text-center mb-6 text-xs ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          ¡Hola! Bienvenido
        </p>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => handleProviderSignIn("google")}
            className="flex-1 py-2 rounded border border-[#1034FF] font-roboto flex justify-center items-center text-xs"
          >
            <Image src={googleSVG} alt="Google" className="w-5 h-5 mr-2" />
            Iniciar sesión con Google
          </button>
          <button
            onClick={() => handleProviderSignIn("facebook")}
            className="flex-1 py-1 rounded border border-[#1034FF] font-roboto flex justify-center items-center text-xs"
          >
            <Image src={facebookSVG} alt="Facebook" className="w-5 h-5 mr-2" />
            Iniciar sesión con Facebook
          </button>
        </div>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-[#1034FF]" />
          <span
            className={`mx-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            or
          </span>
          <hr className="flex-grow border-t border-[#1034FF]" />
        </div>
        <form className="m-6" onSubmit={handleSignUp}>
          <h1
            className={`text-sm mb-2 font-roboto text-[16px] ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            Dirección de Correo Electrónico
          </h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-1.5 mb-4 border border-[#1034FF] rounded-md focus:outline-none ${
              darkMode
                ? "bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
                : "bg-white text-black focus:ring-2 focus:ring-blue-500"
            }`}
            required
          />
          <h1
            className={`text-sm mb-2 font-roboto text-[16px] ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            Nombre
          </h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-1.5 mb-4 border border-[#1034FF] rounded-md focus:outline-none ${
              darkMode
                ? "bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
                : "bg-white text-black focus:ring-2 focus:ring-blue-500"
            }`}
            required
          />
          <h1
            className={`text-sm mb-2 font-roboto text-[16px] ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            Apellido
          </h1>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className={`w-full p-1.5 mb-4 border border-[#1034FF] rounded-md focus:outline-none ${
              darkMode
                ? "bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
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
          <h1
            className={`text-sm mb-2 font-roboto text-[16px] ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            Confirmar contraseña
          </h1>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <p className="flex-1 text-center text-[10px] mt-4">
            Al hacer clic en "Regístrate", aceptas nuestros Términos y Política
            de Privacidad
          </p>
          <button
            type="submit"
            className={`w-60 mx-auto text-[18px] font-bold py-2 rounded-lg font-roboto mt-6 block ${
              darkMode
                ? "bg-green-400 text-black hover:bg-green-500"
                : "bg-[#05F26C] text-black hover:bg-[#05F26C]"
            }`}
          >
            Regístrate
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
