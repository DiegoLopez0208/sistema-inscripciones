"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function AdminSection() {
  return (
    <>
      <section className="grid place-content-center">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-4 gap-2">
              {[
                { title: "Mentores", value: 52, color: "bg-blue-500" },
                { title: "Cursos Activos", value: 52, color: "bg-green-500" },
                { title: "Estudiantes", value: 55, color: "bg-yellow-500" },
                {
                  title: "Equipos formados",
                  value: 50,
                  color: "bg-violet-500",
                },
              ].map((item, index) => (
                <div key={index} className="text-center grid place-items-center w-max">
                  <Progress
                    value={item.value}
                    className={`w-24 h-24 m-2 ${item.color}`}
                  />
                  <div className="grid place-content-center relative bottom-20">
                    <div className="bg-slate-100 w-12 h-12 rounded-full"></div>
                  </div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-2xl font-bold">{item.value}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button variant="outline" className="border-green-400 text-green-400">
            <Link href={"/admin/mentor"}>Crear Mentor</Link>
          </Button>
          <Button variant="outline" className="border-green-400 text-green-400">
            <Link href={"/admin/course"}>Asignar Curso</Link>
          </Button>
          <Button variant="outline" className="border-green-400 text-green-400">
            <Link href={"/admin/student"}>Vincular Egresado</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
