"use client"

import { useEffect, useState} from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import BackButton from "@/components/botons/ButtonBacks"
import UpdatedStudentForm from "@/sections/admin/student/UpdatedStudent"

type Mentor = {
  id: string
  name: string
  role: string
  email: string
  avatar: string
}

export default function StudentProfile({ params }: { params: { id: string } }) {
  const [student, setStudent] = useState<Mentor | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  async function fetchMentor(id: string) {
    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/admin/student/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      )

      if (!res.ok) {
        return Response.json({ error: "Error al obtener mentor" })
      }

      const data = await res.json()
      setStudent(data.student)
    } catch (error) {
      return Response.json("Error al obtener mentor" + error)
    }
  }

  useEffect(() => {
    fetchMentor(params.id)
  }, [params.id])

  if (!student) {
    return (
      <div className="flex justify-center items-center h-screen">
        Estudiante no encontrado
      </div>
    )
  }

  const handleUpdateComplete = () => {
    fetchMentor(params.id)
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md relative">
        <BackButton />
        <Button
          variant="default"
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-slate-400"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="w-4 h-4" />
        </Button>
        <CardContent className="pt-10 pb-8 px-8 flex flex-col items-center">
          {isEditing ? (
            <UpdatedStudentForm
              id={student.id}
              onUpdateComplete={handleUpdateComplete}
            />
          ) : (
            <>
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage
                  src={student.avatar}
                  alt={`${student.name}'s avatar`}
                />
                <AvatarFallback>
                  {student.name ? student.name.charAt(0) : "M"}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-2">{student.name}</h2>
              <p className="text-gray-200 mb-2">{student.role}</p>
              <p className="text-gray-200 mb-2">{student.email}</p>
              <p className="text-sm text-gray-500">ID: {student.id}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
