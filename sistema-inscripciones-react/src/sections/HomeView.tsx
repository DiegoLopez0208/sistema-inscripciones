'use client'
import Image from 'next/image'
import {
  Tilde,
  LogoCTL,
  LogoD3,
  LogoEpidata,
  LogoGire,
  LogoGlobant,
  LogoHansen,
  LogoMindHub,
  LogoOpen,
  LogoPigmaleon,
  LogoPrisma
} from '../utils/images'
import '@/app/css/homeview.css'

export default function HomeView() {
  const features = [
    'El plan de estudios técnico impulsa tu crecimiento con contenido, prácticas y proyectos aplicados',
    'Accede a mentores con experiencia en la industria para guiarte en tu carrera profesional',
    'Obtén certificaciones reconocidas por empleadores globales',
    'Participa en proyectos que simulan situaciones del mundo real'
  ]

  const companies = [
    { src: LogoCTL, alt: 'CTL', width: 75, height: 75 },
    { src: LogoD3, alt: 'D3', width: 75, height: 75 },
    { src: LogoEpidata, alt: 'Epidata', width: 100, height: 75 },
    { src: LogoGire, alt: 'Gire', width: 100, height: 100 },
    { src: LogoGlobant, alt: 'Globant', width: 100, height: 100 },
    { src: LogoHansen, alt: 'Hansen', width: 100, height: 100 },
    { src: LogoMindHub, alt: 'MindHub', width: 100, height: 100 },
    { src: LogoOpen, alt: 'Open', width: 100, height: 100 },
    { src: LogoPigmaleon, alt: 'Pigmaleon', width: 100, height: 100 },
    { src: LogoPrisma, alt: 'Prisma', width: 100, height: 100 }
  ]

  return (
    <>
      <section className='min-w-max p-6 text-center'>
        <div className='flex justify-center items-center gap-5'>
          <h1 className='mt-4 font-bold'>EduLink</h1>
        </div>
        <h2 className='mt-4 text-xl'>
          Conectando Talento con Oportunidades Tecnológicas
        </h2>
      </section>

      <section className='flex flex-col p-10 h-full w-full justify-center items-center'>
        <div className='flex flex-col w-2/3 p-10 bg-pltt_dark_blue bg-opacity-80 rounded-lg text-white text-center'>
          <h3 className='text-2xl mb-5'>
            Gane la confianza para iniciar un <strong>nuevo curso</strong>,
            respaldado por una <strong>garantía de empleo.</strong>
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {features.map((feature, index) => (
              <div className='flex items-center gap-3' key={index}>
                <Image
                  src={Tilde}
                  alt='check'
                  width={40}
                  height={40}
                  className='object-contain'
                />
                <p className='align-middle'>{feature}</p>
              </div>
            ))}
          </div>
        </div>
        <button className='mt-7 px-4 py-2 w-2/3 md:w-1/4 bg-pltt_green text-black rounded-lg'>
          <h3 className='text-lg font-bold'>Descubre tu próximo curso</h3>
        </button>
      </section>

      <section className='flex flex-col w-full p-3  text-black bg-slate-300 bg-opacity-80 justify-center items-center'>
        <h4 className='text-lg font-bold '>
          Desarrolla tu carrera con el respaldo de grandes compañías
        </h4>
        <div className='flex flex-wrap justify-center gap-5'>
          {companies.map((company, index) => (
            <Image
              key={index}
              src={company.src}
              alt={company.alt}
              width={company.width}
              height={company.height}
              className='object-contain'
            />
          ))}
        </div>
      </section>
    </>
  )
}
