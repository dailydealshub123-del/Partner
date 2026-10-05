import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { data } from '../data/birthdayData.js'
import Character from './Character.jsx'
import Cake from './Cake.jsx'
import FloatingDecorations from './FloatingDecorations.jsx'
import SceneTransition, { Burst } from './SceneTransition.jsx'

// step counter that advances through `times` (ms from mount)
const useSteps = (times) => {
  const [s, setS] = useState(0)
  useEffect(() => { const t = times.map((ms, i) => setTimeout(() => setS(i + 1), ms)); return () => t.forEach(clearTimeout) }, [])
  return s
}
const Line = ({ show, children, cls = 'line' }) => (
  <AnimatePresence>{show && <motion.p className={cls} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>{children}</motion.p>}</AnimatePresence>)
const Btn = ({ show = true, children, ...p }) => show ? (
  <motion.button className="btn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: .93 }} whileHover={{ scale: 1.04 }} {...p}>{children}</motion.button>) : null

export function Intro({ next }) {
  const s = useSteps([600, 2800, 5000, 6400])
  const [go, setGo] = useState(false)
  return (
    <SceneTransition>
      <FloatingDecorations density={18} />
      <Character pose="gift" happy={go} size={150} />
      <div className="stack">
        <Line show={s >= 1}>Hey... I made something for you.</Line>
        <Line show={s >= 2}>But you have to promise me one thing...</Line>
        <Line show={s >= 3} cls="line big">Don't skip anything ♡</Line>
      </div>
      <Btn show={s >= 4} onClick={() => { setGo(true); setTimeout(next, 1100) }} disabled={go}>I Promise ♡</Btn>
      {go && <Burst />}
    </SceneTransition>
  )
}

const SPOTS = [[12, 18], [70, 14], [38, 32], [82, 44], [16, 58], [55, 62], [30, 80], [76, 78]]
export function HeartGame({ next }) {
  const [right] = useState(() => Math.floor(Math.random() * SPOTS.length))
  const [msg, setMsg] = useState(''), [shake, setShake] = useState(-1), [won, setWon] = useState(false)
  const wrong = ['Nope 😌 Try again!', 'Almost... ♡', 'So close!', 'Not that one ♡']
  const click = (i) => {
    if (won) return
    if (i === right) { setWon(true); setMsg(''); setTimeout(next, 1500) }
    else { setShake(i); setMsg(wrong[Math.floor(Math.random() * wrong.length)]); setTimeout(() => setShake(-1), 500) }
  }
  return (
    <SceneTransition className="game">
      <FloatingDecorations density={8} glyphs={['✦', '✧']} />
      <div className="stack top"><p className="line">Before I show you the surprise...</p><p className="line big">Find the hidden heart ♡</p>
        <p className="hint" aria-live="polite">{msg || '\u00a0'}</p></div>
      {SPOTS.map(([x, y], i) => (
        <motion.button key={i} className={'heart-btn' + (won && i === right ? ' glow' : '')} style={{ left: x + '%', top: y + '%' }}
          aria-label="heart" animate={shake === i ? { x: [0, -8, 8, -6, 6, 0] } : { y: [0, -8, 0] }}
          transition={shake === i ? { duration: .4 } : { duration: 3 + i * .3, repeat: Infinity }}
          whileTap={{ scale: .85 }} onClick={() => click(i)}>♡</motion.button>))}
      <div className="corner"><Character pose="wave" size={80} happy={won} /></div>
      {won && <><div className="flash" /><Burst n={40} /></>}
    </SceneTransition>
  )
}

export function Reveal({ next }) {
  const s = useSteps([700, 1900, 5500])
  return (
    <SceneTransition className="reveal">
      <motion.div className="flash" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 1.6 }} />
      <FloatingDecorations density={22} glyphs={['♡', '✦', '❀', '🎈']} />
      {s >= 1 && <><Burst n={36} /><motion.h1 className="title" initial={{ opacity: 0, scale: .7, letterSpacing: '.3em' }} animate={{ opacity: 1, scale: 1, letterSpacing: '.02em' }} transition={{ duration: 1.2 }}>✨ Happy Birthday ✨</motion.h1></>}
      {s >= 2 && <motion.h2 className="name" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>{data.friendName} ♡</motion.h2>}
      <div className="row">{s >= 1 && <Cake width={150} />}<Character pose="cheer" happy size={120} /></div>
      <Line show={s >= 3}>Okay... now let's go through some memories.</Line>
      <Btn show={s >= 3} onClick={next}>Open Our Memories →</Btn>
    </SceneTransition>
  )
}

function Photo({ p, className = '', style }) {
  const [bad, setBad] = useState(false)
  return bad ? <div className={'ph-missing ' + className} style={style} role="img" aria-label={p.alt}>♡</div>
    : <img className={className} style={style} src={p.src} alt={p.alt} loading="lazy" onError={() => setBad(true)} />
}
export function Scrapbook({ next }) {
  const [open, setOpen] = useState(null), [hearts, setHearts] = useState([])
  const pick = (i, e) => { setOpen(i); setHearts(h => [...h, { id: Date.now(), x: e.clientX, y: e.clientY }].slice(-5)) }
  return (
    <SceneTransition className="scrap">
      <FloatingDecorations density={8} glyphs={['❀', '✿', '♡']} />
      <h2 className="title sm">Little Moments, Big Memories ♡</h2>
      <p className="sub">Some moments become memories. Some memories become stories.</p>
      <div className="board">
        {data.photos.map((p, i) => (
          <motion.button key={i} className="polaroid" style={{ '--r': (i % 2 ? 1 : -1) * (2 + (i * 7) % 5) + 'deg' }}
            initial={{ opacity: 0, y: 40, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: (i % 2 ? 1 : -1) * (2 + (i * 7) % 5) }}
            transition={{ delay: .15 * i, type: 'spring', stiffness: 90 }} whileHover={{ scale: 1.05, rotate: 0 }} whileTap={{ scale: .96 }}
            onClick={(e) => pick(i, e)} aria-label={'Open photo: ' + p.caption}>
            <span className="tape" /><Photo p={p} /><span className="cap">{p.caption}</span></motion.button>))}
      </div>
      <Btn onClick={next}>There's one more... →</Btn>
      {hearts.map(h => <motion.span key={h.id} className="pop" style={{ left: h.x, top: h.y }} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -60 }} transition={{ duration: 1 }}>♡</motion.span>)}
      <AnimatePresence>{open !== null && (
        <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <motion.figure className="polaroid big" initial={{ scale: .7, rotate: -6 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: .8, opacity: 0 }} onClick={e => e.stopPropagation()}>
            <Photo p={data.photos[open]} /><figcaption className="cap">{data.photos[open].caption}</figcaption>
            <button className="close" onClick={() => setOpen(null)} aria-label="Close photo">✕</button></motion.figure></motion.div>)}</AnimatePresence>
    </SceneTransition>
  )
}

export function Hidden({ next }) {
  const s = useSteps([600, 2400, 3800])
  const [found, setFound] = useState(false), [shk, setShk] = useState(false)
  const find = () => { setShk(true); setTimeout(() => setFound(true), 600) }
  return (
    <SceneTransition className="hidden">
      <FloatingDecorations density={6} />
      <Line show={s >= 1} cls="line big">Wait...</Line><Line show={s >= 2}>I think there's one more.</Line>
      <motion.div className="page" animate={shk ? { x: [0, -7, 7, -5, 5, 0] } : {}} transition={{ duration: .5 }}>
        {s >= 3 && !found && <motion.button className="sticker" aria-label="Hidden sticker" initial={{ opacity: 0 }} animate={{ opacity: .6, rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} onClick={find}>♡</motion.button>}
        {found && <motion.div className="polaroid big reveal-photo" initial={{ scale: .2, opacity: 0, rotate: 20 }} animate={{ scale: 1, opacity: 1, rotate: -2 }} transition={{ type: 'spring', stiffness: 70 }}>
          <span className="tape" /><Photo p={data.hiddenPhoto} /><span className="cap">{data.hiddenPhoto.caption} ♡</span></motion.div>}
      </motion.div>
      {found && <><Burst /><Btn onClick={next}>Continue →</Btn></>}
    </SceneTransition>
  )
}

export function Letter({ next }) {
  const [stage, setStage] = useState('closed'), [n, setN] = useState(0)
  const text = data.letter
  useEffect(() => {
    if (stage !== 'typing') return
    const t = setInterval(() => setN(v => { if (v >= text.length) { clearInterval(t); setStage('done'); return v } return v + 1 }), 32)
    return () => clearInterval(t)
  }, [stage])
  const open = () => { setStage('opening'); setTimeout(() => setStage('typing'), 1100) }
  return (
    <SceneTransition className="letter">
      <FloatingDecorations density={14} glyphs={['❀', '✿', '♡', '✦']} />
      {stage === 'closed' || stage === 'opening' ? <>
        <p className="line big">A little letter, just for you.</p>
        <div className="row"><Character pose="letter" size={100} />
          <motion.div className="envelope" animate={stage === 'opening' ? { scale: 1.1, opacity: 0 } : {}} transition={{ duration: 1 }}>
            <div className="flap" /><div className="seal">♡</div><span className="ribbon" /></motion.div></div>
        <Btn onClick={open} disabled={stage === 'opening'}>Open it ♡</Btn></>
        : <motion.div className="paper" initial={{ opacity: 0, y: 40, scale: .9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .9 }}>
          <p className="hand" aria-label={text}>{text.slice(0, n)}<span className="caret" /></p></motion.div>}
      {stage === 'done' && <><Line>Okay... one last thing.</Line><Btn onClick={next}>There's a song for you →</Btn></>}
      {stage === 'typing' && <button className="skip" onClick={() => { setN(text.length); setStage('done') }}>skip</button>}
    </SceneTransition>
  )
}

export function Music({ next, audio }) {
  const s = useSteps([500, 2800, 4500])
  const [playing, setPlaying] = useState(false), [muted, setMuted] = useState(false), [vol, setVol] = useState(.8), [err, setErr] = useState('')
  useEffect(() => {
    const a = audio.current; if (!a) return
    if (!a.src.includes(data.songFile)) a.src = data.songFile
    const on = () => setPlaying(true), off = () => setPlaying(false)
    a.addEventListener('play', on); a.addEventListener('pause', off); setPlaying(!a.paused)
    return () => { a.removeEventListener('play', on); a.removeEventListener('pause', off) }
  }, [])
  useEffect(() => { if (audio.current) { audio.current.volume = vol; audio.current.muted = muted } }, [vol, muted])
  const toggle = async () => { const a = audio.current; try { setErr(''); playing ? a.pause() : await a.play() } catch { setErr('Add your song at public/music/song.mp3 ♡') } }
  return (
    <SceneTransition className="music">
      <FloatingDecorations density={playing ? 16 : 5} />
      <p className="line big">This One Is For You ♡</p>
      <Line show={s >= 1}>{data.songMessage[0]}</Line><Line show={s >= 2}>{data.songMessage[1]}</Line>
      {s >= 3 && <motion.div className="player" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className={'vinyl' + (playing ? ' spin' : '')}><span /></div>
        <div className="meta"><strong>{data.songTitle}</strong><em>{data.songArtist}</em>
          <div className={'eq' + (playing ? ' on' : '')} aria-hidden="true">{[0, 1, 2, 3, 4].map(i => <i key={i} style={{ animationDelay: i * .15 + 's' }} />)}</div></div>
        <button className="play" onClick={toggle} aria-label={playing ? 'Pause song' : 'Play song'}>{playing ? <Pause /> : <Play />}</button>
        <div className="vol"><button onClick={() => setMuted(m => !m)} aria-label={muted ? 'Unmute' : 'Mute'}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
          <input type="range" min="0" max="1" step=".05" value={vol} onChange={e => setVol(+e.target.value)} aria-label="Volume" /></div>
        <p className="hint">{err}</p></motion.div>}
      <div className="corner"><Character pose="heart" size={80} happy={playing} /></div>
      <Btn show={s >= 3} onClick={next}>Continue →</Btn>
    </SceneTransition>
  )
}

export function Wish({ next }) {
  const s = useSteps([600, 2200])
  const [made, setMade] = useState(false)
  return (
    <SceneTransition className={'wish' + (made ? ' night' : '')}>
      <FloatingDecorations density={made ? 30 : 6} glyphs={['✦', '✧', '·']} dark={made} />
      <Line show={s >= 1}>Before you go...</Line><Line show={s >= 2} cls="line big">Make a wish. ✨</Line>
      <Cake lit={!made} width={200} />
      {!made && s >= 2 && <Btn onClick={() => setMade(true)}>Make My Wish</Btn>}
      {made && <><Burst /><motion.p className="line big" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1.4 }}>{data.wishMessage}</motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}><Btn onClick={next}>One last thing →</Btn></motion.div></>}
    </SceneTransition>
  )
}

export function Final({ restart }) {
  const s = useSteps([800, 3600, 6400, 9400, 11600, 13500])
  return (
    <SceneTransition className="final">
      <FloatingDecorations density={26} glyphs={['♡', '✦', '❀', '✧']} />
      <Character pose={s >= 4 ? 'wave' : 'heart'} happy={s >= 4} size={120} />
      <div className="stack">
        {data.finalMessage.map((t, i) => <Line key={i} show={s > i}>{t}</Line>)}
        <Line show={s >= 4} cls="title sm">Happy Birthday, {data.friendName}!</Line>
        <Line show={s >= 5}>With love,<br />{data.senderName}</Line>
        <Line show={s >= 5} cls="hint">{data.date}</Line>
      </div>
      <Btn show={s >= 6} onClick={restart}>Replay your little surprise ↻</Btn>
    </SceneTransition>
  )
}
