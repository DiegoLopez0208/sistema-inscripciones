'use client'
import Image, { StaticImageData } from 'next/image'
import { FaClock, FaCalendarAlt } from 'react-icons/fa'
import { useTheme } from '@/context/ThemeContext'

interface CoursePageProps {
  imageSrc: StaticImageData
  courseTitle: string
  duration: string
  startDate: string
  endDate: string
  description: string
}

const CoursePage: React.FC<CoursePageProps> = ({
  imageSrc,
  courseTitle,
  duration,
  startDate,
  endDate,
  description
}) => {
  const { darkMode } = useTheme()

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 items-start p-32 pt-20 shadow-md min-h-screen ${
        darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className='flex flex-col items-center md:items-top md:justify-center'>
        <Image
          src={imageSrc}
          alt={courseTitle}
          width={300}
          height={300}
          className='object-contain ml-14'
        />
        <div
          className={`flex flex-col ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          } md:justify-center`}
        >
          <div className='flex items-center'>
            <FaClock
              className={`mr-2 ${
                darkMode ? 'text-yellow-300' : 'text-yellow-400'
              } ml-20`}
            />
            <span>{duration}</span>
            <FaCalendarAlt
              className={`mr-2 ${
                darkMode ? 'text-yellow-300' : 'text-yellow-400'
              } ml-11`}
            />
            <span>Inicio {startDate}</span>
          </div>
          <div className='flex items-center'>
            <FaCalendarAlt
              className={`mr-2 ${
                darkMode ? 'text-yellow-300' : 'text-yellow-400'
              } ml-52`}
            />
            <span>Cierre {endDate}</span>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-between md:pl-8'>
        <div
          className={`text-gray-500 ${
            darkMode ? 'text-gray-400' : 'text-gray-700'
          }`}
        >
          <h1
            className={`text-4xl font-semibold ${
              darkMode ? 'text-yellow-300' : 'text-yellow-400'
            }`}
          >
            Curso
          </h1>
          <h2
            className={`text-5xl font-bold ${
              darkMode ? 'text-yellow-300' : 'text-yellow-400'
            }`}
          >
            {courseTitle}
          </h2>
        </div>

        <div className='mt-6'>
          <h3
            className={`text-lg font-semibold ml-0 ${
              darkMode ? 'text-yellow-300' : 'text-yellow-400'
            }`}
          >
            Qué aprenderás
          </h3>
          <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {description}
          </p>

          <div className='flex justify-center'>
            <button
              className={`font-semibold py-2 px-6 rounded-lg mt-20 hover:bg-green-600 ${
                darkMode
                  ? 'bg-green-400 text-gray-900'
                  : 'bg-green-500 text-white'
              }`}
            >
              Inscribirse
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePage
