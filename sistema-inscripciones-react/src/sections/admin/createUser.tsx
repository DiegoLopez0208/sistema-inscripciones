"use client"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"

enum ROLE {
  STUDENT = "STUDENT",
  ASSISTANT = "ASSISTANT",
  MENTOR = "MENTOR",
}

export default function CreateUser() {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("create user")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [response, setResponse] = useState(null)

  const URL = "http://localhost:4000/api/v1/admin/student"

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)

      try {
        const res = await fetch(URL, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, surname, role }),
        })
        if (!res.ok) {
          throw new Error("Error en la solicitud")
        }
        const data = await res.json()
        setResponse(data)
        
        setName("")
        setSurname("")
        setEmail("")
        setPassword("")
        setRole("create user")
      } catch (err: any) {
        setError(err.message || "Error desconocido")
      }
    },
    [name, email, password, surname, role]
  )

  return (
    <section className="grid place-content-center bg-gray-100 p-1">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-full gap-4  bg-white rounded-lg shadow-md p-8"
      >
        <h2 className="text-2xl font-bold text-center">
          {ROLE ? role : "Seleccione un rol"}
        </h2>
        <label htmlFor="name" className="text-clip">
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="nombre"
            className="w-full border-gray-300 rounded-md"
          />
        </label>

        <label htmlFor="surname" className="">
          Apellido
          <input
            type="text"
            value={surname}
            placeholder="apellido"
            className="w-full border-gray-300 rounded-md"
            onChange={(e) => setSurname(e.target.value)}
          />
        </label>

        <label htmlFor="email" className="">
          Email:
          <input
            type="email"
            value={email}
            placeholder="ejemplo@mail.com"
            className="w-full border-gray-300 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="password" className="">
          Contraseña:
          <input
            type="password"
            value={password}
            placeholder="********"
            className="w-full border-gray-300 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label htmlFor="role" className="">
          Rol:
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="py-1"
            required
          >
            <option defaultChecked>Seleccione un rol</option>
            <option value="STUDENT">Estudiante</option>
            <option value="MENTOR">Mentor</option>
            <option value="ASSISTANT">Asistente</option>
          </select>
        </label>

        <Button
          type="submit"
          className="p-1 w-1/3 bg-green-700 rounded relative left-32"
        >
          Crear
        </Button>
      </form>

      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
      {response && <p className="mt-4 text-green-500">Creado con éxito</p>}
    </section>
  )
}
