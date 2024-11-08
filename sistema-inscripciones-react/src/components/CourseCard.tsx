"use client"
import Image, { StaticImageData } from "next/image"
import { FaClock, FaCalendarAlt } from "react-icons/fa"
import Link from "next/link"
interface courseData {
  imageSrc: StaticImageData
  courseTitle: string
  duration: string
  startDate: string
  endDate: string
  shortDescription: string
}

const CourseCard: React.FC<courseData> = ({
  imageSrc,
  courseTitle,
  duration,
  startDate,
  endDate,
  shortDescription,
}) => {
  return (
    <article className="courseCard">
      <aside className="min-h-max m-3">
        <Image
          className="m-0"
          src={imageSrc}
          height={100}
          width={100}
          alt="Marketing"
        />
      </aside>
      <div>
        <h4 className="my-3 text-pltt_orange font-bold mx-0">Cursos</h4>
        <h3 className="my-3 text-pltt_orange font-bold mx-0">{courseTitle}</h3>
        <p className="text-black">{shortDescription}</p>
        <div className="flex items-center text-black">
          <div className="flex items-center text-sm">
            <FaClock className="mr-2" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-sm">
            <FaCalendarAlt className="mx-2" />
            <span className="mr-1">Inicio {startDate}</span>
            <span>Cierre {endDate}</span>
          </div>
        </div>
        <div className="text-right mt-4">
          <Link href="/courses/marketing" className="text-blue-500 hover:text-blue-700 text-bold">
            ver más{" "}
            <span className="inline-block mx-2 p-2 text-white border rounded-full bg-pltt_light_blue transform rotate-90">
              ▶
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default CourseCard
