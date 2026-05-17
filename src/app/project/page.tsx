'use client'

import ProjectCard from '@/components/common/ProjectCard'
import TextSection from '@/components/common/TextSection'
import { useState, useEffect, useRef } from 'react'
import { GithubStats } from '@/components/common/GithubStats'
import { motion, AnimatePresence } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

// =====================
// DATA PROYEK
// =====================
const projects: IProject[] = [
  {
    title: 'Sampahku Hartaku',
    image: 'sampahku.png',               // → /public/project/pos.png
    deskripsi: 'An educational platform on waste management, inspiring communities to turn trash into treasure.',
    type: 'web',
    demo: 'https://kolaboratif11.vercel.app/',
    repo: 'https://github.com/Riz456/Sampahku-hartaku',
  },
  {
    title: 'Sekolah digital',
    image: 'sd.png',               // → /public/project/api.png
    deskripsi: 'A smart student management system that streamlines academic and administrative processes.',
    type: 'web',
    demo: 'https://rizkyafrino14.github.io/tugas1_bootstrap/tugas/tugas_bootstrap2.html',
    repo: 'https://github.com/rizkyafrino14/tugas1_bootstrap',
  },
  {
    title: 'Environment Website',
    image: 'env.png',               // → /public/project/api.png
    deskripsi: 'A digital movement for reforestation, empowering people to take action in preserving the planet.',
    type: 'web',
    demo: 'https://rizkyafrino14.github.io/environment/',
    repo: 'https://github.com/rizkyafrino14/environment',
  },
  {
    title: 'Travel Explore',
    image: 'travel.png',               // → /public/project/api.png
    deskripsi: 'A seamless travel booking website designed for effortless ticket reservations and trip planning.',
    type: 'web',
    demo: 'https://rizkyafrino14.github.io/tugas4_travelexplore/',
    repo: 'https://github.com/rizkyafrino14/tugas4_travelexplore',
  },
  {
    title: 'PetMing',
    image: 'petmig.png',               // → /public/project/api.png
    deskripsi: 'An online marketplace for pet supplies and food, bringing quality products to animal lovers.',
    type: 'web',
    demo: 'https://rizkyafrino14.github.io/tugas5_petshop/',
    repo: 'https://github.com/rizkyafrino14/tugas5_petshop',
  },
  {
    title: 'Portofolio Website',
    image: 'porto.png',               // → /public/project/Porto.png
    deskripsi: 'A professional personal portfolio with a clean interface to highlight projects and personal branding.',
    type: 'web',
    demo: 'https://afrino.vercel.app/',
    repo: 'https://github.com/rizkyafrino14/portofolio-01',
  },
  // ➕ Tambah proyek baru di sini  ya
  // type yang valid: 'web' | 'api' | 'mobile' | 'android' | 'ios' | 'flutter'
]

// =====================
// TYPES
// =====================
interface IProject {
  title: string
  image: string
  deskripsi: string
  type: 'web' | 'api' | 'mobile' | 'android' | 'ios' | 'flutter'
  demo: string
  repo: string
}

// =====================
// DATA QUIZ
// =====================
const questions = [
  {
    question: 'Berapa lama Rizky bikin portfolio ini?',
    options: ['4 bulan', '2 bulan', '6 bulan', '1 bulan'],
    answer: 3,
    emoji: '⏳',
  },
  {
    question: 'Tech stack utama portfolio ini?',
    options: ['Vue + Nuxt', 'React + Next.js', 'Angular', 'Svelte'],
    answer: 1,
    emoji: '⚙️',
  },
  {
    question: 'Rizky lulusan jurusan apa?',
    options: ['Multimedia', 'TKJ', 'RPL', 'DKV'],
    answer: 2,
    emoji: '🎓',
  },
  {
    question: 'Fitur pertama yang dibuat di portfolio ini?',
    options: ['Contact form', 'Pixel character', 'Project cards', 'Dark mode'],
    answer: 1,
    emoji: '🌟',
  },
  {
    question: 'Deploy portfolionya pakai apa?',
    options: ['Netlify', 'Railway', 'GitHub Pages', 'Vercel'],
    answer: 3,
    emoji: '🚀',
  },
]

// =====================
// SOUND HOOKS
// 🔊 Taruh file audio di /public/sounds/
// - game-bg.mp3     → musik latar saat main (loop)
// - correct.mp3     → jawaban benar
// - wrong.mp3       → jawaban salah
// - win.mp3         → menang (skor tinggi)
// - finish.mp3      → selesai biasa
// =====================
function useSound() {
  const bgRef = useRef<HTMLAudioElement | null>(null)

  const playBg = () => {
    if (bgRef.current) return
    const audio = new Audio('/sounds/game-bg.mp3')
    audio.loop = true
    audio.volume = 0.3
    audio.play().catch(() => {})
    bgRef.current = audio
  }

  const stopBg = () => {
    if (!bgRef.current) return
    bgRef.current.pause()
    bgRef.current.currentTime = 0
    bgRef.current = null
  }

  const play = (src: string, volume = 0.6) => {
    const audio = new Audio(src)
    audio.volume = volume
    audio.play().catch(() => {})
  }

  return { playBg, stopBg, play }
}

// =====================
// CONFETTI
// =====================
function Confetti() {
  const colors = ['#FFD43B', '#FAB007', '#FF6B6B', '#51CF66', '#339AF0', '#FF8787', '#CC5DE8']
  const pieces = Array.from({ length: 80 })
  return (
    <div className="pointer-events-none fixed inset-0 z-[10001] overflow-hidden">
      {pieces.map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400), y: -20, rotate: 0, opacity: 1 }}
          animate={{ y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20, rotate: Math.random() * 720 - 360, opacity: 0 }}
          transition={{ duration: Math.random() * 2 + 1.5, delay: Math.random() * 0.8, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            width: Math.random() * 12 + 6,
            height: Math.random() * 12 + 6,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          }}
        />
      ))}
    </div>
  )
}

// =====================
// PIXEL CHARACTER
// =====================
function PixelChar({ state }: { state: 'idle' | 'correct' | 'wrong' | 'finish' | 'win' }) {
  const frames = { idle: '😐', correct: '🤩', wrong: '😱', finish: '🏆', win: '🥳' }
  return (
    <motion.div
      key={state}
      initial={{ scale: 0.5, rotate: state === 'wrong' ? 15 : -10 }}
      animate={{
        scale: 1,
        rotate: 0,
        y: state === 'correct' ? [0, -10, 0] : 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className="text-5xl md:text-7xl select-none"
    >
      {frames[state]}
    </motion.div>
  )
}

// =====================
// MUSIC TOGGLE BUTTON
// =====================
function MusicBtn({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black-primary bg-white text-sm hover:bg-yellow-primary dark:border-[#383B52] dark:bg-[#1C1E2E] dark:text-[#E4E6F0]"
      title={playing ? 'Matikan musik' : 'Nyalakan musik'}
    >
      {playing ? '🔊' : '🔇'}
    </motion.button>
  )
}

// =====================
// SHARE BUTTONS
// =====================
function ShareButtons({ score }: { score: number }) {
  const result = getResult(score)
  const text = `Gue baru main Trivia dengan code '6am3' isinya tentang Rizky dan dapet ${score}/50 poin!\n"${result.label}"\n\nCoba kamu juga di portfolionya!`
  const portfolioUrl = 'https://afrino.vercel.app/project'

  const shareWA = () => {
    const waText = encodeURIComponent(`${text}\n${portfolioUrl}`)
    window.open(`https://wa.me/?text=${waText}`, '_blank')
  }

  const shareIG = () => {
    // Instagram tidak support direct share link, copy teks dulu
    navigator.clipboard.writeText(`${text}\n${portfolioUrl}`).catch(() => {})
    window.open('https://www.instagram.com/', '_blank')
    alert('Teks sudah dicopy! Paste di caption Instagram kamu 📋')
  }

  return (
    <div className="flex w-full gap-3">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={shareWA}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-black-primary bg-[#25D366] py-3 text-sm font-bold text-white shadow-button-card hover:opacity-90 dark:border-[#383B52]"
      >
        <span className="text-lg"></span> WhatsApp
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={shareIG}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-black-primary py-3 text-sm font-bold text-white shadow-button-card hover:opacity-90 dark:border-[#383B52]"
        style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
      >
        <span className="text-lg"></span> Instagram
      </motion.button>
    </div>
  )
}

function getResult(score: number) {
  const correct = score / 10
  if (correct <= 2) return { label: 'Stalker level: Newbie 🐣', sub: 'Mungkin kamu perlu baca bio-nya dulu nih...', color: 'text-blue-500' }
  if (correct <= 4) return { label: 'Stalker level: Pro 🔥', sub: 'Lumayan! Hampir hafal semua tentang Rizky.', color: 'text-orange-500' }
  return { label: 'You know me too well 👀', sub: 'Bro ini udah level superfan sih...', color: 'text-emerald-500' }
}

// =====================
// GAME MODAL
// =====================
function TriviaGame({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<'intro' | 'playing' | 'result'>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [charState, setCharState] = useState<'idle' | 'correct' | 'wrong' | 'finish' | 'win'>('idle')
  const [showConfetti, setShowConfetti] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const { playBg, stopBg, play } = useSound()

  const q = questions[currentQ]

  const toggleMusic = () => {
    if (musicPlaying) {
      stopBg()
      setMusicPlaying(false)
    } else {
      playBg()
      setMusicPlaying(true)
    }
  }

  const startGame = () => {
    playBg()
    setMusicPlaying(true)
    setPhase('playing')
  }

  const handleAnswer = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)

    if (idx === q.answer) {
      play('/sounds/correct.mp3')
      setCharState('correct')
      setScore((s) => s + 10)
      setFeedback('Nice! +10 pts 🎉')
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2500)
    } else {
      play('/sounds/wrong.mp3')
      setCharState('wrong')
      setFeedback(`Salah! Jawabannya: "${q.options[q.answer]}" 😅`)
    }

    setTimeout(() => {
      const isLast = currentQ + 1 >= questions.length
      if (isLast) {
        stopBg()
        setMusicPlaying(false)
        const finalScore = score + (idx === q.answer ? 10 : 0)
        // Suara menang beda tergantung skor
        if (finalScore >= 50) {
          play('/sounds/win.mp3', 0.7)
          setCharState('win')
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 4000)
        } else {
          play('/sounds/finish.mp3', 0.6)
          setCharState('finish')
        }
        setPhase('result')
      } else {
        setCurrentQ((c) => c + 1)
        setSelected(null)
        setCharState('idle')
        setFeedback(null)
      }
    }, 1800)
  }

  const handleClose = () => {
    stopBg()
    onClose()
  }

  const resetGame = () => {
    setPhase('intro')
    setCurrentQ(0)
    setScore(0)
    setSelected(null)
    setCharState('idle')
    setFeedback(null)
    setShowConfetti(false)
    stopBg()
    setMusicPlaying(false)
  }

  const finalScore = phase === 'result' ? score : 0
  const result = getResult(finalScore)

  return (
    <>
      {showConfetti && <Confetti />}

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9998,
          backgroundColor: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
        }}
      />

      {/* Centering wrapper — klik area luar modal juga close */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
          style={{ width: '100%', maxWidth: '520px' }}
          className="overflow-hidden rounded-2xl border-2 border-black-primary bg-white dark:border-[#383B52] dark:bg-[#1C1E2E]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-black-primary bg-yellow-primary px-5 py-3 dark:border-[#383B52] dark:bg-[#252838]">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎮</span>
              <span className="font-bold text-black-primary dark:text-[#E4E6F0]">
                Trivia — Seberapa kenal kamu?
              </span>
            </div>
            <div className="flex items-center gap-2">
              {phase !== 'intro' && (
                <MusicBtn playing={musicPlaying} onToggle={toggleMusic} />
              )}
              <button
                onClick={handleClose}
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-black-primary bg-white text-sm font-bold text-black-primary hover:bg-orange-primary dark:border-[#383B52] dark:bg-[#1C1E2E] dark:text-[#E4E6F0]"
              >✕</button>
            </div>
          </div>

          <div className="p-6">
            {/* INTRO */}
            {phase === 'intro' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-5 text-center"
              >
                <PixelChar state="idle" />
                <div>
                  <h2 className="text-2xl font-bold text-black-primary dark:text-[#E4E6F0]">Easter Egg Ketemu! 🥚</h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-[#9497AA]">
                    Kamu nemuin secret code{' '}
                    <code className="rounded bg-yellow-primary px-1 font-bold text-black">6am3</code>!<br />
                    5 soal tentang Rizky — jawab semua & dengerin musiknya! 🎵
                  </p>
                </div>
                <div className="flex w-full items-center justify-between rounded-xl border-2 border-black-primary bg-yellow-primary/20 px-4 py-3 dark:border-[#383B52]">
                  <span className="text-sm font-semibold text-black-primary dark:text-[#E4E6F0]">5 soal</span>
                  <span className="text-sm font-semibold text-black-primary dark:text-[#E4E6F0]">10 poin/soal</span>
                  <span className="text-sm font-semibold text-black-primary dark:text-[#E4E6F0]">Max 50 pts</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={startGame}
                  className="w-full rounded-xl border-2 border-black-primary bg-yellow-primary py-3 font-bold text-black-primary shadow-button-card hover:bg-orange-primary dark:border-[#383B52]"
                >
                  Mulai Quiz + Musik! 🎵🚀
                </motion.button>
              </motion.div>
            )}

            {/* PLAYING */}
            {phase === 'playing' && (
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-4"
              >
                {/* Progress */}
                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-[#252838]">
                    <motion.div
                      className="h-full rounded-full bg-yellow-primary"
                      animate={{ width: `${(currentQ / questions.length) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <span className="text-xs font-bold text-black-primary dark:text-[#E4E6F0]">
                    {currentQ + 1}/{questions.length}
                  </span>
                  <span className="text-xs font-bold text-orange-primary">{score} pts</span>
                </div>

                {/* Char + Question */}
                <div className="flex items-center gap-4">
                  <PixelChar state={charState} />
                  <div className="flex-1 rounded-xl border-2 border-black-primary bg-yellow-primary/10 p-3 dark:border-[#383B52]">
                    <span className="text-lg">{q.emoji}</span>
                    <p className="mt-1 font-bold text-black-primary dark:text-[#E4E6F0]">{q.question}</p>
                  </div>
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={twMerge(
                        'rounded-xl border-2 px-4 py-2 text-center text-sm font-semibold',
                        charState === 'correct'
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300'
                      )}
                    >
                      {feedback}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Options */}
                <div className="grid grid-cols-2 gap-3">
                  {q.options.map((opt, idx) => {
                    const isCorrect = idx === q.answer
                    const isAnswered = selected !== null
                    const isSelected = selected === idx

                    let style = 'border-black-primary bg-white hover:bg-yellow-primary/20 dark:border-[#383B52] dark:bg-[#252838] dark:hover:bg-[#2E3247]'
                    if (isAnswered) {
                      if (isCorrect) style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-500'
                      else if (isSelected) style = 'border-red-500 bg-red-50 dark:bg-red-950 dark:border-red-500'
                      else style = 'border-gray-200 bg-gray-50 opacity-40 dark:border-[#383B52] dark:bg-[#252838]'
                    }

                    return (
                      <motion.button
                        key={idx}
                        whileHover={!isAnswered ? { scale: 1.03 } : {}}
                        whileTap={!isAnswered ? { scale: 0.97 } : {}}
                        onClick={() => handleAnswer(idx)}
                        disabled={isAnswered}
                        className={twMerge(
                          'rounded-xl border-2 px-3 py-3 text-left text-sm font-semibold text-black-primary transition-all dark:text-[#E4E6F0]',
                          style,
                          !isAnswered && 'cursor-pointer shadow-button-card',
                        )}
                      >
                        <span className="mr-2 rounded bg-black-primary px-1.5 py-0.5 text-xs text-white dark:bg-[#383B52]">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {opt}
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* RESULT */}
            {phase === 'result' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <PixelChar state={charState} />
                <div>
                  <p className="text-4xl font-bold text-black-primary dark:text-[#E4E6F0]">
                    {score}<span className="text-lg text-gray-400">/50</span>
                  </p>
                  <h2 className={twMerge('mt-1 text-xl font-bold', result.color)}>{result.label}</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-[#9497AA]">{result.sub}</p>
                </div>

                {/* Score bar */}
                <div className="w-full overflow-hidden rounded-full border-2 border-black-primary bg-gray-100 dark:border-[#383B52] dark:bg-[#252838]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / 50) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    className="h-4 rounded-full bg-yellow-primary"
                  />
                </div>

                {/* Share buttons */}
                <p className="text-xs text-gray-400 dark:text-[#9497AA]">Share hasil ke temen kamu!</p>
                <ShareButtons score={score} />

                {/* Main lagi */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={resetGame}
                  className="w-full rounded-xl border-2 border-black-primary bg-yellow-primary py-3 text-sm font-bold text-black-primary shadow-button-card hover:bg-orange-primary dark:border-[#383B52]"
                >
                  🔄 Main Lagi
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  )
}

// =====================
// MAIN PAGE
// =====================
export default function Project() {
  const [filter, setFilter] = useState('all')
  const [showGame, setShowGame] = useState(false)
  const [secretBuffer, setSecretBuffer] = useState('')
  const SECRET_CODE = '6am3'

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const next = (secretBuffer + e.key).slice(-SECRET_CODE.length)
      setSecretBuffer(next)
      if (next === SECRET_CODE) {
        setShowGame(true)
        setSecretBuffer('')
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [secretBuffer])

  const filtered = [...projects].reverse().filter((item) => {
    if (filter === 'all') return true
    if (filter === 'mobile') return ['android', 'ios', 'flutter', 'mobile'].includes(item.type)
    return item.type === filter
  })

  const counts = {
    all:    projects.length,
    web:    projects.filter((p) => p.type === 'web').length,
    mobile: projects.filter((p) => ['android', 'ios', 'flutter', 'mobile'].includes(p.type)).length,
    api:    projects.filter((p) => p.type === 'api').length,
  }

  const filters = [
    { key: 'all',    label: 'All' },
    { key: 'web',    label: 'Web' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'api',    label: 'Api' },
  ]

  return (
    <div>
      <TextSection icon="⚒️" text="it's My Projects." />
      <div>
        <div className="my-10 hidden justify-center md:flex">
          <GithubStats />
        </div>
        <div className="my-4 flex justify-center gap-4 font-semibold text-[#616D8A] dark:text-white sm:gap-6 md:gap-8 lg:gap-4">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              className="group relative flex cursor-pointer flex-col items-start justify-center"
              onClick={() => setFilter(key)}
            >
              <span className={`absolute bottom-0 h-1 rounded-md bg-orange-primary transition-all duration-300 ease-in-out group-hover:w-full ${filter === key ? 'w-full' : 'w-0'}`} />
              <p>
                {label}{' '}
                {filter === key && `(${counts[key as keyof typeof counts]})`}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-2 mt-6 flex w-full flex-wrap justify-center gap-4 sm:mb-4 md:mb-5 lg:mb-6 lg:gap-6">
        {filtered.length > 0 ? (
          filtered.map((item, index) => <ProjectCard {...item} key={index} />)
        ) : (
          <p className="text-center dark:text-white">Belum ada projek yang dikerjakan nih ...</p>
        )}
      </div>

      <AnimatePresence>
        {showGame && <TriviaGame onClose={() => setShowGame(false)} />}
      </AnimatePresence>
    </div>
  )
}
