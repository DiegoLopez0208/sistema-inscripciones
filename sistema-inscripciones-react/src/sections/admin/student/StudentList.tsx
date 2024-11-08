"use client"
import { useState, useEffect, useMemo, useCallback } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil } from "lucide-react"
import Link from "next/link"
import DeleteStudentById from "@/sections/admin/student/DeleteStudentById"

interface Student {
  id: string
  name: string
  email: string
  avatar?: string
}

export const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/v1/admin/student", {
          method: "GET",
          credentials: "include",
        })

        if (res.status === 401 || res.status === 403) {
          setError("No autorizado. Inicie sesión.")
          return Response.redirect("/login")
        }

        if (!res.ok) {
          setError("Error al cargar los estudiantes")
          return
        }

        const data = await res.json()
        setStudents(data.students)
      } catch (error) {
        setError("Error al cargar estudiantes")
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  const deleteStudentById = useCallback(async (id: string) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    )
  }, [])

  // memorisa las cards de estudent
  const memorizeStudentCards = useMemo(() => {
    return students.map((student) => (
      <Card key={student.id}>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Link href={`/admin/student/${student.id}`}>
              <Avatar>
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <p className="font-medium">{student.name}</p>
              <p className="text-sm text-gray-500">{student.email}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button>
              <Link href={`/admin/student/${student.id}`}>
                <Button variant="outline" size="icon">
                  <Pencil className="w-4 h-4" />
                </Button>
              </Link>
            </Button>
            <DeleteStudentById id={student.id} onDelete={deleteStudentById} />
          </div>
        </CardContent>
      </Card>
    ))
  }, [students, deleteStudentById])

  if (loading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Estudiantes</h1>
      <ScrollArea className="h-[400px] w-full rounded-md border">
        <div className="p-4 space-y-4">{memorizeStudentCards}</div>
      </ScrollArea>
    </div>
  )
}
