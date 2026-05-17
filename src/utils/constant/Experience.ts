import { url } from 'inspector'
import { title } from 'process'

interface IExperience {
  title: string
  company: string
  type: string
  description: string
  date: string
}
export const experience = [
  {
    title: 'Building My Portfolio: A Journey with JavaScript and React',
    company: '',
    type: 'study',
    description:
      'Personal Recount by Rizky Mustafa Afrino — Student of Tengaran State Vocational High School, RPL Department',
    date: 'April 2026  - Mei 2026',
    url: '/experience.pdf',
  },
 {
    title: 'Foundational Programming & Logic',
    company: 'Scratch (MIT Media Lab)',
    type: 'study',
    description:
      'Developed core programming logic and algorithmic thinking through visual scripting. Built interactive projects focusing on event-driven programming, loops, and conditional logic.',
    date: 'Juni 2024 - August 2024',
    url: 'https://scratch.mit.edu/',
  },
]
