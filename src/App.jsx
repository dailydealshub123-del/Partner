import { useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Intro, HeartGame, Reveal, Scrapbook, Hidden, Letter, Music, Wish, Final } from './components/Scenes.jsx'

const SCENES = [Intro, HeartGame, Reveal, Scrapbook, Hidden, Letter, Music, Wish, Final]

export default function App() {
  const [i, setI] = useState(0)
  const audio = useRef(null) // one audio element for the whole story, so music persists
  const Scene = SCENES[i]
  const next = () => setI(n => Math.min(n + 1, SCENES.length - 1))
  const restart = () => { audio.current?.pause(); setI(0) }
  return (
    <main className="app">
      <audio ref={audio} preload="none" />
      <AnimatePresence mode="wait"><Scene key={i} next={next} restart={restart} audio={audio} /></AnimatePresence>
    </main>
  )
}
