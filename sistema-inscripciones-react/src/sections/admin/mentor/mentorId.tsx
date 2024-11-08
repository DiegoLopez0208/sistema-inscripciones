"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import BackButton from "@/components/botons/ButtonBacks"
import UpdatedMentorForm from "@/sections/admin/mentor/updatedMentor"

type Mentor = {
  id: string
  name: string
  role: string
  email: string
  avatar: string
}

export default function MentorProfile({ params }: { params: { id: string } }) {
  const [mentor, setMentor] = useState<Mentor | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  async function fetchMentor(id: string) {
    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/admin/mentor/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      )

      if (!res.ok) {
        return Response.json({ error: "Error al obtener mentor" })
      }

      const data = await res.json()
      setMentor(data.mentor)
    } catch (error) {
      return Response.json("Error al obtener mentor" + error)
    }
  }

  useEffect(() => {
    fetchMentor(params.id)
  }, [params.id])

  if (!mentor) {
    return (
      <div className="flex justify-center items-center h-screen">
        Mentor no encontrado
      </div>
    )
  }

  // Función para manejar la finalización de la actualización
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
            <UpdatedMentorForm
              id={mentor.id}
              onUpdateComplete={handleUpdateComplete}
            />
          ) : (
            <>
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage
                  src={mentor.avatar}
                  alt={`${mentor.name}'s avatar`}
                />
                <AvatarFallback>
                  {mentor.name ? mentor.name.charAt(0) : "M"}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-2">{mentor.name}</h2>
              <p className="text-gray-200 mb-2">{mentor.role}</p>
              <p className="text-gray-200 mb-2">{mentor.email}</p>
              <p className="text-sm text-gray-500">ID: {mentor.id}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
