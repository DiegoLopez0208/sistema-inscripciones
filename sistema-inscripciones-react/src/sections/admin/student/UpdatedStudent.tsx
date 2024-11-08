"use client"
import { Button } from "@/components/ui/button"
import { useState, useCallback } from "react"

interface UpdatedStudentFormProps {
  id: string
  onUpdateComplete: () => void
}

export default function UpdatedStudentForm({
  id,
  onUpdateComplete,
}: UpdatedStudentFormProps) {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("STUDENT")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState(null)

  const URL = "http://localhost:4000/api/v1/admin/student/"

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)

      try {
        const res = await fetch(`${URL}${id}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, surname, role }),
        })
        if (!res.ok) {
          throw new Error("Error en la solicitud")
        }
        const data = await res.json()
        setResponse(data)
        onUpdateComplete() // Llama a la función para notificar que la actualización fue exitosa
      } catch (err: any) {
        setError(err.message || "Error desconocido")
      }
    },
    [name, email, password, surname, role, id, onUpdateComplete] // Agrega onUpdateComplete a las dependencias
  )

  return (
    <section className="grid place-content-center bg-gray-100 p-1">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-full gap-4 bg-white rounded-lg shadow-md p-8"
      >
        <h2 className="text-2xl font-bold text-center">
          Actualizar Estudiante
        </h2>

        <label htmlFor="name">
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="w-full border-gray-300 rounded-md"
            required
          />
        </label>

        <label htmlFor="surname">
          Apellido:
          <input
            type="text"
            value={surname}
            placeholder="Apellido"
            className="w-full border-gray-300 rounded-md"
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            placeholder="ejemplo@mail.com"
            className="w-full border-gray-300 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label htmlFor="password">
          Contraseña:
          <input
            type="password"
            value={password}
            placeholder="********"
            className="w-full border-gray-300 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label htmlFor="role">
          Rol:
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="py-1"
            required
          >
            <option value="">Seleccione un rol</option>
            <option value="STUDENT">Estudiante</option>
            <option value="MENTOR">Mentor</option>
            <option value="ASSISTANT">Asistente</option>
          </select>
        </label>

        <Button
          type="submit"
          className="p-1 w-1/3 bg-green-700 rounded relative left-32"
        >
          Actualizar
        </Button>
      </form>

      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
      {response && (
        <p className="mt-4 text-green-500"> Estudiante actualizado con éxito</p>
      )}
    </section>
  )
}
