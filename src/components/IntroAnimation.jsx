import { useEffect, useRef } from 'react'

/**
 * ExESS Intro Animation — Energy Transformation State Machine
 *
 * ONE immutable PCB geometry. The PCB is the energy source.
 * All energy converges to ONE CENTRAL CORE, which then transforms/forges the ExESS logo.
 * Convergence streams FADE OUT completely before central core blooming / emblem formation.
 *
 * TIMELINE (seconds):
 *  0.00 – 1.10  Step 1: PCB traces draw in (outer to inner)
 *  1.10 – 1.40  Step 2: Outer endpoints activate (simultaneous cyan glow)
 *  1.40 – 2.30  Step 3: Energy pulse travels outer to inner along 90° PCB paths
 *  2.30 – 2.55  Step 4: Inner endpoints charge & pulse intensely
 *  2.55 – 3.10  Step 5: STRONG CONVERGENCE — Energy streams travel from all inner pads to center (300,295) and vanish as core forms
 *  3.10 – 3.65  Step 6: POWERFUL CENTRAL CORE — Pure white-hot core blooms into 16-ray starburst (NO convergence lines, NO emblem yet)
 *  3.65 – 4.35  Step 7: EMBLEM FORGED — Central core transforms/expands to draw ExESS emblem & lower legs
 *  4.35 – 4.90  Step 8: WORDMARK FORGED — Energy extends downward from core to construct "ExESS" wordmark
 *  4.90 – 5.65  Step 9: ENERGY RETRACTS — Glowing pulse pulls backward inner to outer along SAME PCB paths
 *  5.65 – 6.40  Step 10: FINAL STABLE LOGO — Clean ExESS emblem + wordmark + original PCB framing
 */

// PCB GEOMETRY — IMMUTABLE. One definition used in every frame.
// 600x600 coordinate space. Centre = (300, 295)
// Outer endpoints = pts[0]   Inner endpoints = pts[last]
const TRACES = [
  // Top-left
  { pts: [[48, 48],  [196, 48],  [196, 148], [196, 148]] },
  // Top-right
  { pts: [[552, 48], [404, 48],  [404, 148], [404, 148]] },
  // Mid-left upper
  { pts: [[24, 232], [148, 232], [148, 248], [196, 248]] },
  // Mid-right upper
  { pts: [[576, 232],[452, 232], [452, 248], [404, 248]] },
  // Mid-left lower
  { pts: [[24, 362], [148, 362], [148, 346], [196, 346]] },
  // Mid-right lower
  { pts: [[576, 362],[452, 362], [452, 346], [404, 346]] },
  // Bottom-left
  { pts: [[48, 550], [196, 550], [196, 448], [196, 448]] },
  // Bottom-right
  { pts: [[552, 550],[404, 550], [404, 448], [404, 448]] },
]

const CX = 300, CY = 295

// --- Geometry Utilities ---
function buildTrace(trace) {
  const { pts } = trace
  const segs = []
  let total = 0
  for (let i = 0; i < pts.length - 1; i++) {
    const dx = pts[i + 1][0] - pts[i][0]
    const dy = pts[i + 1][1] - pts[i][1]
    const len = Math.hypot(dx, dy)
    if (len < 0.001) continue
    segs.push({ x0: pts[i][0], y0: pts[i][1], x1: pts[i+1][0], y1: pts[i+1][1], len })
    total += len
  }
  return { pts, segs, total, outerPt: pts[0], innerPt: pts[pts.length - 1] }
}

function posAt(td, t) {
  let rem = Math.max(0, Math.min(1, t)) * td.total
  for (const s of td.segs) {
    if (rem <= s.len) {
      const f = rem / s.len
      return [s.x0 + (s.x1 - s.x0) * f, s.y0 + (s.y1 - s.y0) * f]
    }
    rem -= s.len
  }
  return [td.innerPt[0], td.innerPt[1]]
}

function strokeSeg(ctx, td, tStart, tEnd) {
  const dStart = tStart * td.total
  const dEnd   = tEnd   * td.total
  let acc = 0, started = false
  ctx.beginPath()
  for (const s of td.segs) {
    const sEnd = acc + s.len
    if (sEnd <= dStart) { acc += s.len; continue }
    if (acc   >= dEnd)  break
    const from = Math.max(acc, dStart)
    const to   = Math.min(sEnd, dEnd)
    const fF   = (from - acc) / s.len
    const fT   = (to   - acc) / s.len
    const x0 = s.x0 + (s.x1 - s.x0) * fF, y0 = s.y0 + (s.y1 - s.y0) * fF
    const x1 = s.x0 + (s.x1 - s.x0) * fT, y1 = s.y0 + (s.y1 - s.y0) * fT
    if (!started) { ctx.moveTo(x0, y0); started = true }
    ctx.lineTo(x1, y1)
    acc += s.len
  }
  ctx.stroke()
}

// --- Easing ---
const eio3  = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2
const eo3   = t => 1 - Math.pow(1-t, 3)
const ei2   = t => t * t
const eo4   = t => 1 - Math.pow(1-t, 4)
const clamp = t => Math.max(0, Math.min(1, t))
const ph    = (t, s, d) => clamp((t - s) / d)

// --- Colors ---
const C_PCB   = '#1E6B93'
const C_CYAN  = '#32C5E8'
const C_WHITE = '#FFFFFF'

// --- Emblem ---
const GCX = CX, GCY = CY - 10, GR = 56

function drawEmblem(ctx, p) {
  // p: 0 -> 1 (Energy-constructed reveal from central core outward)
  ctx.save()
  ctx.globalAlpha = p
  ctx.lineCap = 'round'

  // Outer circle (sweeps outward from top/bottom)
  ctx.strokeStyle = C_PCB
  ctx.lineWidth = 3.5
  ctx.beginPath()
  ctx.arc(GCX, GCY, GR, -Math.PI/2 - Math.PI*p, -Math.PI/2 + Math.PI*p)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(GCX, GCY, GR,  Math.PI/2 - Math.PI*p,  Math.PI/2 + Math.PI*p)
  ctx.stroke()

  // Latitude ellipses
  ctx.lineWidth = 1.5
  for (const ry of [GR * 0.25, GR * 0.50, GR * 0.72]) {
    ctx.save()
    ctx.translate(GCX, GCY)
    ctx.scale(1, ry / GR)
    ctx.globalAlpha = p * 0.72
    ctx.strokeStyle = C_PCB
    ctx.beginPath()
    ctx.arc(0, 0, GR, -Math.PI * p, Math.PI * p)
    ctx.stroke()
    ctx.restore()
  }

  // Meridians
  ctx.lineWidth = 1.5
  for (const [xOff, h] of [[0, GR], [-GR*0.52, GR*0.86], [GR*0.52, GR*0.86]]) {
    ctx.globalAlpha = p * 0.72
    ctx.strokeStyle = C_PCB
    ctx.beginPath()
    ctx.moveTo(GCX + xOff, GCY - h * p)
    ctx.lineTo(GCX + xOff, GCY + h * p)
    ctx.stroke()
  }

  // Cyan orbit ellipse
  ctx.globalAlpha = p
  ctx.strokeStyle = C_CYAN
  ctx.lineWidth = 3
  ctx.save()
  ctx.translate(GCX, GCY)
  ctx.rotate(-13 * Math.PI / 180)
  ctx.scale(1, 0.30)
  ctx.beginPath()
  ctx.arc(0, 0, GR * 1.18, -Math.PI * p, Math.PI * p)
  ctx.stroke()
  ctx.restore()

  // PCB legs
  const legY = GCY + GR + 6
  const LEGS = [
    [-22, 18, -38, 36],
    [ -9, 24, -22, 46],
    [  0, 30,   0, 30],
    [  9, 24,  22, 46],
    [ 22, 18,  38, 36],
  ]
  ctx.globalAlpha = p * 0.9
  ctx.strokeStyle = C_PCB
  ctx.lineWidth = 2.4
  ctx.lineCap = 'square'
  for (const [sx, sh, ex, eh] of LEGS) {
    ctx.beginPath()
    if (sx === ex) {
      ctx.moveTo(GCX + sx, legY)
      ctx.lineTo(GCX + ex, legY + eh * p)
    } else {
      const midY = legY + sh * p
      ctx.moveTo(GCX + sx, legY)
      ctx.lineTo(GCX + sx, midY)
      if (p > 0.5) {
        const hP = clamp((p - 0.5) / 0.5)
        ctx.lineTo(GCX + sx + (ex - sx) * hP, midY)
      }
    }
    ctx.stroke()
  }

  // Terminal pads
  if (p > 0.72) {
    const padP = eo3(clamp((p - 0.72) / 0.28))
    ctx.globalAlpha = padP
    ctx.strokeStyle = C_PCB
    ctx.lineWidth = 1.8
    const pads = [
      [GCX - 38, legY + 36], [GCX - 22, legY + 46], [GCX, legY + 30],
      [GCX + 22, legY + 46], [GCX + 38, legY + 36],
    ]
    for (const [px, py] of pads) {
      ctx.beginPath()
      ctx.roundRect(px - 6, py - 6, 12, 12, 2)
      ctx.stroke()
      ctx.fillStyle = C_PCB
      ctx.globalAlpha = padP * 0.4
      ctx.beginPath()
      ctx.roundRect(px - 2.5, py - 2.5, 5, 5, 1)
      ctx.fill()
      ctx.globalAlpha = padP
    }
  }
  ctx.restore()
}

// --- Wordmark ---
const WM_Y        = GCY + GR + 6 + 46 + 36   // 270 - 10 + 56 + 6 + 46 + 36 = 404
const WM_FS       = 62
const WM_CW       = WM_FS * 0.63
const WM_LETTERS  = ['E','x','E','S','S']
const WM_X0       = CX - (WM_LETTERS.length * WM_CW) / 2 + WM_CW / 2

function drawWordmark(ctx, progress) {
  ctx.save()
  ctx.font = 'bold ' + WM_FS + 'px "Space Grotesk", system-ui, sans-serif'
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'
  WM_LETTERS.forEach((ch, i) => {
    const lp = clamp(progress - i)
    if (lp <= 0) return
    ctx.globalAlpha = eo3(lp)
    ctx.fillStyle   = C_PCB
    ctx.fillText(ch, WM_X0 + i * WM_CW, WM_Y)
  })
  ctx.restore()
}

// =============================================================
// MAIN COMPONENT
// =============================================================
const IntroAnimation = ({ onComplete }) => {
  const containerRef = useRef(null)
  const canvasRef    = useRef(null)
  const rafRef       = useRef(null)
  const startRef     = useRef(null)
  const doneRef      = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    cancelAnimationFrame(rafRef.current)
    const el = containerRef.current
    if (el) {
      el.style.transition = 'opacity 0.45s cubic-bezier(0.4,0,0.2,1)'
      el.style.opacity    = '0'
      setTimeout(() => { if (onComplete) onComplete() }, 460)
    } else {
      if (onComplete) onComplete()
    }
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { finish(); return }

    const canvas    = canvasRef.current
    const container = containerRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    let W = container.clientWidth
    let H = container.clientHeight

    const resize = () => {
      W = container.clientWidth
      H = container.clientHeight
      canvas.width        = Math.round(W * dpr)
      canvas.height       = Math.round(H * dpr)
      canvas.style.width  = W + 'px'
      canvas.style.height = H + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    const TD   = TRACES.map(buildTrace)
    const getS  = () => Math.min(W, H) / 600 * 0.90
    const getOX = () => (W - 600 * getS()) / 2
    const getOY = () => (H - 600 * getS()) / 2

    const draw = (ts) => {
      if (!startRef.current) startRef.current = ts
      const t = (ts - startRef.current) / 1000

      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.translate(getOX(), getOY())
      ctx.scale(getS(), getS())

      // === STEP 1: PCB TRACES — drawn every frame, geometry is IMMUTABLE ===
      const pcbP = eio3(ph(t, 0, 1.10))
      TD.forEach(td => {
        ctx.save()
        ctx.strokeStyle  = C_PCB
        ctx.lineWidth    = 1.9
        ctx.lineCap      = 'square'
        ctx.globalAlpha  = 0.88
        strokeSeg(ctx, td, 0, pcbP)
        ctx.restore()
      })

      // === STEP 2: Outer endpoints activate 1.10–1.40 ===
      const outerActP  = eo3(ph(t, 1.10, 0.30))
      const outerFadeP = t > 2.7 ? clamp(1 - (t - 2.7) / 0.35) : 1
      if (outerActP > 0) {
        TD.forEach(td => {
          const [ox, oy] = td.outerPt
          ctx.fillStyle   = C_PCB
          ctx.globalAlpha = outerActP * 0.50
          ctx.beginPath(); ctx.arc(ox, oy, 4.5, 0, Math.PI*2); ctx.fill()
          if (outerFadeP > 0) {
            const a = outerActP * outerFadeP
            const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, 12)
            g.addColorStop(0, 'rgba(50,197,232,' + (0.92 * a) + ')')
            g.addColorStop(1, 'rgba(50,197,232,0)')
            ctx.fillStyle   = g; ctx.globalAlpha = a
            ctx.beginPath(); ctx.arc(ox, oy, 12, 0, Math.PI*2); ctx.fill()
            ctx.fillStyle   = C_CYAN; ctx.globalAlpha = a
            ctx.beginPath(); ctx.arc(ox, oy, 4.5, 0, Math.PI*2); ctx.fill()
          }
        })
      }

      // === STEP 3: Energy pulse travels outer to inner along 90° paths 1.40–2.30 ===
      const eFwdP = eio3(ph(t, 1.40, 0.90))
      if (eFwdP > 0 && eFwdP < 1.0001) {
        const DASH = 0.22
        TD.forEach(td => {
          const headT = eFwdP
          const tailT = Math.max(0, headT - DASH)
          const hPt   = posAt(td, headT)
          const tPt   = posAt(td, tailT)
          ctx.save()
          ctx.lineCap   = 'round'
          ctx.lineWidth = 3.2
          ctx.shadowColor = C_CYAN; ctx.shadowBlur = 10
          const g = ctx.createLinearGradient(tPt[0], tPt[1], hPt[0], hPt[1])
          g.addColorStop(0,    'rgba(50,197,232,0)')
          g.addColorStop(0.35, 'rgba(50,197,232,0.92)')
          g.addColorStop(1,    'rgba(255,255,255,1)')
          ctx.strokeStyle = g; ctx.globalAlpha = 1
          strokeSeg(ctx, td, tailT, headT)
          ctx.restore()
        })
      }

      // === STEP 4: Inner endpoints charge & pulse 2.30–2.55 ===
      const innerP     = eo3(ph(t, 2.30, 0.25))
      const innerFadeP = t > 3.00 ? clamp(1 - (t - 3.00) / 0.25) : 1
      if (innerP > 0) {
        const pulse = 1 + Math.sin(t * 20) * 0.18
        TD.forEach(td => {
          const [ix, iy] = td.innerPt
          ctx.fillStyle = C_PCB; ctx.globalAlpha = 0.45
          ctx.beginPath(); ctx.arc(ix, iy, 4, 0, Math.PI*2); ctx.fill()
          if (innerFadeP > 0) {
            const a = innerP * innerFadeP
            ctx.save()
            ctx.shadowColor = C_CYAN
            ctx.shadowBlur = 20 * a
            const g = ctx.createRadialGradient(ix, iy, 0, ix, iy, 20 * pulse * a)
            g.addColorStop(0, 'rgba(255,255,255,' + a + ')')
            g.addColorStop(0.35, 'rgba(50,197,232,' + (0.95 * a) + ')')
            g.addColorStop(1, 'rgba(50,197,232,0)')
            ctx.fillStyle = g; ctx.globalAlpha = a
            ctx.beginPath(); ctx.arc(ix, iy, 20 * pulse * a, 0, Math.PI*2); ctx.fill()
            ctx.fillStyle = C_WHITE; ctx.globalAlpha = a
            ctx.beginPath(); ctx.arc(ix, iy, 5, 0, Math.PI*2); ctx.fill()
            ctx.restore()
          }
        })
      }

      // === STEP 5: STRONG ENERGY CONVERGENCE 2.55–3.10 ===
      // Energy streams travel from ALL 8 inner endpoints toward ONE central point (CX, CY).
      // Streams fade out COMPLETELY by t=3.10 as central core forms.
      const convP    = ei2(ph(t, 2.55, 0.50))
      const convFade = t > 2.95 ? clamp(1 - (t - 2.95) / 0.15) : 1
      if (convP > 0 && convFade > 0) {
        TD.forEach(td => {
          const [ix, iy] = td.innerPt
          const dx = CX - ix
          const dy = CY - iy
          const headX = ix + dx * convP
          const headY = iy + dy * convP

          ctx.save()
          // 1. Glowing energy stream from innerPt to head position
          ctx.shadowColor = C_CYAN
          ctx.shadowBlur  = 18 * convP * convFade
          ctx.lineCap     = 'round'

          const streamGrad = ctx.createLinearGradient(ix, iy, headX, headY)
          streamGrad.addColorStop(0,    'rgba(50,197,232,0.30)')
          streamGrad.addColorStop(0.4,  'rgba(50,197,232,0.90)')
          streamGrad.addColorStop(0.85, 'rgba(168,235,248,0.98)')
          streamGrad.addColorStop(1,    'rgba(255,255,255,1.0)')

          ctx.strokeStyle = streamGrad
          ctx.lineWidth   = 2.4 + convP * 2.0
          ctx.globalAlpha = Math.min(1, convP * 2.2) * convFade
          ctx.beginPath()
          ctx.moveTo(ix, iy)
          ctx.lineTo(headX, headY)
          ctx.stroke()

          // 2. Travelling energy particles along convergence stream
          for (let pIdx = 0; pIdx < 3; pIdx++) {
            const pOffset = (pIdx * 0.26)
            const pProgress = clamp(convP * 1.35 - pOffset)
            if (pProgress > 0 && pProgress <= 1) {
              const px = ix + dx * pProgress
              const py = iy + dy * pProgress
              const pAlpha = (1 - pProgress * 0.25) * Math.min(1, convP * 2.2) * convFade

              ctx.shadowColor = C_CYAN
              ctx.shadowBlur  = 14
              ctx.fillStyle   = C_WHITE
              ctx.globalAlpha = pAlpha
              ctx.beginPath()
              ctx.arc(px, py, 3.5 * (1 - pProgress * 0.35), 0, Math.PI*2)
              ctx.fill()
            }
          }
          ctx.restore()
        })
      }

      // === STEP 6: POWERFUL CENTRAL ENERGY CORE 3.10–3.65 ===
      // Pure white-hot center, 16 radial starburst rays, intense cyan glow.
      // NO LOGO VISIBLE YET. NO DIAGONAL CONVERGENCE LINES REMAIN.
      const coreInP  = eo4(ph(t, 3.05, 0.45))
      const coreFade = t > 3.60 ? clamp(1 - (t - 3.60) / 0.35) : 1
      if (coreInP > 0 && coreFade > 0) {
        const a = coreInP * coreFade
        const pulseR = 1 + Math.sin(coreInP * Math.PI) * 0.40
        const r = 36 * coreInP * pulseR

        ctx.save()
        // 1. Radial Starburst Rays
        const numRays = 16
        const rotAngle = t * 0.9
        for (let i = 0; i < numRays; i++) {
          const angle = (i * Math.PI * 2) / numRays + rotAngle
          const rayLen = r * (2.0 + (i % 2 === 0 ? 1.0 : 0.4))
          const rx = CX + Math.cos(angle) * rayLen
          const ry = CY + Math.sin(angle) * rayLen

          const rayG = ctx.createLinearGradient(CX, CY, rx, ry)
          rayG.addColorStop(0,   'rgba(255,255,255,' + (0.95 * a) + ')')
          rayG.addColorStop(0.35,'rgba(50,197,232,' + (0.75 * a) + ')')
          rayG.addColorStop(1,   'rgba(50,197,232,0)')

          ctx.strokeStyle = rayG
          ctx.lineWidth   = (i % 2 === 0 ? 3.0 : 1.8) * a
          ctx.beginPath()
          ctx.moveTo(CX, CY)
          ctx.lineTo(rx, ry)
          ctx.stroke()
        }

        // 2. Wide Outer Bloom
        const gBloom = ctx.createRadialGradient(CX, CY, 0, CX, CY, r * 2.8)
        gBloom.addColorStop(0,   'rgba(50,197,232,' + (0.70 * a) + ')')
        gBloom.addColorStop(0.4, 'rgba(50,197,232,' + (0.32 * a) + ')')
        gBloom.addColorStop(1,   'rgba(50,197,232,0)')
        ctx.fillStyle = gBloom; ctx.globalAlpha = 1
        ctx.beginPath(); ctx.arc(CX, CY, r * 2.8, 0, Math.PI*2); ctx.fill()

        // 3. Intense White-Hot Core
        const gC = ctx.createRadialGradient(CX, CY, 0, CX, CY, r)
        gC.addColorStop(0,    'rgba(255,255,255,' + a + ')')
        gC.addColorStop(0.28, 'rgba(235,250,255,' + (0.98 * a) + ')')
        gC.addColorStop(0.60, 'rgba(50,197,232,' + (0.92 * a) + ')')
        gC.addColorStop(1,    'rgba(50,197,232,0)')
        ctx.fillStyle = gC; ctx.globalAlpha = 1
        ctx.shadowColor = C_CYAN; ctx.shadowBlur = 28 * a
        ctx.beginPath(); ctx.arc(CX, CY, r, 0, Math.PI*2); ctx.fill()

        // 4. Pure white center hot-spot
        ctx.fillStyle = C_WHITE; ctx.globalAlpha = a
        ctx.beginPath(); ctx.arc(CX, CY, Math.max(4, 9 * coreInP), 0, Math.PI*2); ctx.fill()
        ctx.restore()
      }

      // === STEP 7: CENTRAL CORE TRANSFORMS INTO EXESS EMBLEM 3.65–4.35 ===
      // Emblem is energy-forged outward from the central core
      const emblemP = eo3(ph(t, 3.65, 0.70))
      if (emblemP > 0) drawEmblem(ctx, emblemP)

      // === STEP 8: THE SAME ENERGY FORMS THE WORDMARK 4.35–4.90 ===
      const wmP = Math.max(0, (t - 4.35) / 0.11)
      if (wmP > 0) drawWordmark(ctx, wmP)

      // === STEP 9: ENERGY RETRACTS inner to outer along SAME 90° PCB paths 4.90–5.65 ===
      const retP = eio3(ph(t, 4.90, 0.75))
      if (retP > 0) {
        const DASH = 0.22
        TD.forEach(td => {
          const headT = 1 - retP
          const tailT = Math.min(1, headT + DASH)
          const hPt   = posAt(td, headT)
          const tPt   = posAt(td, tailT)
          ctx.save()
          ctx.lineCap   = 'round'
          ctx.lineWidth = 3.2
          ctx.shadowColor = C_CYAN; ctx.shadowBlur = 10
          const g = ctx.createLinearGradient(tPt[0], tPt[1], hPt[0], hPt[1])
          g.addColorStop(0,   'rgba(50,197,232,0)')
          g.addColorStop(0.6, 'rgba(50,197,232,0.85)')
          g.addColorStop(1,   'rgba(255,255,255,0.95)')
          ctx.strokeStyle = g; ctx.globalAlpha = 1
          strokeSeg(ctx, td, headT, tailT)
          ctx.restore()
        })
        // Re-illuminate outer endpoints as pulse arrives back
        if (retP > 0.75) {
          const ogP = eo3(clamp((retP - 0.75) / 0.25))
          TD.forEach(td => {
            const [ox, oy] = td.outerPt
            const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, 12)
            g.addColorStop(0, 'rgba(50,197,232,' + (0.80 * ogP) + ')')
            g.addColorStop(1, 'rgba(50,197,232,0)')
            ctx.fillStyle = g; ctx.globalAlpha = ogP
            ctx.beginPath(); ctx.arc(ox, oy, 12, 0, Math.PI*2); ctx.fill()
            ctx.fillStyle = C_CYAN; ctx.globalAlpha = ogP
            ctx.beginPath(); ctx.arc(ox, oy, 4.5, 0, Math.PI*2); ctx.fill()
          })
        }
      }

      // === STEP 10: Final stable state 5.65+ ===
      if (t >= 5.65) {
        const sP = eo3(clamp((t - 5.65) / 0.45))
        TD.forEach(td => {
          const [ox, oy] = td.outerPt
          ctx.fillStyle = C_PCB; ctx.globalAlpha = 0.40 * sP
          ctx.beginPath(); ctx.arc(ox, oy, 4.5, 0, Math.PI*2); ctx.fill()
          const [ix, iy] = td.innerPt
          ctx.fillStyle = C_PCB; ctx.globalAlpha = 0.28 * sP
          ctx.beginPath(); ctx.arc(ix, iy, 3.5, 0, Math.PI*2); ctx.fill()
        })
      }

      ctx.restore()

      if (t < 6.40 && !doneRef.current) {
        rafRef.current = requestAnimationFrame(draw)
      } else if (!doneRef.current) {
        requestAnimationFrame(finish)
      }
    }

    rafRef.current = requestAnimationFrame(draw)
    const safety   = setTimeout(finish, 8500)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(safety)
      window.removeEventListener('resize', resize)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      onClick={finish}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: '#FFFFFF', cursor: 'pointer',
        userSelect: 'none', overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
      />
      <div style={{
        position: 'absolute', bottom: '1.25rem', right: '1.75rem',
        fontSize: '10px', fontFamily: '"Space Grotesk", monospace',
        color: '#94a3b8', textTransform: 'uppercase',
        letterSpacing: '0.18em', pointerEvents: 'none', opacity: 0.55,
      }}>
        Click to skip →
      </div>
    </div>
  )
}

export default IntroAnimation
