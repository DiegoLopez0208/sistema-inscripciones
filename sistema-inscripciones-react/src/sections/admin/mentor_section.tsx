"use client"
import { useState, useCallback } from "react"
import ListMentors from "@/sections/admin/mentor/ListMentors"
import CreateUser from "@/sections/admin/createUser"

export default function MentorSection() {
  const [view, setView] = useState("list")

  const showList = useCallback(() => setView("list"), []);
  const showCreate = useCallback(() => setView("create"), []);


  return (
    <section>
      <h2>Mentores</h2>

      <div className="flex gap-5">
        <button onClick={showList}>Lista de Mentores 📋</button>
        <button onClick={showCreate}>Crear Mentor ➕</button>
        <div>
        <input type="text" placeholder="escriba el nombre" className="rounded-badge p-1 text-wrap"/>
        <button type="submit" className="ml-3">Buscar 🔎</button>
        </div>
      </div>

      {view === "list" ? <ListMentors /> : <CreateUser />}
    </section>
  )
}
