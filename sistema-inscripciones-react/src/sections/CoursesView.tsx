import CourseCard from "@/components/CourseCard"
import { rocketSVG, desarrolloWeb, ux_ui, fullstack, QA } from "@/utils/images"

const CoursesView: React.FC = () => {
  const descriptionMarketingDigital =
    "Fundamentos, SEO, SEM, Redes Sociales, Email Marketing, Analítica Digital y mucho más..."
  const descriptionDesarrolloWeb =
    "HTML, CSS, JavaScript, y frameworks modernos como React y Node.js, además de bases de datos y desarrollo backend."
  const descriptionQA =
    "Fundamentos de testing, metodologías ágiles, testing automatizado y manual, aseguramiento de calidad en proyectos de software."
  const descriptionFullStack =
    "Desarrollo completo de aplicaciones web con front-end, back-end, APIs y DevOps, usando tecnologías modernas."
  const descriptionUX_UI =
    "Principios de diseño centrado en el usuario, investigación de usuarios, diseño de interfaces intuitivas y herramientas como Figma y Adobe XD."

  return (
    <>
      <section className="min-w-max text-center py-4">
        <h2 className="text-pltt_light_blue font-bold">Nuestros Cursos</h2>
        <h3 className="text-black font-bold">
          Elige tu curso y explora un nuevo camino profesional
        </h3>
      </section>
      <section className="grid grid-cols-3 min-w-max px-20 py-10 gap-10 justify-items-center">
        <CourseCard
          imageSrc={rocketSVG}
          courseTitle="Marketing Digital"
          duration="3 meses"
          startDate="00/00/00"
          endDate="00/00/00"
          shortDescription={descriptionMarketingDigital}
        />
        <CourseCard
          imageSrc={desarrolloWeb}
          courseTitle="Desarrollo Web"
          duration="3 meses"
          startDate="00/00/00"
          endDate="00/00/00"
          shortDescription={descriptionDesarrolloWeb}
        />
        <CourseCard
          imageSrc={QA}
          courseTitle="Aseguramiento de Calidad (QA)"
          duration="3 meses"
          startDate="00/00/00"
          endDate="00/00/00"
          shortDescription={descriptionQA}
        />
        <CourseCard
          imageSrc={fullstack}
          courseTitle="Desarrollo Full Stack"
          duration="3 meses"
          startDate="00/00/00"
          endDate="00/00/00"
          shortDescription={descriptionFullStack}
        />
        <CourseCard
          imageSrc={ux_ui}
          courseTitle="Diseño UX/UI"
          duration="3 meses"
          startDate="00/00/00"
          endDate="00/00/00"
          shortDescription={descriptionUX_UI}
        />
      </section>
    </>
  )
}

export default CoursesView
