import { useEffect, useRef } from 'react'

/**
 * ExESS Intro Animation — High-Complexity Futuristic PCB Network
 *
 * ONE immutable, highly detailed symmetrical 20-trace PCB geometry framing the logo.
 * Outer circular electronic terminals -> Energy pulses -> Inner node activation ->
 * Strong central energy convergence -> Powerful core bloom -> Logo formation -> Retraction -> Final stable state.
 *
 * TIMELINE (seconds):
 *  0.00 – 1.10  Step 1: PCB traces draw in (progressive path drawing)
 *  1.10 – 1.40  Step 2: Outer circular terminal nodes activate (wave of cyan glow & 1.15x pulse)
 *  1.40 – 2.30  Step 3: Energy pulses travel along exact 90° PCB paths from outer to inner terminals
 *  2.30 – 2.55  Step 4: Inner terminal nodes charge & pulse intensely
 *  2.55 – 3.10  Step 5: STRONG CONVERGENCE — 20 energy streams converge to center (300, 295)
 *  3.10 – 3.65  Step 6: POWERFUL CENTRAL CORE — White-hot core + 16-ray starburst bloom
 *  3.65 – 4.35  Step 7: EMBLEM FORGED — Emblem forms from central core energy
 *  4.35 – 4.90  Step 8: WORDMARK FORGED — "ExESS" wordmark initialized
 *  4.90 – 5.65  Step 9: ENERGY RETRACTS — Energy pulls back inner to outer along PCB paths
 *  5.65 – 6.40  Step 10: FINAL STABLE LOGO — Clean ExESS logo + complex PCB framing
 */

// HIGH-COMPLEXITY PCB GEOMETRY (20 Symmetrical Traces: 10 Left, 10 Right)
// 600x600 coordinate space. Center = (300, 295)
// Protected Central Safe Zone: X (215 .. 385), Y (170 .. 455)
const TRACES = [
  // --- LEFT SIDE TRACES (10) ---
  // 1. Top-Left Far Corner (TL1)
  { pts: [[40, 36], [160, 36], [160, 110], [195, 110]] },
  // 2. Top-Left Inner Branch (TL2)
  { pts: [[70, 72], [130, 72], [130, 140], [180, 140]] },
  // 3. Upper-Left Stepped (UL1)
  { pts: [[24, 150], [110, 150], [110, 180], [170, 180]] },
  // 4. Mid-Left Upper Outer (ML1)
  { pts: [[20, 210], [125, 210], [125, 225], [175, 225]] },
  // 5. Mid-Left Main (ML2)
  { pts: [[20, 260], [110, 260], [110, 270], [165, 270]] },
  // 6. Mid-Left Lower (ML3)
  { pts: [[20, 310], [110, 310], [110, 305], [165, 305]] },
  // 7. Lower-Left Stepped (LL1)
  { pts: [[24, 360], [125, 360], [125, 345], [175, 345]] },
  // 8. Lower-Left Branch (LL2)
  { pts: [[30, 420], [135, 420], [135, 400], [185, 400]] },
  // 9. Bottom-Left Stepped (BL1)
  { pts: [[40, 480], [150, 480], [150, 460], [190, 460]] },
  // 10. Bottom-Left Far Corner (BL2)
  { pts: [[50, 550], [195, 550], [195, 485], [210, 485]] },

  // --- RIGHT SIDE TRACES (10 - Mirrored across CX=300) ---
  // 11. Top-Right Far Corner (TR1)
  { pts: [[560, 36], [440, 36], [440, 110], [405, 110]] },
  // 12. Top-Right Inner Branch (TR2)
  { pts: [[530, 72], [470, 72], [470, 140], [420, 140]] },
  // 13. Upper-Right Stepped (UR1)
  { pts: [[576, 150], [490, 150], [490, 180], [430, 180]] },
  // 14. Mid-Right Upper Outer (MR1)
  { pts: [[580, 210], [475, 210], [475, 225], [425, 225]] },
  // 15. Mid-Right Main (MR2)
  { pts: [[580, 260], [490, 260], [490, 270], [435, 270]] },
  // 16. Mid-Right Lower (MR3)
  { pts: [[580, 310], [490, 310], [490, 305], [435, 305]] },
  // 17. Lower-Right Stepped (LR1)
  { pts: [[576, 360], [475, 360], [475, 345], [425, 345]] },
  // 18. Lower-Right Branch (LR2)
  { pts: [[570, 420], [465, 420], [465, 400], [415, 400]] },
  // 19. Bottom-Right Stepped (BR1)
  { pts: [[560, 480], [450, 480], [450, 460], [410, 460]] },
  // 20. Bottom-Right Far Corner (BR2)
  { pts: [[550, 550], [405, 550], [405, 485], [390, 485]] },
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

// --- Circular Electronic Terminal Node Renderer ---
function drawTerminalNode(ctx, x, y, r, alpha, isCyan = false, glowMultiplier = 1) {
  ctx.save()
  ctx.globalAlpha = alpha

  // 1. Outer cyan glow ring if active
  if (isCyan && glowMultiplier > 0) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.8 * glowMultiplier)
    g.addColorStop(0, 'rgba(50, 197, 232, ' + (0.90 * alpha) + ')')
    g.addColorStop(0.5, 'rgba(50, 197, 232, ' + (0.35 * alpha) + ')')
    g.addColorStop(1, 'rgba(50, 197, 232, 0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r * 2.8 * glowMultiplier, 0, Math.PI * 2)
    ctx.fill()
  }

  // 2. Main circular electronic terminal ring (flush connected to trace)
  ctx.strokeStyle = isCyan ? C_CYAN : C_PCB
  ctx.lineWidth = 1.8
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.stroke()

  // 3. Inner solid terminal center core
  ctx.fillStyle = isCyan ? C_WHITE : C_PCB
  ctx.beginPath()
  ctx.arc(x, y, r * 0.42, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

// --- Emblem Renderer ---
const GCX = CX, GCY = CY - 35, GR = 56
const globeBottomY = GCY + GR // 316

function drawEmblem(ctx, p) {
  ctx.save()
  ctx.globalAlpha = p
  ctx.lineCap = 'round'

  // Outer circle (sweeps outward)
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

  // Top Circuit Squares
  if (p > 0.6) {
    const topP = clamp((p - 0.6) / 0.4)
    ctx.fillStyle = C_PCB
    ctx.globalAlpha = topP
    ctx.beginPath(); ctx.roundRect(GCX - 8, GCY - GR - 14, 8, 8, 1.5); ctx.fill()
    ctx.beginPath(); ctx.roundRect(GCX + 8, GCY - GR - 18, 10, 10, 1.5); ctx.fill()
    ctx.fillStyle = C_CYAN
    ctx.beginPath(); ctx.roundRect(GCX + 24, GCY - GR - 12, 6, 6, 1); ctx.fill()
  }

  // 5 Continuous Circuit Connectors starting at globe bottom edge (316)
  const CONNECTORS = [
    [[272, 316], [272, 335], [250, 335], [250, 357]],
    [[286.5, 316], [286.5, 346], [272, 346], [272, 369]],
    [[300, 316], [300, 352]],
    [[313.5, 316], [313.5, 346], [328, 346], [328, 369]],
    [[328, 316], [328, 335], [350, 335], [350, 357]],
  ]

  ctx.globalAlpha = p * 0.95
  ctx.strokeStyle = C_PCB
  ctx.lineWidth = 2.5
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  for (const pts of CONNECTORS) {
    ctx.beginPath()
    ctx.moveTo(pts[0][0], pts[0][1])
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i][0], pts[i][1])
    }
    ctx.stroke()
  }

  // 5 Square Connector Nodes
  if (p > 0.65) {
    const padP = eo3(clamp((p - 0.65) / 0.35))
    ctx.globalAlpha = padP
    ctx.strokeStyle = C_PCB
    ctx.lineWidth = 2.0

    const NODES = [
      { x: 243, y: 357, w: 14, h: 14 },
      { x: 265, y: 369, w: 14, h: 14 },
      { x: 292, y: 352, w: 16, h: 16 },
      { x: 321, y: 369, w: 14, h: 14 },
      { x: 343, y: 357, w: 14, h: 14 },
    ]

    for (const node of NODES) {
      ctx.beginPath()
      ctx.roundRect(node.x, node.y, node.w, node.h, 2.5)
      ctx.stroke()

      ctx.fillStyle = C_PCB
      ctx.globalAlpha = padP * 0.6
      ctx.beginPath()
      ctx.roundRect(node.x + node.w / 2 - 2, node.y + node.h / 2 - 2, 4, 4, 1)
      ctx.fill()
      ctx.globalAlpha = padP
    }
  }

  ctx.restore()
}

// --- Wordmark Renderer ---
const WM_Y        = 422
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

      // === STEP 1: PCB TRACES & TERMINALS DRAW IN 0.00–1.10 ===
      const pcbP = eio3(ph(t, 0, 1.10))
      TD.forEach((td, idx) => {
        ctx.save()
        ctx.strokeStyle  = C_PCB
        ctx.lineWidth    = 1.8
        ctx.lineCap      = 'square'
        ctx.globalAlpha  = 0.88
        strokeSeg(ctx, td, 0, pcbP)
        ctx.restore()

        // Terminal Nodes (Outer & Inner) drawn as trace progresses
        if (pcbP > 0.05) {
          const [ox, oy] = td.outerPt
          drawTerminalNode(ctx, ox, oy, 5.0, pcbP * 0.85, false, 0)
        }
        if (pcbP >= 0.95) {
          const [ix, iy] = td.innerPt
          drawTerminalNode(ctx, ix, iy, 4.0, pcbP * 0.75, false, 0)
        }
      })

      // === STEP 2: Outer Circular Terminals Wave Activation 1.10–1.40 ===
      const outerActP  = eo3(ph(t, 1.10, 0.30))
      const outerFadeP = t > 2.7 ? clamp(1 - (t - 2.7) / 0.35) : 1
      if (outerActP > 0) {
        TD.forEach((td, idx) => {
          const waveOffset = (idx % 5) * 0.04
          const actProgress = clamp((outerActP - waveOffset) / (1 - waveOffset))
          if (actProgress > 0) {
            const [ox, oy] = td.outerPt
            const pulseScale = 1 + Math.sin(actProgress * Math.PI) * 0.20
            drawTerminalNode(ctx, ox, oy, 5.5 * pulseScale, actProgress * outerFadeP, true, pulseScale)
          }
        })
      }

      // === STEP 3: Energy Pulses Travel Outer -> Inner along 90° PCB Paths 1.40–2.30 ===
      const eFwdP = eio3(ph(t, 1.40, 0.90))
      if (eFwdP > 0 && eFwdP < 1.0001) {
        const DASH = 0.20
        TD.forEach((td, idx) => {
          const staggeredP = clamp((eFwdP - (idx % 4) * 0.03) / 0.88)
          if (staggeredP <= 0) return

          const headT = staggeredP
          const tailT = Math.max(0, headT - DASH)
          const hPt   = posAt(td, headT)
          const tPt   = posAt(td, tailT)

          ctx.save()
          ctx.lineCap   = 'round'
          ctx.lineWidth = 3.0
          ctx.shadowColor = C_CYAN
          ctx.shadowBlur = 12

          const g = ctx.createLinearGradient(tPt[0], tPt[1], hPt[0], hPt[1])
          g.addColorStop(0,    'rgba(50,197,232,0)')
          g.addColorStop(0.35, 'rgba(50,197,232,0.92)')
          g.addColorStop(1,    'rgba(255,255,255,1)')
          ctx.strokeStyle = g
          ctx.globalAlpha = 1
          strokeSeg(ctx, td, tailT, headT)
          ctx.restore()
        })
      }

      // === STEP 4: Inner Terminals Charge & Pulse 2.30–2.55 ===
      const innerP     = eo3(ph(t, 2.30, 0.25))
      const innerFadeP = t > 3.00 ? clamp(1 - (t - 3.00) / 0.25) : 1
      if (innerP > 0) {
        const pulse = 1 + Math.sin(t * 22) * 0.18
        TD.forEach((td) => {
          const [ix, iy] = td.innerPt
          if (innerFadeP > 0) {
            const a = innerP * innerFadeP
            drawTerminalNode(ctx, ix, iy, 4.5 * pulse, a, true, pulse * 1.2)
          }
        })
      }

      // === STEP 5: STRONG ENERGY CONVERGENCE (20 Streams) 2.55–3.10 ===
      const convP    = ei2(ph(t, 2.55, 0.50))
      const convFade = t > 2.95 ? clamp(1 - (t - 2.95) / 0.15) : 1
      if (convP > 0 && convFade > 0) {
        TD.forEach((td) => {
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

          // 2. Travelling energy particles along stream
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
      const coreInP  = eo4(ph(t, 3.05, 0.45))
      const coreFade = t > 3.60 ? clamp(1 - (t - 3.60) / 0.35) : 1
      if (coreInP > 0 && coreFade > 0) {
        const a = coreInP * coreFade
        const pulseR = 1 + Math.sin(coreInP * Math.PI) * 0.40
        const r = 38 * coreInP * pulseR

        ctx.save()
        // 1. Radial Starburst Rays (16 Rays)
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

        // 2. Wide Outer Radial Bloom
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
        ctx.shadowColor = C_CYAN; ctx.shadowBlur = 32 * a
        ctx.beginPath(); ctx.arc(CX, CY, r, 0, Math.PI*2); ctx.fill()

        // 4. Pure white center hot-spot
        ctx.fillStyle = C_WHITE; ctx.globalAlpha = a
        ctx.beginPath(); ctx.arc(CX, CY, Math.max(4, 9 * coreInP), 0, Math.PI*2); ctx.fill()
        ctx.restore()
      }

      // === STEP 7: EMBLEM FORGED FROM CENTRAL CORE 3.65–4.35 ===
      const emblemP = eo3(ph(t, 3.65, 0.70))
      if (emblemP > 0) drawEmblem(ctx, emblemP)

      // === STEP 8: WORDMARK FORGED 4.35–4.90 ===
      const wmP = Math.max(0, (t - 4.35) / 0.11)
      if (wmP > 0) drawWordmark(ctx, wmP)

      // === STEP 9: ENERGY RETRACTS Inner -> Outer along 90° PCB Paths 4.90–5.65 ===
      const retP = eio3(ph(t, 4.90, 0.75))
      if (retP > 0) {
        const DASH = 0.20
        TD.forEach(td => {
          const headT = 1 - retP
          const tailT = Math.min(1, headT + DASH)
          const hPt   = posAt(td, headT)
          const tPt   = posAt(td, tailT)
          ctx.save()
          ctx.lineCap   = 'round'
          ctx.lineWidth = 3.0
          ctx.shadowColor = C_CYAN; ctx.shadowBlur = 10
          const g = ctx.createLinearGradient(tPt[0], tPt[1], hPt[0], hPt[1])
          g.addColorStop(0,   'rgba(50,197,232,0)')
          g.addColorStop(0.6, 'rgba(50,197,232,0.85)')
          g.addColorStop(1,   'rgba(255,255,255,0.95)')
          ctx.strokeStyle = g; ctx.globalAlpha = 1
          strokeSeg(ctx, td, headT, tailT)
          ctx.restore()
        })
        // Re-illuminate outer circular nodes as retraction pulse completes
        if (retP > 0.75) {
          const ogP = eo3(clamp((retP - 0.75) / 0.25))
          TD.forEach(td => {
            const [ox, oy] = td.outerPt
            drawTerminalNode(ctx, ox, oy, 5.0, ogP, true, ogP)
          })
        }
      }

      // === STEP 10: Final Stable State 5.65+ ===
      if (t >= 5.65) {
        const sP = eo3(clamp((t - 5.65) / 0.45))
        TD.forEach(td => {
          const [ox, oy] = td.outerPt
          drawTerminalNode(ctx, ox, oy, 4.5, sP * 0.75, false, 0)
          const [ix, iy] = td.innerPt
          drawTerminalNode(ctx, ix, iy, 3.8, sP * 0.60, false, 0)
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
