"use client"
import { useState } from "react"
import { StudentList } from "@/sections/admin/student/StudentList"
import CreateUser from "@/sections/admin/createUser"

export default function MentorSection() {
  const [view, setView] = useState("list")

  const showList = () => setView("list")
  const showCreate = () => setView("create")

  return (
    <section>
      <h2>Estudiantes</h2>

      <div className="flex gap-5">
        <button  onClick={showList}>Lista de estudiantes 📋</button>
        <button onClick={showCreate}>Crear estudiante ➕</button>
        <div>
        <input type="text" placeholder="escriba el nombre" className="rounded-badge p-1 text-wrap"/>
        <button type="submit" className="ml-3">Buscar 🔎</button>
        </div>
      </div>

      {view === "list" && <StudentList />}
      {view === "create" && <CreateUser />}
    </section>
  )
}
