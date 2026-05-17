'use client'

import { useCallback, useState } from 'react'
import ImageViewer from 'react-simple-image-viewer'
import { ICertificate } from '@/utils/interface/Certificate'
import { motion } from 'framer-motion'
import { RiFileCopyLine } from 'react-icons/ri'
import { BiShow } from 'react-icons/bi'
import { IoLinkSharp } from 'react-icons/io5'
import TextSection from '@/components/common/TextSection'

// ✏️ EDIT DAFTAR SERTIFIKAT DI SINI
// Untuk field "image":
//   1. Taruh file foto sertifikat ke folder /public/certificates/
//   2. Isi "image" dengan nama filenya, contoh: 'bangkit.png'
const certificates: ICertificate[] = [
  {
    title: 'CSS Basic',
    company: 'HackerRank',
    image: 'piagam (2).png',         // → taruh file di public/certificates/bangkit.png
    href: 'https://www.hackerrank.com/features/certified-assessments',
    type: 'course',
  },
  {
    title: 'The Hour Of Code',
    company: 'Code.org',
    image: 'piagam.png',        // → taruh file di public/certificates/dicoding.png
    href: 'https://code.org',
    type: 'course',
  },
  {
    title: 'Smk 1 Tengaran',
    company: 'Smk 1 Tengaran',
    image: 'rpl.png',            // → taruh file di public/certificates/bnsp.png
    href: 'https://rplxsata.com/',
    type: 'course',
  },
  // ➕ Tambah sertifikat baru di sini
  // type yang valid: 'course' | 'competition' | 'competence'
]

// URL gambar otomatis dari folder public/certificates/
const images = certificates.map((item) => `/certificates/${item.image}`)

export default function Education() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }

  const handleClipboard = (href: string) => {
    navigator.clipboard.writeText(href)
  }

  const handleLink = (href: string) => {
    window.open(href, '_blank')
  }

  return (
    <div className="xl:px-40 2xl:px-64">
      <TextSection
        icon="🎓"
        text="My Education"
        classNames="mb-10 text-center"
      />
      <div className="flex flex-wrap items-center justify-center gap-5">
        {certificates.map(
          ({ title, company, type, href }: ICertificate, index: number) => (
            <motion.div
              key={index}
              whileInView={{ scale: 1 }}
              initial={{ scale: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="flex h-40 w-full max-w-[288px] cursor-pointer flex-col justify-between rounded-xl border-2 border-black-primary bg-white p-4 shadow-button-card transition-all hover:scale-105 xl:w-72"
            >
              <div>
                <h1 className="text-xl font-bold text-black-primary">
                  {title}
                </h1>
                <p>{company}</p>
              </div>
              <div className="flex justify-between gap-2">
                <p className="flex h-fit items-center justify-center rounded-xl bg-blue-gray-50 p-2 text-center text-xs font-semibold text-black-primary">
                  {type}
                </p>
                <div className="flex gap-2">
                  <BiShow
                    className="cursor-pointer rounded-full border-2 border-black-primary bg-yellow-primary p-2 text-4xl text-black-primary hover:bg-orange-primary"
                    onClick={() => openImageViewer(index)}
                  />
                  <RiFileCopyLine
                    className="cursor-pointer rounded-full border-2 border-black-primary bg-yellow-primary p-2 text-4xl text-black-primary hover:bg-orange-primary"
                    onClick={() => handleClipboard(href)}
                  />
                  <IoLinkSharp
                    className="cursor-pointer rounded-full border-2 border-black-primary bg-yellow-primary p-2 text-4xl text-black-primary hover:bg-orange-primary"
                    onClick={() => handleLink(href)}
                  />
                </div>
              </div>
            </motion.div>
          ),
        )}

        {certificates.length === 0 && (
          <p className="text-center">Belum ada sertifikat nih ...</p>
        )}
      </div>

      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          backgroundStyle={{ zIndex: 9999 }}
          closeOnClickOutside={true}
        />
      )}
    </div>
  )
}