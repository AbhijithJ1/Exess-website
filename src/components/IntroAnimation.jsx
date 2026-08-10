import { useEffect, useRef } from 'react'

/**
 * IntroAnimation — Ground-Up Canvas Rebuild
 *
 * USES A SINGLE HTML CANVAS for the entire animation sequence.
 * This completely eliminates:
 *   - React DOM mount flashes (no SVG elements ever visible at time-zero)
 *   - GSAP SVG attribute animation compatibility bugs (cx/cy not animatable without AttrPlugin)
 *   - Independent Framer Motion / CSS animations interfering
 *   - Stale HMR cache issues
 *
 * SEQUENCE:
 *   Phase 1: PCB traces draw from outer endpoints inward                    (0.0 – 1.0s)
 *   Phase 2: Outer endpoint pads light up simultaneously                    (1.0 – 1.25s)
 *   Phase 3: Energy pulse travels along ACTUAL PCB paths (dash animation)   (1.25 – 2.1s)
 *   Phase 4: Inner endpoint pads charge and glow                            (2.1 – 2.4s)
 *   Phase 5: Particles move from inner pads to central core                 (2.4 – 2.9s)
 *   Phase 6: Central energy core forms                                      (2.9 – 3.2s)
 *   Phase 7: ExESS emblem strokes draw from center outward                  (3.2 – 3.9s)
 *   Phase 8: ExESS wordmark letters reveal L→R                             (3.9 – 4.5s)
 *   Phase 9: Final stable state — PCB REMAINS PERMANENTLY VISIBLE           (4.5 – 5.0s)
 */

// ──────────────────────────────────────────────────────────────
// PCB GEOMETRY — 8 traces, each defined as a series of [x, y] waypoints
// All coordinates in a 600×600 SVG viewBox.
// Outer endpoints are the START of each trace.
// Inner endpoints are the END of each trace (nearest to center).
// CENTER = (300, 300) — where the logo sits
// ──────────────────────────────────────────────────────────────
const TRACES = [
  // Top-left
  { pts: [[40, 40], [180, 40], [180, 130], [175, 130]] },
  // Top-right
  { pts: [[560, 40], [420, 40], [420, 130], [425, 130]] },
  // Middle-left upper
  { pts: [[20, 220], [130, 220], [130, 235], [175, 235]] },
  // Middle-left lower
  { pts: [[20, 370], [130, 370], [130, 355], [175, 355]] },
  // Middle-right upper
  { pts: [[580, 220], [470, 220], [470, 235], [425, 235]] },
  // Middle-right lower
  { pts: [[580, 370], [470, 370], [470, 355], [425, 355]] },
  // Bottom-left
  { pts: [[40, 560], [180, 560], [180, 470], [175, 470]] },
  // Bottom-right
  { pts: [[560, 560], [420, 560], [420, 470], [425, 470]] },
]

// Pre-compute segment lengths and total length for each trace
function computeTraceData(trace) {
  const { pts } = trace
  const segments = []
  let total = 0
  for (let i = 0; i < pts.length - 1; i++) {
    const dx = pts[i + 1][0] - pts[i][0]
    const dy = pts[i + 1][1] - pts[i][1]
    const len = Math.sqrt(dx * dx + dy * dy)
    segments.push({ x0: pts[i][0], y0: pts[i][1], x1: pts[i + 1][0], y1: pts[i + 1][1], len })
    total += len
  }
  return { pts, segments, total }
}

// Get the (x, y) position at progress t (0–1) along a trace
function tracePosAt(traceData, t) {
  const dist = t * traceData.total
  let acc = 0
  for (const seg of traceData.segments) {
    if (acc + seg.len >= dist) {
      const f = (dist - acc) / seg.len
      return [seg.x0 + (seg.x1 - seg.x0) * f, seg.y0 + (seg.y1 - seg.y0) * f]
    }
    acc += seg.len
  }
  const last = traceData.pts[traceData.pts.length - 1]
  return [last[0], last[1]]
}

// Easing functions
const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
const easeOut   = (t) => 1 - Math.pow(1 - t, 3)
const easeIn    = (t) => t * t * t

// Colors
const C_PCB   = '#1E6B93'
const C_CYAN  = '#32C5E8'
const C_WHITE = '#FFFFFF'

// ExESS emblem strokes to draw (in 600×600 canvas coordinates)
// Globe center at (300, 270), radius 58
const GLB_CX = 300, GLB_CY = 270, GLB_R = 58

function drawEmblemStrokes(ctx, progress, scale = 1) {
  // progress: 0..1 — reveals emblem from center outward
  ctx.save()
  ctx.translate(GLB_CX, GLB_CY)
  ctx.scale(scale, scale)
  ctx.translate(-GLB_CX, -GLB_CY)

  const p = easeOut(Math.min(progress, 1))
  ctx.globalAlpha = p
  ctx.lineCap = 'round'

  // Outer circle
  ctx.beginPath()
  ctx.arc(GLB_CX, GLB_CY, GLB_R, -Math.PI / 2 - Math.PI * p, -Math.PI / 2 + Math.PI * p)
  ctx.strokeStyle = C_PCB
  ctx.lineWidth = 3.5
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(GLB_CX, GLB_CY, GLB_R, Math.PI / 2 - Math.PI * p, Math.PI / 2 + Math.PI * p)
  ctx.strokeStyle = C_PCB
  ctx.lineWidth = 3.5
  ctx.stroke()

  // Latitude ellipses — 3 of them
  for (const ry of [14, 28, 40]) {
    ctx.beginPath()
    ctx.save()
    ctx.translate(GLB_CX, GLB_CY)
    ctx.scale(1, ry / GLB_R)
    ctx.arc(0, 0, GLB_R, -Math.PI * p, Math.PI * p)
    ctx.restore()
    ctx.strokeStyle = C_PCB
    ctx.lineWidth = 1.5
    ctx.globalAlpha = p * 0.7
    ctx.stroke()
  }
  ctx.globalAlpha = p

  // Vertical lines — 3 of them
  for (const [xOff, h] of [
    [0, GLB_R], [-30, GLB_R * 0.8], [30, GLB_R * 0.8]
  ]) {
    ctx.beginPath()
    ctx.moveTo(GLB_CX + xOff, GLB_CY - h * p)
    ctx.lineTo(GLB_CX + xOff, GLB_CY + h * p)
    ctx.strokeStyle = C_PCB
    ctx.lineWidth = 1.5
    ctx.globalAlpha = p * 0.7
    ctx.stroke()
  }

  // Cyan orbit ellipse
  ctx.globalAlpha = p
  ctx.save()
  ctx.translate(GLB_CX, GLB_CY)
  ctx.rotate(-12 * Math.PI / 180)
  ctx.scale(1, 20 / 68)
  ctx.beginPath()
  ctx.arc(0, 0, 68, -Math.PI * p, Math.PI * p)
  ctx.restore()
  ctx.strokeStyle = C_CYAN
  ctx.lineWidth = 3
  ctx.stroke()

  // PCB legs below globe
  const legY = GLB_CY + GLB_R + 4
  const legs = [
    [GLB_CX - 25, legY, GLB_CX - 30, legY + 20, GLB_CX - 45, legY + 20, GLB_CX - 45, legY + 42],
    [GLB_CX - 10, legY, GLB_CX - 10, legY + 25, GLB_CX - 25, legY + 25, GLB_CX - 25, legY + 52],
    [GLB_CX,      legY, GLB_CX,      legY + 32],
    [GLB_CX + 10, legY, GLB_CX + 10, legY + 22, GLB_CX + 25, legY + 22, GLB_CX + 25, legY + 42],
    [GLB_CX + 25, legY, GLB_CX + 30, legY + 25, GLB_CX + 45, legY + 25, GLB_CX + 45, legY + 52],
  ]
  ctx.globalAlpha = p * 0.85
  ctx.strokeStyle = C_PCB
  ctx.lineWidth = 2.5
  for (const leg of legs) {
    ctx.beginPath()
    // Animate each leg segment partially
    const drawLen = leg.length / 2
    for (let i = 0; i < drawLen - 1; i++) {
      const t2 = Math.min(p * drawLen - i, 1)
      if (t2 <= 0) break
      const x0 = leg[i * 2], y0 = leg[i * 2 + 1]
      const x1 = leg[(i + 1) * 2], y1 = leg[(i + 1) * 2 + 1]
      ctx.moveTo(x0, y0)
      ctx.lineTo(x0 + (x1 - x0) * t2, y0 + (y1 - y0) * t2)
    }
    ctx.stroke()
  }

  // Terminal pads at leg ends
  const pads = [
    [GLB_CX - 45, legY + 42],
    [GLB_CX - 25, legY + 52],
    [GLB_CX,      legY + 32],
    [GLB_CX + 25, legY + 42],
    [GLB_CX + 45, legY + 52],
  ]
  if (p > 0.7) {
    const padP = (p - 0.7) / 0.3
    for (const [px, py] of pads) {
      ctx.globalAlpha = padP
      ctx.strokeStyle = C_PCB
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.roundRect(px - 7, py - 7, 14, 14, 2)
      ctx.stroke()
      ctx.fillStyle = C_PCB
      ctx.globalAlpha = padP * 0.5
      ctx.beginPath()
      ctx.roundRect(px - 3, py - 3, 6, 6, 1)
      ctx.fill()
    }
  }

  ctx.restore()
}

// Draw ExESS wordmark letters — drawn in 600×600 coordinate space
// (called inside the scaled+translated canvas context)
function drawWordmark(ctx, progress) {
  // progress is per-letter: 0..5 float
  const letters = ['E', 'x', 'E', 'S', 'S']
  // Font size in 600×600 units
  const fontSize = 68
  ctx.save()
  ctx.font = `bold ${fontSize}px "Space Grotesk", system-ui, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Center each letter around cx=300
  const charW = fontSize * 0.62  // approximate glyph advance
  const totalW = letters.length * charW
  const startX = 300 - totalW / 2 + charW / 2
  const y = GLB_CY + GLB_R + 90

  letters.forEach((ch, i) => {
    const lp = Math.max(0, Math.min(1, progress - i))
    if (lp <= 0) return
    const p = easeOut(lp)
    ctx.globalAlpha = p
    ctx.fillStyle = '#1E6B93'
    ctx.fillText(ch, startX + i * charW, y)
  })
  ctx.restore()
}

// ──────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────────────────────
const IntroAnimation = ({ onComplete }) => {
  const containerRef = useRef(null)
  const canvasRef    = useRef(null)
  const rafRef       = useRef(null)
  const startRef     = useRef(null)
  const doneRef      = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const el = containerRef.current
    if (el) {
      el.style.transition = 'opacity 0.4s ease-out'
      el.style.opacity = '0'
      setTimeout(() => { if (onComplete) onComplete() }, 400)
    } else if (onComplete) {
      onComplete()
    }
  }

  useEffect(() => {
    // Skip animation for reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish()
      return
    }

    const canvas  = canvasRef.current
    const container = containerRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    let W = container.clientWidth
    let H = container.clientHeight

    const resize = () => {
      W = container.clientWidth
      H = container.clientHeight
      canvas.width  = W * dpr
      canvas.height = H * dpr
      canvas.style.width  = W + 'px'
      canvas.style.height = H + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    // Pre-compute all trace data
    const traceData = TRACES.map(computeTraceData)

    // Scale factor: our geometry is in 600×600 coords, canvas is variable size
    const getScale = () => {
      const s = Math.min(W, H) / 600 * 0.92
      return s
    }
    const getOffset = () => {
      const s = getScale()
      return { ox: (W - 600 * s) / 2, oy: (H - 600 * s) / 2 }
    }

    // ── DRAW FRAME ────────────────────────────────────────────
    const draw = (ts) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = (ts - startRef.current) / 1000 // seconds

      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.save()
      ctx.scale(dpr, dpr)

      const s  = getScale()
      const { ox, oy } = getOffset()

      // Transform into 600×600 coordinate space
      ctx.translate(ox, oy)
      ctx.scale(s, s)

      // ─────────────────────────────────────────────
      // PHASE 1: PCB TRACE FORMATION  0.0 – 1.0s
      // ─────────────────────────────────────────────
      const pcbP = Math.min(1, elapsed / 1.0)

      traceData.forEach((td) => {
        const p = easeInOut(pcbP)
        // Draw trace up to progress p
        let remaining = p * td.total

        ctx.beginPath()
        ctx.lineCap = 'square'
        ctx.strokeStyle = C_PCB
        ctx.lineWidth = 1.8
        ctx.globalAlpha = 0.85

        let started = false
        for (const seg of td.segments) {
          if (remaining <= 0) break
          const draw = Math.min(remaining, seg.len)
          const f = draw / seg.len
          if (!started) {
            ctx.moveTo(seg.x0, seg.y0)
            started = true
          }
          ctx.lineTo(seg.x0 + (seg.x1 - seg.x0) * f, seg.y0 + (seg.y1 - seg.y0) * f)
          remaining -= draw
        }
        ctx.stroke()
      })

      // ─────────────────────────────────────────────
      // PHASE 2: OUTER ENDPOINTS ACTIVATE  1.0 – 1.25s
      // ─────────────────────────────────────────────
      const outerP = Math.min(1, Math.max(0, (elapsed - 1.0) / 0.25))

      if (outerP > 0) {
        // Glow fades out after energy has moved through (~3.5s)
        const outerFade = elapsed > 3.5 ? Math.max(0, 1 - (elapsed - 3.5) / 0.5) : 1
        const p = easeOut(outerP)
        traceData.forEach((td) => {
          const [ox2, oy2] = td.pts[0]
          ctx.globalAlpha = p * 0.45  // always show dim dot
          ctx.fillStyle = C_PCB
          ctx.beginPath()
          ctx.arc(ox2, oy2, 4.5, 0, Math.PI * 2)
          ctx.fill()
          // Glow ring only during active phase
          if (outerFade > 0) {
            const grad = ctx.createRadialGradient(ox2, oy2, 0, ox2, oy2, 10)
            grad.addColorStop(0, `rgba(50,197,232,${0.9 * outerFade})`)
            grad.addColorStop(1, 'rgba(50,197,232,0)')
            ctx.fillStyle = grad
            ctx.globalAlpha = outerFade
            ctx.beginPath()
            ctx.arc(ox2, oy2, 10, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = C_CYAN
            ctx.globalAlpha = outerFade
            ctx.beginPath()
            ctx.arc(ox2, oy2, 4.5, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      }

      // ─────────────────────────────────────────────
      // PHASE 3: ENERGY TRAVELS ALONG PCB PATHS  1.25 – 2.1s
      // ─────────────────────────────────────────────
      const energyP = Math.min(1, Math.max(0, (elapsed - 1.25) / 0.85))

      if (energyP > 0) {
        const p = easeInOut(energyP)
        traceData.forEach((td) => {
          // Draw energy pulse: a short segment (dash) travelling along the path
          const dashLen = 55 // canvas units
          const headDist = p * td.total
          const tailDist = Math.max(0, headDist - dashLen)

          ctx.save()
          ctx.lineCap = 'round'
          ctx.lineWidth = 3
          ctx.shadowColor = C_CYAN
          ctx.shadowBlur = 8

          // Walk the trace and draw only the segment from tailDist to headDist
          let acc = 0
          let drawing = false
          let pathStarted = false

          ctx.beginPath()
          for (const seg of td.segments) {
            const segEnd = acc + seg.len
            if (segEnd < tailDist) { acc += seg.len; continue }
            if (acc > headDist) break

            const drawFrom = Math.max(acc, tailDist)
            const drawTo   = Math.min(segEnd, headDist)
            const fFrom    = (drawFrom - acc) / seg.len
            const fTo      = (drawTo - acc) / seg.len

            const px0 = seg.x0 + (seg.x1 - seg.x0) * fFrom
            const py0 = seg.y0 + (seg.y1 - seg.y0) * fFrom
            const px1 = seg.x0 + (seg.x1 - seg.x0) * fTo
            const py1 = seg.y0 + (seg.y1 - seg.y0) * fTo

            if (!pathStarted) {
              ctx.moveTo(px0, py0)
              pathStarted = true
            }
            ctx.lineTo(px1, py1)
            acc += seg.len
          }

          // Gradient stroke: fade in at tail, bright in middle, fade at head
          const headPos = tracePosAt(td, Math.min(1, headDist / td.total))
          const tailPos = tracePosAt(td, Math.min(1, tailDist / td.total))
          const grd = ctx.createLinearGradient(tailPos[0], tailPos[1], headPos[0], headPos[1])
          grd.addColorStop(0, 'rgba(50,197,232,0)')
          grd.addColorStop(0.4, 'rgba(50,197,232,0.9)')
          grd.addColorStop(1, 'rgba(255,255,255,1)')
          ctx.strokeStyle = grd
          ctx.globalAlpha = 1
          ctx.stroke()
          ctx.restore()
        })
      }

      // ─────────────────────────────────────────────
      // PHASE 4: INNER ENDPOINTS CHARGE  2.1 – 2.4s
      // ─────────────────────────────────────────────
      const innerP = Math.min(1, Math.max(0, (elapsed - 2.1) / 0.3))

      if (innerP > 0) {
        // Inner glow fades out after convergence completes (~3.0s)
        const innerFade = elapsed > 3.0 ? Math.max(0, 1 - (elapsed - 3.0) / 0.5) : 1
        const p = easeOut(innerP)
        traceData.forEach((td) => {
          const [ix, iy] = td.pts[td.pts.length - 1]
          // Always show a dim dot
          ctx.fillStyle = C_PCB
          ctx.globalAlpha = 0.45
          ctx.beginPath()
          ctx.arc(ix, iy, 4, 0, Math.PI * 2)
          ctx.fill()
          // Glow only during active phase
          if (innerFade > 0) {
            const grad = ctx.createRadialGradient(ix, iy, 0, ix, iy, 12)
            grad.addColorStop(0, `rgba(50,197,232,${0.95 * innerFade})`)
            grad.addColorStop(1, 'rgba(50,197,232,0)')
            ctx.fillStyle = grad
            ctx.globalAlpha = innerFade * p
            ctx.beginPath()
            ctx.arc(ix, iy, 12, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = C_WHITE
            ctx.globalAlpha = innerFade * p
            ctx.beginPath()
            ctx.arc(ix, iy, 4, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      }

      // ─────────────────────────────────────────────
      // PHASE 5: CONVERGENCE — PARTICLES FROM INNER PADS TO CENTER  2.4 – 2.9s
      // ─────────────────────────────────────────────
      const convP = Math.min(1, Math.max(0, (elapsed - 2.4) / 0.5))

      if (convP > 0) {
        const p = easeIn(convP)
        const CX = 300, CY = 300
        traceData.forEach((td) => {
          const [ix, iy] = td.pts[td.pts.length - 1]
          // Particle moves from inner pad to center
          const px = ix + (CX - ix) * p
          const py = iy + (CY - iy) * p
          // Fade in then out as it approaches center
          const alpha = p < 0.85 ? Math.min(1, p * 3) : (1 - p) / 0.15

          ctx.save()
          ctx.shadowColor = C_CYAN
          ctx.shadowBlur = 12
          ctx.fillStyle = C_WHITE
          ctx.globalAlpha = Math.max(0, alpha)
          ctx.beginPath()
          ctx.arc(px, py, 3.5, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })
      }

      // ─────────────────────────────────────────────
      // PHASE 6: CENTRAL ENERGY CORE  2.9 – 3.2s
      // ─────────────────────────────────────────────
      const coreP = Math.min(1, Math.max(0, (elapsed - 2.9) / 0.3))
      // Core fades out as emblem forms
      const coreFadeOut = elapsed > 3.5 ? Math.max(0, 1 - (elapsed - 3.5) / 0.4) : 1

      if (coreP > 0 && coreFadeOut > 0) {
        const p = easeOut(coreP)
        const CX = 300, CY = 300
        const coreR = 22 * p
        const alpha = p * coreFadeOut

        ctx.save()
        const grad = ctx.createRadialGradient(CX, CY, 0, CX, CY, coreR)
        grad.addColorStop(0, 'rgba(255,255,255,1)')
        grad.addColorStop(0.3, 'rgba(50,197,232,0.9)')
        grad.addColorStop(1, 'rgba(50,197,232,0)')
        ctx.fillStyle = grad
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(CX, CY, coreR, 0, Math.PI * 2)
        ctx.fill()
        // Inner white dot
        ctx.fillStyle = C_WHITE
        ctx.globalAlpha = alpha
        ctx.shadowColor = C_CYAN
        ctx.shadowBlur = 16
        ctx.beginPath()
        ctx.arc(CX, CY, 5 * p, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // ─────────────────────────────────────────────
      // PHASE 7: EXESS EMBLEM FORMS  3.2 – 3.9s
      // ─────────────────────────────────────────────
      const emblemP = Math.min(1, Math.max(0, (elapsed - 3.2) / 0.7))

      if (emblemP > 0) {
        drawEmblemStrokes(ctx, emblemP)
      }

      // ─────────────────────────────────────────────
      // PHASE 8: WORDMARK FORMS  3.9 – 4.55s
      // ─────────────────────────────────────────────
      const wmStart = 3.9, wmPerLetter = 0.13
      const wmLetterProgress = Math.max(0, (elapsed - wmStart) / wmPerLetter)

      if (wmLetterProgress > 0) {
        drawWordmark(ctx, wmLetterProgress)
      }

      ctx.restore()

      // Loop until done or animation is complete
      const TOTAL = 5.2
      if (elapsed < TOTAL && !doneRef.current) {
        rafRef.current = requestAnimationFrame(draw)
      } else if (!doneRef.current) {
        // Draw one final frame at full completion then finish
        rafRef.current = requestAnimationFrame(() => {
          finish()
        })
      }
    }

    rafRef.current = requestAnimationFrame(draw)

    // Safety timeout
    const safetyTimer = setTimeout(finish, 6000)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(safetyTimer)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onClick={finish}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '2rem',
          fontSize: '11px',
          fontFamily: 'monospace',
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      >
        Click to skip →
      </div>
    </div>
  )
}

export default IntroAnimation
