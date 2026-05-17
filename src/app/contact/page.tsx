'use client'

import TextSection from '@/components/common/TextSection'
import { logoLinks } from '@/utils/constant/LogoLinks'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaPaperPlane, FaWhatsapp } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { MdPerson, MdMessage } from 'react-icons/md'

const YOUR_WHATSAPP = '6282326744030'

// Koordinat lokasi company
const COMPANY_LAT = -7.467444
const COMPANY_LNG = 110.589806
const COMPANY_NAME = 'My Location'

type FormState = {
  name: string
  message: string
}

type Status = 'idle' | 'loading' | 'success'

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState<FormState>({ name: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [focused, setFocused] = useState<string | null>(null)

  const googleMapsUrl = `https://www.google.com/maps?q=${COMPANY_LAT},${COMPANY_LNG}`
  const embedUrl = `https://maps.google.com/maps?q=${COMPANY_LAT},${COMPANY_LNG}&z=17&output=embed`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Format pesan WhatsApp
    const text = encodeURIComponent(
      `Halo, nama saya *${form.name}*.\n\n${form.message}`
    )
    const waUrl = `https://wa.me/${YOUR_WHATSAPP}?text=${text}`

    setTimeout(() => {
      window.open(waUrl, '_blank')
      setStatus('success')
      setForm({ name: '', message: '' })
      setTimeout(() => {
        setStatus('idle')
        setIsOpen(false)
      }, 2000)
    }, 600)
  }

  const isValid = form.name.trim() && form.message.trim()

  return (
    <div className="xl:px-64">
      <TextSection icon="📲" text="Find Me On." classNames="mb-10" />

      {/* Social Links */}
      <div className="flex flex-row flex-wrap justify-center gap-10 2xl:justify-start">
        {logoLinks.map((data, index) => {
          const Icon = data.icon
          return (
            <motion.a
              whileInView={{ scale: 1 }}
              initial={{ scale: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="flex h-16 w-52 cursor-pointer items-center gap-5 rounded-xl border-2 border-black-primary bg-white p-3 text-black-primary shadow-button-card transition-all duration-200 hover:scale-105 hover:shadow-image-card"
              key={index}
              href={data.href}
            >
              <Icon />
              <p className="font-semibold">{data.name}</p>
            </motion.a>
          )
        })}
      </div>

      {/* Tombol Hubungi Saya */}
      <motion.div
        className="mt-16 flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 rounded-2xl border-2 border-black-primary bg-yellow-primary px-8 py-4 font-bold text-black-primary shadow-button-card transition-all hover:bg-orange-primary"
        >
          <FaWhatsapp className="text-2xl text-green-600" />
          <span className="text-lg">Hubungi Saya</span>
        </motion.button>
      </motion.div>

      {/* Map Section */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-14"
      >
        <TextSection icon="📍" text="My Location." classNames="mb-6" />
        <div className="overflow-hidden rounded-2xl border-2 border-black-primary shadow-button-card">
          <iframe
            src={embedUrl}
            width="100%"
            height="400"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Lokasi ${COMPANY_NAME}`}
          />
          <div className="flex items-center justify-between bg-yellow-primary px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏢</span>
              <div>
                <p className="font-bold text-black-primary">{COMPANY_NAME}</p>
                <p className="text-xs text-black-primary/70">
                  {COMPANY_LAT.toFixed(6)}, {COMPANY_LNG.toFixed(6)}
                </p>
              </div>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border-2 border-black-primary bg-white px-4 py-2 text-sm font-semibold text-black-primary transition-all hover:bg-orange-primary"
            >
              Buka Maps →
            </a>
          </div>
        </div>
      </motion.div>

      {/* Modal Popup Form */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => status !== 'loading' && setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
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
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                padding: '1rem',
              }}
            >
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{ pointerEvents: 'auto', width: '100%', maxWidth: '440px' }}
                className="rounded-2xl border-2 border-black-primary bg-white shadow-button-card"
              >
                {/* Header */}
                <div className="flex items-center justify-between rounded-t-2xl border-b-2 border-black-primary bg-yellow-primary px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FaWhatsapp className="text-2xl text-green-600" />
                    <h2 className="text-xl font-bold text-black-primary">Hubungi Saya</h2>
                  </div>
                  <button
                    onClick={() => status !== 'loading' && setIsOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black-primary bg-white text-black-primary transition-all hover:bg-orange-primary"
                  >
                    <IoClose className="text-lg" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-6">
                  {status === 'success' ? (
                    /* Success State */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-3 py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                        className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-black-primary bg-yellow-primary text-3xl"
                      >
                        ✅
                      </motion.div>
                      <p className="text-center text-lg font-bold text-black-primary">
                        Pesan Terkirim!
                      </p>
                      <p className="text-center text-sm text-gray-500">
                        WhatsApp sudah terbuka. Terima kasih sudah menghubungi saya!
                      </p>
                    </motion.div>
                  ) : (
                    /* Form */
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                      {/* Info */}
                      <div className="flex items-center gap-2 rounded-xl border-2 border-green-200 bg-green-50 px-3 py-2">
                        <FaWhatsapp className="shrink-0 text-xl text-green-600" />
                        <p className="text-xs text-green-700">
                          Pesan akan dikirim langsung ke WhatsApp saya
                        </p>
                      </div>

                      {/* Nama */}
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-black-primary">
                          Nama
                        </label>
                        <div
                          className={`flex items-center gap-2 rounded-xl border-2 bg-gray-50 px-3 py-2 transition-all ${
                            focused === 'name'
                              ? 'border-black-primary shadow-button-card'
                              : 'border-gray-200'
                          }`}
                        >
                          <MdPerson className="shrink-0 text-xl text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            onFocus={() => setFocused('name')}
                            onBlur={() => setFocused(null)}
                            placeholder="Nama kamu"
                            className="w-full bg-transparent text-sm text-black-primary outline-none placeholder:text-gray-400"
                            required
                          />
                        </div>
                      </div>

                      {/* Pesan */}
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-black-primary">
                          Pesan
                        </label>
                        <div
                          className={`flex gap-2 rounded-xl border-2 bg-gray-50 px-3 py-2 transition-all ${
                            focused === 'message'
                              ? 'border-black-primary shadow-button-card'
                              : 'border-gray-200'
                          }`}
                        >
                          <MdMessage className="mt-0.5 shrink-0 text-xl text-gray-400" />
                          <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            onFocus={() => setFocused('message')}
                            onBlur={() => setFocused(null)}
                            placeholder="Tulis pesanmu di sini..."
                            rows={4}
                            className="w-full resize-none bg-transparent text-sm text-black-primary outline-none placeholder:text-gray-400"
                            required
                          />
                        </div>
                        <p className="text-right text-xs text-gray-400">
                          {form.message.length} karakter
                        </p>
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={!isValid || status === 'loading'}
                        whileHover={isValid ? { scale: 1.02 } : {}}
                        whileTap={isValid ? { scale: 0.98 } : {}}
                        className={`flex items-center justify-center gap-2 rounded-xl border-2 border-black-primary py-3 font-bold text-black-primary shadow-button-card transition-all ${
                          isValid
                            ? 'cursor-pointer bg-yellow-primary hover:bg-orange-primary'
                            : 'cursor-not-allowed bg-gray-100 opacity-50'
                        }`}
                      >
                        {status === 'loading' ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                              className="inline-block h-4 w-4 rounded-full border-2 border-black-primary border-t-transparent"
                            />
                            Membuka WhatsApp...
                          </>
                        ) : (
                          <>
                            <FaWhatsapp className="text-xl text-green-600" />
                            Kirim via WhatsApp
                          </>
                        )}
                      </motion.button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}