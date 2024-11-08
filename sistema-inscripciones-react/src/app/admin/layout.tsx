import type { Metadata } from "next"
import SidebarNavigation from "@/components/admin-components/sidebarNavegation"
export const metadata: Metadata = {
  title: "EduLink Dashboard",
  description: "EduLink management dashboard",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-screen bg-white">
      <SidebarNavigation />
      <section className="flex-1 p-8">{children}</section>
    </main>
  )
}
