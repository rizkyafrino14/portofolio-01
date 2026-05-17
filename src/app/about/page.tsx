'use client'

import TextSection from '@/components/common/TextSection'
import { twMerge } from 'tailwind-merge'
import { techIcons } from '@/utils/constant/TechIcons'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import ExperienceTimeline from '@/components/common/ExperienceTimelime'
import { experience } from '@/utils/constant/Experience'
import { useState, useCallback } from 'react'

// ✏️ Edit persentase skill di sini yoman
const skillProficiency: Record<string, number> = {
  JavaScript: 90,
  Bootstrap:  90,
  Tailwinds:  85, 
  TypeScript: 82,
  React:      80,
  NextJS:     75,
  Php:        20,
  MySQL:      20,
}

const getBadge = (pct: number) => {
  if (pct >= 80) return { label: 'Expert',     color: 'bg-emerald-100 text-emerald-700', bar: '#10b981' }
  if (pct >= 60) return { label: 'Proficient', color: 'bg-blue-100 text-blue-700',       bar: '#3b82f6' }
  return           { label: 'Learning',    color: 'bg-amber-100 text-amber-700',      bar: '#f59e0b' }
}

// 🔊 Ganti file audio yang kamu taruh di /public/sounds/
// Format yang didukung: .mp3 .wav .ogg
const SOUND_URL = '/sounds/mario.mp3'

type SelectedTech = { name: string; pct: number } | null

export default function About() {
  const [selected, setSelected] = useState<SelectedTech>(null)

  const playSound = useCallback(() => {
    const audio = new Audio(SOUND_URL)
    audio.volume = 0.5
    audio.play().catch(() => {
      // browser block autoplay — diabaikan saja
    })
  }, [])

  const handleCardClick = (name: string, pct: number) => {
    playSound()
    setSelected({ name, pct })
  }

  const fadeInAnimationVariants = {
    hidden:  { opacity: 0, y: 100 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.05 * index },
    }),
  }

  return (
    <section className="text-black-primary">
      <TextSection icon="😎" text="it's More About Me." />

      {/* Bio */}
      <div className="mx-auto mb-12 mt-8 flex flex-col items-center justify-center md:gap-10 lg:flex-row">
        <div className="relative aspect-auto h-60 w-60 items-baseline justify-center rounded-3xl border-4 border-black-primary bg-yellow-primary object-cover shadow-image-card shadow-black-primary md:h-96 md:w-1/2 xl:w-96">
          <div className="absolute right-0 flex h-12 w-16 translate-x-8 translate-y-6 items-center justify-center rounded-t-xl rounded-br-xl border-4 border-black-primary bg-orange-primary shadow-image-card shadow-black-primary md:h-16 md:w-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-12 md:w-12" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                <path strokeDasharray={48} strokeDashoffset={48} d="M17 9v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9z">
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0" />
                </path>
                <path strokeDasharray={14} strokeDashoffset={14} d="M17 14H20C20.55 14 21 13.55 21 13V10C21 9.45 20.55 9 20 9H17">
                  <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;28" />
                </path>
              </g>
              <mask id="lineMdCoffeeLoop0">
                <path fill="none" stroke="#fff" strokeWidth={2} d="M8 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M12 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M16 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4">
                  <animateMotion calcMode="linear" dur="3s" path="M0 0v-8" repeatCount="indefinite" />
                </path>
              </mask>
              <rect width={24} height={0} y={7} fill="currentColor" mask="url(#lineMdCoffeeLoop0)">
                <animate fill="freeze" attributeName="y" begin="0.8s" dur="0.6s" values="7;2" />
                <animate fill="freeze" attributeName="height" begin="0.8s" dur="0.6s" values="0;5" />
              </rect>
            </svg>
          </div>
          <Image
            src={'/me.png'}
            alt="Picture of the author"
            width={1000}
            height={1000}
            className="aspect-auto h-full w-full rounded-lg object-cover px-8"
          />
        </div>
        <p className="mt-5 text-justify text-base text-secondary-text md:mt-0 lg:w-1/2 xl:text-lg">
          I am a Software Engineering (RPL) student from <b>SMK Negeri 1 Tengaran</b>. 
          I possess a strong understanding of <b>HTML, CSS, JavaScript,</b> and web development, 
          along with hands-on experience in <b>software development</b> projects using <b>Bootstrap</b> and <b>Tailwind CSS</b>. 
          My current focus is on deepening my knowledge in the field of <b>web & android development</b>.
          <br />
          <br />
          I have hands-on experience with <b>ReactJS</b> and <b>NextJS</b> for the frontend. 
          I am also currently learning about <b>Artificial Intelligence (AI)</b> for development technology.
        </p>
      </div>

      {/* Experience */}
      <TextSection icon="💼" text="My Experience" classNames="mb-10 text-center" />
      <div className="mx-auto mb-10 flex grid-cols-9 flex-col p-2 text-blue-50 md:grid">
        {experience.map((data, index: number) => (
          <ExperienceTimeline position={index % 2 == 1} key={index} {...data} />
        ))}
      </div>

      {/* Tech Stack */}
      <TextSection icon="🎯" classNames="mt-10 xl:mt-28" text="Tech Stack That I Use." />
      <p className="mt-2 text-center text-sm text-secondary-text">
        Click the card to see the mastery level 🔊
      </p>
      <div className="mt-5 flex flex-wrap justify-center justify-items-center gap-5 xl:gap-10 xl:px-40">
        {techIcons.map((data, index) => {
          const Icons = data.icons
          const pct = skillProficiency[data.name]
          return (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="animate"
              variants={fadeInAnimationVariants}
              viewport={{ once: true }}
              custom={index}
              onClick={() => pct !== undefined && handleCardClick(data.name, pct)}
              className={twMerge(
                'flex h-24 w-24 flex-col items-center justify-center gap-y-2 rounded-2xl border-2 bg-white duration-150 hover:scale-105 hover:border-black-primary hover:shadow-button-card md:h-36 md:w-36 md:p-4',
                pct !== undefined ? 'cursor-pointer' : 'cursor-default',
              )}
            >
              <Icons className="text-4xl text-black-primary md:text-6xl" />
              <p className="text-base font-bold text-black-primary md:text-xl">{data.name}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 9998,
                backgroundColor: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            />

            {/* Centering wrapper */}
            <div
              style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{ pointerEvents: 'auto', width: '288px' }}
                className="rounded-2xl border-2 border-black-primary bg-white p-6 shadow-button-card"
              >
                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const tech = techIcons.find((t) => t.name === selected.name)
                      if (!tech) return null
                      const Icon = tech.icons
                      return <Icon className="text-3xl text-black-primary" />
                    })()}
                    <h2 className="text-xl font-bold text-black-primary">{selected.name}</h2>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-black-primary text-sm font-bold text-black-primary hover:bg-yellow-primary"
                  >
                    ✕
                  </button>
                </div>

                {/* Persentase */}
                <p className="mb-3 text-center text-6xl font-bold text-black-primary">
                  {selected.pct}%
                </p>

                {/* Progress bar */}
                <div className="mb-4 h-4 w-full overflow-hidden rounded-full border-2 border-black-primary bg-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selected.pct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{
                      backgroundColor: getBadge(selected.pct).bar,
                      height: '100%',
                      borderRadius: '9999px',
                    }}
                  />
                </div>

                {/* Badge */}
                <div className="flex justify-center">
                  <span className={twMerge('rounded-full px-4 py-1 text-sm font-semibold', getBadge(selected.pct).color)}>
                    {getBadge(selected.pct).label}
                  </span>
                </div>

                {/* Deskripsi */}
                <p className="mt-3 text-center text-xs text-secondary-text">
                  {selected.pct >= 80
                    ? 'Sangat menguasai dan sering digunakan di project nyata.'
                    : selected.pct >= 60
                    ? 'Cukup menguasai dan bisa digunakan untuk project.'
                    : 'Masih dalam tahap belajar dan eksplorasi.'}
                </p>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}