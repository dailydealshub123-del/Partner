import { motion } from 'framer-motion'
export default function SceneTransition({ children, className = '' }) {
  return (
    <motion.section className={'scene ' + className}
      initial={{ opacity: 0, scale: .96, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
      transition={{ duration: .7, ease: 'easeOut' }}>{children}</motion.section>
  )
}
export function Burst({ n = 28 }) {
  const bits = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2, d = 90 + Math.random() * 140
    return { x: Math.cos(a) * d, y: Math.sin(a) * d, g: ['♡', '✦', '❀', '✧'][i % 4] }
  })
  return <div className="burst" aria-hidden="true">{bits.map((b, i) =>
    <motion.span key={i} initial={{ x: 0, y: 0, opacity: 1, scale: .4 }} animate={{ x: b.x, y: b.y, opacity: 0, scale: 1.4 }} transition={{ duration: 1.3, ease: 'easeOut' }}>{b.g}</motion.span>)}</div>
}
