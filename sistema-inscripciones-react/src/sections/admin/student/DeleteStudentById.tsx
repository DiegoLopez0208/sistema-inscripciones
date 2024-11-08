"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface DeleteStudentButtonProps {
  id: string
  onDelete: (id: string) => void
}

const DeleteStudentButton: React.FC<DeleteStudentButtonProps> = ({ id, onDelete }) => {

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/admin/student/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (!response.ok) {
        return Response.json({ error: response.statusText })
      }

      onDelete(id)
    } catch (error) {
        return Response.json({ error: error})
    }
  }

  return (
    <Button variant="outline" size="icon" onClick={handleDelete}>
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}

export default DeleteStudentButton
