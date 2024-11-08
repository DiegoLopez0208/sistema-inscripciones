import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Roboto } from "next/font/google"
import "./css/globals.css"
import { Providers } from "@/middleware/providers"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
})
export const metadata: Metadata = {
  title: "EduLink",
  description: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${roboto.className}`}>
        <Providers>
          <Navigation />
          <main className="mainpage">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
