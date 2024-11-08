import Link from "next/link"

export default function SidebarNavigation() {
  return (
    <div className="w-64 bg-white border-r p-4">
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-blue-500 rounded-full mr-2"></div>
        <h1 className="text-xl font-bold text-blue-500">EduLink</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          <li className="bg-blue-500 text-white rounded p-2">
            <Link href={"/admin"}>Dashboard</Link>
          </li>
          <li>
            <Link href="/admin/mentor" className="text-gray-600 p-2 block">
              Mentores
            </Link>
          </li>
          <li>
            <Link href="/admin/course" className="text-gray-600 p-2 block">
              Cursos
            </Link>
          </li>
          <li className="text-gray-600 p-2">Equipos</li>
          <li>
            <Link href="/admin/student" className="text-gray-600 p-2 block">
              Estudiantes
            </Link>
          </li>
          <li className="text-gray-600 p-2">Chat/Mensajería</li>
          <li className="text-gray-600 p-2">Configuración y Reportes</li>
        </ul>
      </nav>
    </div>
  )
}
