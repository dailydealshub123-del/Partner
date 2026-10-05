import { motion } from 'framer-motion'
// Recurring bunny guide. pose: 'gift' | 'cheer' | 'letter' | 'wave' | 'heart'
export default function Character({ pose = 'gift', size = 150, happy = false }) {
  const arm = { gift: -8, cheer: -60, letter: -15, wave: -55, heart: -20 }[pose]
  const stroke = { stroke: '#f0c4d0', strokeWidth: 2 }
  return (
    <motion.svg width={size} height={size * 1.15} viewBox="0 0 160 184" role="img" aria-label="Cute bunny guide"
      animate={{ y: [0, -6, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
      <ellipse cx="80" cy="176" rx="42" ry="5" fill="#d8a5b5" opacity=".25" />
      <ellipse cx="55" cy="30" rx="14" ry="34" fill="#fff" {...stroke} /><ellipse cx="55" cy="32" rx="6" ry="22" fill="#f9cfdb" />
      <ellipse cx="105" cy="30" rx="14" ry="34" fill="#fff" {...stroke} /><ellipse cx="105" cy="32" rx="6" ry="22" fill="#f9cfdb" />
      <ellipse cx="80" cy="140" rx="36" ry="32" fill="#fff" {...stroke} />
      <circle cx="80" cy="92" r="38" fill="#fff" {...stroke} />
      <circle cx="62" cy="100" r="7" fill="#fbc6d4" opacity=".7" /><circle cx="98" cy="100" r="7" fill="#fbc6d4" opacity=".7" />
      {happy ? <path d="M60 88q5-7 10 0M90 88q5-7 10 0" stroke="#7a4b5a" strokeWidth="3" fill="none" strokeLinecap="round" />
        : <><circle cx="65" cy="88" r="4.5" fill="#7a4b5a" /><circle cx="95" cy="88" r="4.5" fill="#7a4b5a" /></>}
      <path d="M74 100q6 6 12 0" stroke="#7a4b5a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M62 54l14 8-14 8zM98 54l-14 8 14 8z" fill="#e58aa5" transform="translate(2 4)" /><circle cx="80" cy="62" r="4" fill="#d86a8b" transform="translate(2 4)" />
      <motion.g style={{ originX: '118px', originY: '120px' }} animate={{ rotate: pose === 'wave' || pose === 'cheer' ? [arm, arm + 25, arm] : arm }} transition={{ duration: .8, repeat: Infinity }}>
        <ellipse cx="124" cy="132" rx="9" ry="16" fill="#fff" {...stroke} /></motion.g>
      <ellipse cx="38" cy="132" rx="9" ry="16" fill="#fff" {...stroke} />
      {pose === 'gift' && <g><rect x="62" y="132" width="36" height="28" rx="4" fill="#f7c6d6" stroke="#e58aa5" strokeWidth="2" /><rect x="76" y="132" width="8" height="28" fill="#e58aa5" /></g>}
      {pose === 'letter' && <g><rect x="58" y="136" width="44" height="28" rx="3" fill="#fffaf0" stroke="#e8cfa8" strokeWidth="2" /><path d="M58 138l22 14 22-14" stroke="#e8cfa8" fill="none" strokeWidth="2" /><circle cx="80" cy="152" r="5" fill="#e58aa5" /></g>}
      {pose === 'heart' && <path d="M80 160c-14-9-16-18-8-22 4-2 8 0 8 4 0-4 4-6 8-4 8 4 6 13-8 22z" fill="#e58aa5" />}
    </motion.svg>
  )
}
