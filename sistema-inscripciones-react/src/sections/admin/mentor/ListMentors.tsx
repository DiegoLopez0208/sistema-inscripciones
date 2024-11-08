"use client"
import { useState, useEffect, useMemo, useCallback } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil } from "lucide-react"
import Link from "next/link"
import DeleteMentorButton from "@/sections/admin/mentor/DeletedMentor"

interface Mentor {
  id: string
  name: string
  email: string
  avatar?: string
}

export default function ListMentors() {
  const getAllMentors = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/mentor",
        {
          method: "GET",
          credentials: "include",
        }
      )

      if (!response.ok) {
        throw new Error("No autorizado")
      }

      const data = await response.json()
      setMentors(data.mentor)
    } catch (error) {
      setError("Error al cargar los mentores.")
    }
  }
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    getAllMentors()
  }, [])

  const deleteMentorById = useCallback(async (id: string) => {
    setMentors((prevMentors) =>
      prevMentors.filter((mentor) => mentor.id !== id)
    )
  }, [])

  // Lista memorizada de mentores
  const memoizedMentorCards = useMemo(() => {
    return mentors.map((mentor) => (
      <Card key={mentor.id}>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Link href={`/admin/mentor/${mentor.id}`}>
              <Avatar>
                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <p className="font-medium">{mentor.name}</p>
              <p className="text-sm text-gray-500">{mentor.email}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button>
              <Link href={`/admin/mentor/${mentor.id}`}>
                <Button variant="outline" size="icon">
                  <Pencil className="w-4 h-4" />
                </Button>
              </Link>
            </Button>
            <DeleteMentorButton id={mentor.id} onDelete={deleteMentorById} />
          </div>
        </CardContent>
      </Card>
    ))
  }, [mentors, deleteMentorById])

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  if (mentors.length === 0) {
    return <p className="text-gray-500">No hay mentores.</p>
  }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Mentores</h1>
      <ScrollArea className="h-[400px] w-full rounded-md border">
        <div className="p-4 space-y-4">{memoizedMentorCards}</div>
      </ScrollArea>
    </div>
  )
}
