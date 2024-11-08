"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 left-2 "
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-full w-full rounded-full bg-green-600 p-1" />
    </Button>
  )
}
