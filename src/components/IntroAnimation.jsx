import { useEffect, useRef } from 'react'

/**
 * ExESS Intro Animation — 16-Trace Dense PCB Network (8 Left + 8 Right)
 *
 * TIGHTLY PACKED HIGH-DENSITY PCB GEOMETRY:
 * Exactly 8 traces Left + 8 traces Right with compressed vertical gaps for a dense, technical PCB cluster feel.
 * 16 Outer Circular Terminals -> 16 PCB Traces -> 16 Inner Nodes -> Central Energy Core -> ExESS Emblem & Wordmark -> Final Stable Logo
 * (NO REVERSE ENERGY FLOW)
 *
 * TIMELINE (seconds):
 *  0.00 – 1.00  Step 1: PCB traces draw in progressively
 *  1.00 – 1.35  Step 2: 16 Outer hollow circular endpoints activate with cyan glow
 *  1.35 – 2.25  Step 3: Energy pulses travel inward along exact 90° PCB paths
 *  2.25 – 2.50  Step 4: 16 Inner nodes charge & pulse as energy arrives
 *  2.50 – 3.05  Step 5: CENTRAL CONVERGENCE — 16 energy streams converge into one central point
 *  3.05 – 3.60  Step 6: INTENSE CENTRAL CORE — Concentrated white-hot energy core blooms
 *  3.60 – 4.30  Step 7: EMBLEM FORGED — Emblem & connector pins form from central core
 *  4.30 – 4.85  Step 8: WORDMARK FORGED — "ExESS" wordmark initializes
 *  4.85 – 5.60  Step 9: ENERGY SETTLES — Energy absorbs cleanly into logo (NO REVERSE)
 *  5.60 – 6.20  Step 10: FINAL STABLE LOGO — Clean ExESS logo + 16-trace PCB framing
 */

// EXACTLY 16 TRACES (8 Left, 8 Right) — TIGHT VERTICAL SPACING FOR HIGH DENSITY
// 600x600 coordinate space. Center = (300, 295)
// Protected Central Safe Zone: X (205 .. 395), Y (160 .. 445)
const TRACES = [
  // --- LEFT SIDE TRACES (8) — Dense Vertical Cluster ---
  // L1. Top Outer Trace
  { pts: [[40, 70], [165, 70], [165, 130], [195, 130]] },
  // L2. Upper Trace
  { pts: [[65, 102], [135, 102], [135, 155], [180, 155]] },
  // L3. Upper-Mid Trace
  { pts: [[25, 145], [115, 145], [115, 185], [170, 185]] },
  // L4. Mid-Upper Trace
  { pts: [[20, 205], [125, 205], [125, 225], [165, 225]] },
  // L5. Mid-Lower Trace
  { pts: [[20, 275], [115, 275], [115, 270], [165, 270]] },
  // L6. Lower-Mid Trace
  { pts: [[25, 345], [125, 345], [125, 325], [175, 325]] },
  // L7. Lower Trace
  { pts: [[35, 410], [140, 410], [140, 375], [185, 375]] },
  // L8. Bottom Outer Trace
  { pts: [[50, 485], [190, 485], [190, 435], [205, 435]] },

  // --- RIGHT SIDE TRACES (8) — Mirrored across CX=300 ---
  // R1. Top Outer Trace
  { pts: [[560, 70], [435, 70], [435, 130], [405, 130]] },
  // R2. Upper Trace
  { pts: [[535, 102], [465, 102], [465, 155], [420, 155]] },
  // R3. Upper-Mid Trace
  { pts: [[575, 145], [485, 145], [485, 185], [430, 185]] },
  // R4. Mid-Upper Trace
  { pts: [[580, 205], [475, 205], [475, 225], [435, 225]] },
  // R5. Mid-Lower Trace
  { pts: [[580, 275], [485, 275], [485, 270], [435, 270]] },
  // R6. Lower-Mid Trace
  { pts: [[575, 345], [475, 345], [475, 325], [425, 325]] },
  // R7. Lower Trace
  { pts: [[565, 410], [460, 410], [460, 375], [415, 375]] },
  // R8. Bottom Outer Trace
  { pts: [[550, 485], [410, 485], [410, 435], [395, 435]] },
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

// --- Hollow Circular Endpoint Node Renderer ---
function drawHollowCircleNode(ctx, x, y, r, alpha, isCyan = false, glowMultiplier = 1) {
  ctx.save()
  ctx.globalAlpha = alpha

  // Outer radial glow if active
  if (isCyan && glowMultiplier > 0) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.5 * glowMultiplier)
    g.addColorStop(0, 'rgba(50, 197, 232, ' + (0.85 * alpha) + ')')
    g.addColorStop(0.5, 'rgba(50, 197, 232, ' + (0.30 * alpha) + ')')
    g.addColorStop(1, 'rgba(50, 197, 232, 0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r * 2.5 * glowMultiplier, 0, Math.PI * 2)
    ctx.fill()
  }

  // Hollow circular ring
  ctx.strokeStyle = isCyan ? C_CYAN : C_PCB
  ctx.lineWidth = 1.6
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.stroke()

  // Inner solid center dot
  ctx.fillStyle = isCyan ? C_WHITE : C_PCB
  ctx.beginPath()
  ctx.arc(x, y, r * 0.35, 0, Math.PI * 2)
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

  // Outer circle
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

  // 5 Continuous Circuit Connectors
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

      // === STEP 1: 16 PCB TRACES & OUTER CIRCULAR NODES DRAW IN 0.00–1.00 ===
      const pcbP = eio3(ph(t, 0, 1.00))
      TD.forEach((td) => {
        ctx.save()
        ctx.strokeStyle  = C_PCB
        ctx.lineWidth    = 1.8
        ctx.lineCap      = 'square'
        ctx.globalAlpha  = 0.85
        strokeSeg(ctx, td, 0, pcbP)
        ctx.restore()

        // Draw Outer Hollow Circular Endpoints as trace draws
        if (pcbP > 0.05) {
          const [ox, oy] = td.outerPt
          drawHollowCircleNode(ctx, ox, oy, 4.8, pcbP * 0.85, false, 0)
        }
        // Draw Inner Nodes
        if (pcbP >= 0.90) {
          const [ix, iy] = td.innerPt
          drawHollowCircleNode(ctx, ix, iy, 4.0, pcbP * 0.70, false, 0)
        }
      })

      // === STEP 2: 16 Outer Circular Endpoints Wave Activation 1.00–1.35 ===
      const outerActP  = eo3(ph(t, 1.00, 0.35))
      const outerFadeP = t > 2.5 ? clamp(1 - (t - 2.5) / 0.35) : 1
      if (outerActP > 0) {
        TD.forEach((td, idx) => {
          const waveOffset = (idx % 4) * 0.04
          const actProgress = clamp((outerActP - waveOffset) / (1 - waveOffset))
          if (actProgress > 0) {
            const [ox, oy] = td.outerPt
            const pulseScale = 1 + Math.sin(actProgress * Math.PI) * 0.18
            drawHollowCircleNode(ctx, ox, oy, 5.2 * pulseScale, actProgress * outerFadeP, true, pulseScale)
          }
        })
      }

      // === STEP 3: Energy Pulses Travel Inward along 90° PCB Paths 1.35–2.25 ===
      const eFwdP = eio3(ph(t, 1.35, 0.90))
      if (eFwdP > 0 && eFwdP < 1.0001) {
        const DASH = 0.22
        TD.forEach((td, idx) => {
          const staggeredP = clamp((eFwdP - (idx % 4) * 0.035) / 0.86)
          if (staggeredP <= 0) return

          const headT = staggeredP
          const tailT = Math.max(0, headT - DASH)
          const hPt   = posAt(td, headT)
          const tPt   = posAt(td, tailT)

          ctx.save()
          ctx.lineCap   = 'round'
          ctx.lineWidth = 3.2
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

      // === STEP 4: 16 Inner Nodes Charge & Pulse 2.25–2.50 ===
      const innerP     = eo3(ph(t, 2.25, 0.25))
      const innerFadeP = t > 2.90 ? clamp(1 - (t - 2.90) / 0.20) : 1
      if (innerP > 0) {
        const pulse = 1 + Math.sin(t * 22) * 0.18
        TD.forEach((td) => {
          const [ix, iy] = td.innerPt
          if (innerFadeP > 0) {
            const a = innerP * innerFadeP
            drawHollowCircleNode(ctx, ix, iy, 4.5 * pulse, a, true, pulse * 1.2)
          }
        })
      }

      // === STEP 5: CENTRAL ENERGY CONVERGENCE (16 Streams Inward) 2.50–3.05 ===
      const convP    = ei2(ph(t, 2.50, 0.55))
      const convFade = t > 2.95 ? clamp(1 - (t - 2.95) / 0.15) : 1
      if (convP > 0 && convFade > 0) {
        TD.forEach((td) => {
          const [ix, iy] = td.innerPt
          const dx = CX - ix
          const dy = CY - iy
          const headX = ix + dx * convP
          const headY = iy + dy * convP

          ctx.save()
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
          ctx.restore()
        })
      }

      // === STEP 6: INTENSE CONCENTRATED CENTRAL ENERGY CORE 3.05–3.60 ===
      const coreInP  = eo4(ph(t, 3.05, 0.45))
      const coreFade = t > 3.55 ? clamp(1 - (t - 3.55) / 0.30) : 1
      if (coreInP > 0 && coreFade > 0) {
        const a = coreInP * coreFade
        const pulseR = 1 + Math.sin(coreInP * Math.PI) * 0.35
        const r = 36 * coreInP * pulseR

        ctx.save()
        // 1. Wide Outer Radial Bloom
        const gBloom = ctx.createRadialGradient(CX, CY, 0, CX, CY, r * 2.6)
        gBloom.addColorStop(0,   'rgba(50,197,232,' + (0.75 * a) + ')')
        gBloom.addColorStop(0.4, 'rgba(50,197,232,' + (0.35 * a) + ')')
        gBloom.addColorStop(1,   'rgba(50,197,232,0)')
        ctx.fillStyle = gBloom; ctx.globalAlpha = 1
        ctx.beginPath(); ctx.arc(CX, CY, r * 2.6, 0, Math.PI*2); ctx.fill()

        // 2. Concentrated White-Hot Core
        const gC = ctx.createRadialGradient(CX, CY, 0, CX, CY, r)
        gC.addColorStop(0,    'rgba(255,255,255,' + a + ')')
        gC.addColorStop(0.28, 'rgba(235,250,255,' + (0.98 * a) + ')')
        gC.addColorStop(0.60, 'rgba(50,197,232,' + (0.92 * a) + ')')
        gC.addColorStop(1,    'rgba(50,197,232,0)')
        ctx.fillStyle = gC; ctx.globalAlpha = 1
        ctx.shadowColor = C_CYAN; ctx.shadowBlur = 30 * a
        ctx.beginPath(); ctx.arc(CX, CY, r, 0, Math.PI*2); ctx.fill()

        // 3. Center White Hot-Spot
        ctx.fillStyle = C_WHITE; ctx.globalAlpha = a
        ctx.beginPath(); ctx.arc(CX, CY, Math.max(4, 9 * coreInP), 0, Math.PI*2); ctx.fill()
        ctx.restore()
      }

      // === STEP 7: EMBLEM FORGED FROM CENTRAL CORE 3.60–4.30 ===
      const emblemP = eo3(ph(t, 3.60, 0.70))
      if (emblemP > 0) drawEmblem(ctx, emblemP)

      // === STEP 8: WORDMARK FORGED 4.30–4.85 ===
      const wmP = Math.max(0, (t - 4.30) / 0.11)
      if (wmP > 0) drawWordmark(ctx, wmP)

      // === STEP 9: ENERGY SETTLES INTO FINAL LOGO (NO REVERSE OUTWARD PULSE) 4.85–5.60 ===

      // === STEP 10: Final Stable State 5.60+ ===
      if (t >= 4.85) {
        const sP = eo3(clamp((t - 4.85) / 0.50))
        TD.forEach((td) => {
          const [ox, oy] = td.outerPt
          drawHollowCircleNode(ctx, ox, oy, 4.5, sP * 0.70, false, 0)
          const [ix, iy] = td.innerPt
          drawHollowCircleNode(ctx, ix, iy, 3.8, sP * 0.50, false, 0)
        })
      }

      ctx.restore()

      if (t < 6.20 && !doneRef.current) {
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
