import { useEffect, useRef } from 'react'
import EnergyBus from '../lib/EnergyBus'

/**
 * GlobalCircuitNetwork — Upgraded Canvas 2D PCB Energy System
 *
 * Renderer: Canvas 2D (existing — extended, NOT migrated to WebGL)
 *
 * Energy lifecycle per section entry:
 *   IDLE         → normal scroll-driven signal pulses, subtle background traces
 *   CONVERGE     → traces near center-X brighten progressively; particles bias
 *                  toward section's Y coordinate, accelerating visibly
 *   BLOOM        → peak radial burst at section top edge: core white → cyan rings
 *                  → radial sparks → horizontal PCB cross-lines; triggers at
 *                  ~250ms before section content animation
 *   SETTLE       → bloom decays over ~1s; traces calm; energy continues downward
 *   IDLE         → ready for next section
 *
 * Performance:
 *   - DPR capped at 2 (desktop) or 1.5 (mobile)
 *   - Mobile: reduced trace count, smaller bloom radius
 *   - prefers-reduced-motion: static traces, no pulses/bloom
 *   - Viewport clipping on all drawing operations
 *   - No Three.js — pure Canvas 2D, same renderer extended
 */
const GlobalCircuitNetwork = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d', { alpha: true })
    let animationFrameId

    const isMobile = () => window.innerWidth < 768

    let width = window.innerWidth
    let height = window.innerHeight
    let docHeight = Math.max(document.documentElement.scrollHeight || 6000, 6000)
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile() ? 1.5 : 2)

    // --- Scroll tracking ---
    let targetScrollY = window.scrollY
    let lerpedScrollY = window.scrollY
    let lastRawScrollY = window.scrollY
    let velocityGlow = 0 // subtle brightness from scroll speed

    // --- Multi-phase energy system ---
    let surgePhase = 'idle'   // 'idle' | 'converge' | 'bloom' | 'settle'
    let approachIntensity = 0  // 0 → 0.7, builds during converge (~1.2s)
    let surgeIntensity = 0     // 0 → 1.0, held during bloom, decays in settle
    let bloomProgress = 0      // 0 → 1 during bloom, 1 → 0 during settle
    let convergenceDocY = 0    // document-space Y of activating section's top

    // --- EnergyBus subscribers ---
    const onApproach = ({ targetY }) => {
      convergenceDocY = targetY
      // Only start converge if idle or fully settled
      if (surgePhase === 'idle' || (surgePhase === 'settle' && approachIntensity < 0.2)) {
        surgePhase = 'converge'
        // Seed approach so traces start brightening immediately
        approachIntensity = Math.max(approachIntensity, 0.08)
      }
    }

    const onActivate = ({ targetY }) => {
      convergenceDocY = targetY
      surgePhase = 'bloom'
      surgeIntensity = 1.0
      bloomProgress = 0
    }

    EnergyBus.on('section:approach', onApproach)
    EnergyBus.on('section:activate', onActivate)

    // --- Resize ---
    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      docHeight = Math.max(document.documentElement.scrollHeight || 6000, 6000)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.scale(dpr, dpr)
    }

    resize()

    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resize, 150)
    }
    const handleScroll = () => { targetScrollY = window.scrollY }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    const resizeObserver = new ResizeObserver(() => handleResize())
    resizeObserver.observe(document.body)

    // --- Seed PCB trace paths ---
    const mobile = isMobile()
    const numTraces = Math.min(mobile ? 14 : 20, Math.max(mobile ? 8 : 12, Math.floor(width / 85)))
    const paths = []

    for (let i = 0; i < numTraces; i++) {
      const startX = (width / numTraces) * i + (i % 2 === 0 ? 20 : 50)
      const segments = []
      const viaNodes = []
      let currentX = startX
      let currentY = 0
      let totalX = 0
      let segCount = 0

      while (currentY < docHeight) {
        const segLen = 140 + Math.random() * 220
        const angleType = Math.floor(Math.random() * 4)

        let nextX = currentX
        let nextY = currentY + segLen

        if (angleType === 1) nextX = Math.min(width - 30, currentX + segLen * 0.45)
        if (angleType === 2) nextX = Math.max(30, currentX - segLen * 0.45)

        // Keep traces out of hero heading zone
        if (currentY < 480 && nextY > 140 && nextX > 220 && nextX < (width - 220)) {
          if (nextX < width / 2) {
            nextX = Math.max(30, Math.min(180, currentX - 120))
          } else {
            nextX = Math.min(width - 30, Math.max(width - 180, currentX + 120))
          }
        }

        segments.push({ x1: currentX, y1: currentY, x2: nextX, y2: nextY })
        totalX += (currentX + nextX) / 2
        segCount++

        if (Math.random() > 0.4) {
          viaNodes.push({ x: nextX, y: nextY, r: 2.5 + Math.random() * 1.5 })
        }

        currentX = nextX
        currentY = nextY
      }

      const avgX = segCount > 0 ? totalX / segCount : startX
      const totalLength = segments.reduce(
        (sum, s) => sum + Math.hypot(s.x2 - s.x1, s.y2 - s.y1), 0
      )

      paths.push({
        segments,
        viaNodes,
        totalLength,
        avgX,
        traceWidth: 1.2 + Math.random() * 0.6,
        baseAlpha: 0.08 + Math.random() * 0.05,
        offsetMultiplier: 0.8 + (i % 5) * 0.2,
      })
    }

    // --- Helpers ---
    /** Distance along path to a given document-space Y coordinate */
    const getDistToDocY = (path, docY) => {
      let accumulated = 0
      for (const seg of path.segments) {
        const segLen = Math.hypot(seg.x2 - seg.x1, seg.y2 - seg.y1)
        if (seg.y2 >= docY) {
          const t = Math.max(0, Math.min(1, (docY - seg.y1) / Math.max(1, seg.y2 - seg.y1)))
          return accumulated + segLen * t
        }
        accumulated += segLen
      }
      return accumulated
    }

    // --- Main render loop ---
    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      // Velocity measurement — drives subtle idle brightness
      const rawDelta = targetScrollY - lastRawScrollY
      lastRawScrollY = targetScrollY
      const targetVelocityGlow = Math.min(0.1, Math.abs(rawDelta) * 0.0025)
      velocityGlow += (targetVelocityGlow - velocityGlow) * 0.14

      // Lerped scroll
      lerpedScrollY += (targetScrollY - lerpedScrollY) * 0.12

      if (!reducedMotion) {
        // --- Phase state machine ---
        switch (surgePhase) {
          case 'converge':
            approachIntensity = Math.min(0.7, approachIntensity + 0.01)
            break

          case 'bloom':
            bloomProgress = Math.min(1, bloomProgress + 0.045)
            if (bloomProgress >= 1) surgePhase = 'settle'
            break

          case 'settle':
            surgeIntensity = Math.max(0, surgeIntensity - 0.013)
            approachIntensity = Math.max(0, approachIntensity - 0.011)
            bloomProgress = Math.max(0, bloomProgress - 0.018)
            if (surgeIntensity <= 0 && approachIntensity <= 0) {
              surgePhase = 'idle'
              bloomProgress = 0
            }
            break

          default: break
        }
      }

      const convergenceScreenY = convergenceDocY - lerpedScrollY
      const isEnergyActive = surgePhase !== 'idle'

      ctx.clearRect(0, 0, width, height)

      // ─── 1. Engineering Blueprint Grid ─────────────────────────────────
      const gridAlpha = 0.025 + velocityGlow * 0.035 + approachIntensity * 0.018
      ctx.strokeStyle = `rgba(30, 107, 147, ${gridAlpha})`
      ctx.lineWidth = 0.8
      const gridStep = 70
      const gridOffY = -(lerpedScrollY % gridStep)

      ctx.beginPath()
      for (let x = 0; x < width; x += gridStep) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height)
      }
      for (let y = gridOffY; y < height; y += gridStep) {
        if (y >= 0) { ctx.moveTo(0, y); ctx.lineTo(width, y) }
      }
      ctx.stroke()

      // ─── 2. Copper Traces + Via Nodes + Signal Particles ───────────────
      paths.forEach((p, pathIdx) => {
        // Proximity to page center-X — closer traces get more energy
        const proxFactor = isEnergyActive
          ? Math.max(0, 1 - Math.abs(p.avgX - width / 2) / (width * 0.46))
          : 0

        const convergeBoost = proxFactor * approachIntensity * 0.5
        const surgeBoost = proxFactor * surgeIntensity * 0.65
        const activeAlpha = Math.min(0.85, p.baseAlpha + convergeBoost + surgeBoost + velocityGlow * 0.07)

        // ── Trace stroke
        ctx.strokeStyle = `rgba(30, 107, 147, ${activeAlpha})`
        ctx.lineWidth = p.traceWidth + convergeBoost * 1.4 + surgeBoost * 1.8
        ctx.lineCap = 'square'
        ctx.beginPath()
        p.segments.forEach((seg) => {
          const sy1 = seg.y1 - lerpedScrollY
          const sy2 = seg.y2 - lerpedScrollY
          if (sy2 >= -60 && sy1 <= height + 60) {
            ctx.moveTo(seg.x1, sy1)
            ctx.lineTo(seg.x2, sy2)
          }
        })
        ctx.stroke()

        // ── Via nodes
        p.viaNodes.forEach((node) => {
          const ny = node.y - lerpedScrollY
          if (ny < -20 || ny > height + 20) return
          const viaAlpha = Math.min(0.9, activeAlpha * 2.6)
          const isHighSurge = surgePhase === 'bloom' && proxFactor > 0.45
          ctx.fillStyle = isHighSurge ? '#32C5E8' : `rgba(30, 107, 147, ${viaAlpha})`
          ctx.beginPath()
          ctx.arc(node.x, ny, node.r + surgeBoost * 2.8, 0, Math.PI * 2)
          ctx.fill()

          // Glow ring on active via nodes during bloom
          if (isHighSurge && surgeIntensity > 0.6) {
            ctx.strokeStyle = `rgba(50, 197, 232, ${surgeIntensity * 0.45})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.arc(node.x, ny, node.r + surgeBoost * 2.8 + 5, 0, Math.PI * 2)
            ctx.stroke()
          }
        })

        if (reducedMotion) return

        // ── Signal particle (scroll-driven, biased toward convergenceDocY during converge)
        const scrollDistance = lerpedScrollY * p.offsetMultiplier + pathIdx * 140
        let currentDist = Math.abs(scrollDistance) % p.totalLength

        // During converge/bloom: bias particles toward the section's Y
        if (isEnergyActive && approachIntensity > 0.15) {
          const convergeDist = getDistToDocY(p, convergenceDocY)
          const lerpStrength = proxFactor * approachIntensity * 0.38
          currentDist = currentDist + (convergeDist - currentDist) * lerpStrength
        }

        let accumulated = 0
        for (const seg of p.segments) {
          const segLen = Math.hypot(seg.x2 - seg.x1, seg.y2 - seg.y1)
          if (accumulated + segLen >= currentDist) {
            const ratio = (currentDist - accumulated) / segLen
            const px = seg.x1 + (seg.x2 - seg.x1) * ratio
            const py = seg.y1 + (seg.y2 - seg.y1) * ratio
            const screenPy = py - lerpedScrollY

            if (screenPy < -30 || screenPy > height + 30) break

            // Trailing gradient
            const trailLen = 0.16 + convergeBoost * 0.18 + surgeBoost * 0.22
            const startRatio = Math.max(0, ratio - trailLen)
            const tailX = seg.x1 + (seg.x2 - seg.x1) * startRatio
            const tailY = (seg.y1 + (seg.y2 - seg.y1) * startRatio) - lerpedScrollY
            const particleAlpha = Math.min(0.95, 0.52 + convergeBoost * 0.28 + surgeBoost * 0.35)

            const trailGrad = ctx.createLinearGradient(tailX, tailY, px, screenPy)
            trailGrad.addColorStop(0, 'rgba(50, 197, 232, 0)')
            trailGrad.addColorStop(1, `rgba(50, 197, 232, ${particleAlpha})`)
            ctx.strokeStyle = trailGrad
            ctx.lineWidth = p.traceWidth * 1.9 + convergeBoost * 1.8 + surgeBoost * 2.4
            ctx.beginPath()
            ctx.moveTo(tailX, tailY)
            ctx.lineTo(px, screenPy)
            ctx.stroke()

            // Radial glow around particle head
            const glowR = (mobile ? 10 : 14) + convergeBoost * 12 + surgeBoost * (mobile ? 12 : 20)
            const isWhiteCore = surgeIntensity > 0.5 && proxFactor > 0.38
            const glowGrad = ctx.createRadialGradient(px, screenPy, 0, px, screenPy, glowR)
            glowGrad.addColorStop(0, isWhiteCore ? 'rgba(255,255,255,0.95)' : 'rgba(50,197,232,0.90)')
            glowGrad.addColorStop(0.35, 'rgba(50, 197, 232, 0.42)')
            glowGrad.addColorStop(1, 'rgba(50, 197, 232, 0)')
            ctx.fillStyle = glowGrad
            ctx.beginPath()
            ctx.arc(px, screenPy, glowR, 0, Math.PI * 2)
            ctx.fill()

            // Core dot
            ctx.fillStyle = isWhiteCore ? '#FFFFFF' : '#32C5E8'
            ctx.beginPath()
            ctx.arc(px, screenPy, 2.2 + convergeBoost + surgeBoost * 2.2, 0, Math.PI * 2)
            ctx.fill()
            break
          }
          accumulated += segLen
        }
      })

      // ─── 3. Convergence Bloom (bloom + early settle phases) ─────────────
      if (
        !reducedMotion &&
        bloomProgress > 0 &&
        convergenceScreenY > -280 &&
        convergenceScreenY < height + 280
      ) {
        const cx = width / 2
        const cy = convergenceScreenY

        // bloomProgress: 0→1 during bloom phase, 1→0 during settle
        // Use it directly for alpha — gives natural bell curve
        const bAlpha = surgePhase === 'bloom'
          ? Math.min(1, bloomProgress * 2.4)  // quick ramp up
          : bloomProgress                       // linear decay

        if (bAlpha > 0.01) {
          const expandT = surgePhase === 'bloom' ? Math.min(1, bloomProgress * 2.8) : 1

          // Inner white/cyan core
          const innerR = 5 + expandT * (mobile ? 38 : 58)
          const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, innerR)
          coreGrad.addColorStop(0, `rgba(255,255,255,${bAlpha * 0.88})`)
          coreGrad.addColorStop(0.28, `rgba(50,197,232,${bAlpha * 0.72})`)
          coreGrad.addColorStop(0.65, `rgba(30,107,147,${bAlpha * 0.28})`)
          coreGrad.addColorStop(1, 'rgba(30,107,147,0)')
          ctx.fillStyle = coreGrad
          ctx.beginPath()
          ctx.arc(cx, cy, innerR, 0, Math.PI * 2)
          ctx.fill()

          // Mid cyan halo
          const midR = innerR + expandT * (mobile ? 48 : 78)
          const midGrad = ctx.createRadialGradient(cx, cy, innerR * 0.55, cx, cy, midR)
          midGrad.addColorStop(0, `rgba(50,197,232,${bAlpha * 0.36})`)
          midGrad.addColorStop(1, 'rgba(50,197,232,0)')
          ctx.fillStyle = midGrad
          ctx.beginPath()
          ctx.arc(cx, cy, midR, 0, Math.PI * 2)
          ctx.fill()

          // Outer ambient glow
          const outerR = midR + expandT * (mobile ? 38 : 65)
          const outerGrad = ctx.createRadialGradient(cx, cy, midR * 0.65, cx, cy, outerR)
          outerGrad.addColorStop(0, `rgba(30,107,147,${bAlpha * 0.11})`)
          outerGrad.addColorStop(1, 'rgba(30,107,147,0)')
          ctx.fillStyle = outerGrad
          ctx.beginPath()
          ctx.arc(cx, cy, outerR, 0, Math.PI * 2)
          ctx.fill()

          // Radial spark lines — PCB character, not generic particles
          const sparkCount = mobile ? 4 : 6
          for (let s = 0; s < sparkCount; s++) {
            const angle = (s / sparkCount) * Math.PI * 2 + bloomProgress * 0.9
            const sparkLen = expandT * (mobile ? 42 : 68) * (surgePhase === 'settle' ? bloomProgress : 1)
            const sx1 = cx + Math.cos(angle) * innerR * 0.3
            const sy1 = cy + Math.sin(angle) * innerR * 0.3
            const sx2 = cx + Math.cos(angle) * (innerR + sparkLen)
            const sy2 = cy + Math.sin(angle) * (innerR + sparkLen)
            const sparkGrad = ctx.createLinearGradient(sx1, sy1, sx2, sy2)
            sparkGrad.addColorStop(0, `rgba(50,197,232,${bAlpha * 0.75})`)
            sparkGrad.addColorStop(1, 'rgba(50,197,232,0)')
            ctx.strokeStyle = sparkGrad
            ctx.lineWidth = 1.5
            ctx.lineCap = 'round'
            ctx.beginPath()
            ctx.moveTo(sx1, sy1)
            ctx.lineTo(sx2, sy2)
            ctx.stroke()
          }

          // PCB crosshair lines (orthogonal, gives engineered feel)
          if (!mobile) {
            const hLen = expandT * 160 * (surgePhase === 'settle' ? bloomProgress : 1)
            const hAlpha = bAlpha * 0.22
            ctx.strokeStyle = `rgba(30,107,147,${hAlpha})`
            ctx.lineWidth = 0.8
            ctx.lineCap = 'square'
            ctx.beginPath()
            ctx.moveTo(cx - hLen, cy)
            ctx.lineTo(cx + hLen, cy)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(cx, cy - hLen * 0.42)
            ctx.lineTo(cx, cy + hLen * 0.42)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(resizeTimeout)
      resizeObserver.disconnect()
      EnergyBus.off('section:approach', onApproach)
      EnergyBus.off('section:activate', onActivate)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-90"
      aria-hidden="true"
    />
  )
}

export default GlobalCircuitNetwork
