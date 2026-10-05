import { motion } from 'framer-motion'
export default function Cake({ lit = true, width = 190 }) {
  return (
    <svg width={width} viewBox="0 0 200 190" role="img" aria-label="Birthday cake with a candle">
      <ellipse cx="100" cy="178" rx="88" ry="8" fill="#d8a5b5" opacity=".25" />
      <rect x="20" y="110" width="160" height="62" rx="12" fill="#fbd5df" stroke="#e58aa5" strokeWidth="2" />
      <rect x="38" y="70" width="124" height="46" rx="10" fill="#fff" stroke="#e58aa5" strokeWidth="2" />
      <path d="M20 128q15 14 30 0t30 0 30 0 30 0 30 0" stroke="#fff" strokeWidth="9" fill="none" strokeLinecap="round" />
      {[52, 100, 148].map(x => <circle key={x} cx={x} cy="150" r="4" fill="#e58aa5" />)}
      <rect x="95" y="38" width="10" height="34" rx="3" fill="#c9b3f0" />
      {lit && <motion.g style={{ originX: '100px', originY: '36px' }} animate={{ scale: [1, 1.15, .95, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
        <path d="M100 14c8 8 8 16 0 22-8-6-8-14 0-22z" fill="#ffd27a" /><circle cx="100" cy="30" r="14" fill="#ffe9a8" opacity=".35" /></motion.g>}
    </svg>
  )
}
