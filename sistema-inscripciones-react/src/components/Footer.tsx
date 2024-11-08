"use client";
import Image from "next/image";
import { EduLinkNegativo, EduLinkPositivo } from "@/utils/images";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`footer p-3 py-6 items-center transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-light text-dark"
      }`}
    >
      <aside>
        <Image
          src={darkMode ? EduLinkNegativo : EduLinkPositivo}
          alt="EduLink"
          width={100}
          height={100}
          className="h-24 w-24 ml-10 object-contain"
        />
      </aside>
      <nav className="flex-1 left-0">
        <ul className="menu menu-horizontal">
          <li>
            <strong>Cursos</strong>
          </li>
          <li>
            <strong>Desarrollo Web</strong>
          </li>
          <li>
            <strong>Full Stack | QA | UX/UI</strong>
          </li>
          <li>
            <strong>Marketing Digital</strong>
          </li>
          <li>
            <strong>Inscripciones</strong>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
