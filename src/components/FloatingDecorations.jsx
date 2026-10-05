import { useMemo } from 'react'
const GLYPHS = ['♡', '✦', '✧', '❀', '·']
// Lightweight CSS-only floaters (GPU friendly).
export default function FloatingDecorations({ density = 14, glyphs = GLYPHS, dark = false }) {
  const items = useMemo(() => Array.from({ length: density }, (_, i) => ({
    g: glyphs[i % glyphs.length], left: Math.random() * 100, size: 10 + Math.random() * 18,
    dur: 12 + Math.random() * 14, delay: -Math.random() * 20, o: 0.25 + Math.random() * 0.45,
  })), [density, glyphs])
  return (
    <div className="floaters" aria-hidden="true">
      {items.map((it, i) => (
        <span key={i} className={dark ? 'dark' : ''} style={{ left: it.left + '%', fontSize: it.size, animationDuration: it.dur + 's', animationDelay: it.delay + 's', opacity: it.o }}>{it.g}</span>
      ))}
    </div>
  )
}
