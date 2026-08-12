import { useEffect, useRef } from 'react'

/**
 * GlobalCircuitNetwork — Viewport-Scoped Electrical Signal System & Section Power-Up System
 *
 * Runs at 60 FPS on 100vh viewport canvas (zero lag / zero memory bloat):
 * - Canvas sized strictly to 100vh viewport.
 * - Smooth lerped scroll tracking.
 * - Viewport clipping: only active visible trace segments in the viewport are processed.
 * - SECTION POWER-UP SURGE: Listens for section entry and triggers a high-intensity cyan/white electrical discharge burst across motherboard traces.
 */
const GlobalCircuitNetwork = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let animationFrameId

    let width = window.innerWidth
    let height = window.innerHeight
    let docHeight = Math.max(document.documentElement.scrollHeight || 6000, 6000)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Lerped scroll tracking
    let targetScrollY = window.scrollY
    let lerpedScrollY = window.scrollY

    // Power-up electrical surge state
    let surgeIntensity = 0

    const triggerSurge = () => {
      surgeIntensity = 1.0
    }

    // Listen for custom section activation event
    window.addEventListener('exess-section-powerup', triggerSurge)

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

    const handleScroll = () => {
      targetScrollY = window.scrollY
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    const resizeObserver = new ResizeObserver(() => handleResize())
    resizeObserver.observe(document.body)

    // Seed motherboard PCB traces
    const numTraces = Math.min(20, Math.max(12, Math.floor(width / 85)))
    const paths = []

    for (let i = 0; i < numTraces; i++) {
      const startX = (width / numTraces) * i + (i % 2 === 0 ? 20 : 50)
      const segments = []
      const viaNodes = []
      let currentX = startX
      let currentY = 0

      while (currentY < docHeight) {
        const segLen = 140 + Math.random() * 220
        const angleType = Math.floor(Math.random() * 4)

        let nextX = currentX
        let nextY = currentY + segLen

        if (angleType === 1) nextX = Math.min(width - 30, currentX + segLen * 0.45)
        if (angleType === 2) nextX = Math.max(30, currentX - segLen * 0.45)

        // Push traces to perimeter if entering Hero Heading text zone
        if (currentY < 480 && nextY > 140 && nextX > 220 && nextX < (width - 220)) {
          if (nextX < width / 2) {
            nextX = Math.max(30, Math.min(180, currentX - 120))
          } else {
            nextX = Math.min(width - 30, Math.max(width - 180, currentX + 120))
          }
        }

        segments.push({ x1: currentX, y1: currentY, x2: nextX, y2: nextY })

        if (Math.random() > 0.4) {
          viaNodes.push({ x: nextX, y: nextY, r: 2.5 + Math.random() * 1.5 })
        }

        currentX = nextX
        currentY = nextY
      }

      paths.push({
        segments,
        viaNodes,
        totalLength: segments.reduce((sum, s) => sum + Math.hypot(s.x2 - s.x1, s.y2 - s.y1), 0),
        width: 1.2 + Math.random() * 0.6,
        alpha: 0.08 + Math.random() * 0.05,
        offsetMultiplier: 0.8 + (i % 5) * 0.2,
      })
    }

    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      // Decay surge intensity
      if (surgeIntensity > 0) {
        surgeIntensity = Math.max(0, surgeIntensity - 0.025)
      }

      lerpedScrollY += (targetScrollY - lerpedScrollY) * 0.12

      ctx.clearRect(0, 0, width, height)

      // 1. Engineering Blueprint Grid
      ctx.strokeStyle = `rgba(30, 107, 147, ${0.03 + surgeIntensity * 0.04})`
      ctx.lineWidth = 1
      const gridStep = 70
      const gridOffsetY = - (lerpedScrollY % gridStep)

      ctx.beginPath()
      for (let x = 0; x < width; x += gridStep) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
      }
      for (let y = gridOffsetY; y < height; y += gridStep) {
        if (y >= 0) {
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
        }
      }
      ctx.stroke()

      // 2. Motherboard Copper Traces & Electrical Surge
      paths.forEach((p, pathIdx) => {
        const activeAlpha = p.alpha + surgeIntensity * 0.25
        ctx.strokeStyle = `rgba(30, 107, 147, ${activeAlpha})`
        ctx.lineWidth = p.width + surgeIntensity * 0.8
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

        // Via Nodes inside viewport
        p.viaNodes.forEach((node) => {
          const ny = node.y - lerpedScrollY
          if (ny >= -20 && ny <= height + 20) {
            const viaAlpha = activeAlpha * 2.2 + surgeIntensity * 0.4
            ctx.fillStyle = surgeIntensity > 0.4 ? '#32C5E8' : `rgba(30, 107, 147, ${viaAlpha})`
            ctx.beginPath()
            ctx.arc(node.x, ny, node.r + surgeIntensity * 1.5, 0, Math.PI * 2)
            ctx.fill()
          }
        })

        // Electrical Energy Pulse
        const scrollDistance = lerpedScrollY * p.offsetMultiplier + (pathIdx * 140)
        const currentDist = Math.abs(scrollDistance) % p.totalLength
        let accumulated = 0

        for (const seg of p.segments) {
          const segLen = Math.hypot(seg.x2 - seg.x1, seg.y2 - seg.y1)
          if (accumulated + segLen >= currentDist) {
            const ratio = (currentDist - accumulated) / segLen
            const px = seg.x1 + (seg.x2 - seg.x1) * ratio
            const py = seg.y1 + (seg.y2 - seg.y1) * ratio
            const screenPy = py - lerpedScrollY

            if (screenPy >= -30 && screenPy <= height + 30) {
              const trailLen = 0.25 + surgeIntensity * 0.2
              const startHeadRatio = Math.max(0, ratio - trailLen)
              const tailX = seg.x1 + (seg.x2 - seg.x1) * startHeadRatio
              const tailY = seg.y1 + (seg.y2 - seg.y1) * startHeadRatio - lerpedScrollY

              const trailGrad = ctx.createLinearGradient(tailX, tailY, px, screenPy)
              trailGrad.addColorStop(0, 'rgba(50, 197, 232, 0)')
              trailGrad.addColorStop(1, `rgba(50, 197, 232, ${0.50 + surgeIntensity * 0.4})`)

              ctx.strokeStyle = trailGrad
              ctx.lineWidth = (p.width * 1.8) + surgeIntensity * 1.5
              ctx.beginPath()
              ctx.moveTo(tailX, tailY)
              ctx.lineTo(px, screenPy)
              ctx.stroke()

              // Soft Blue / White Electrical Discharge Glow
              const pulseRadius = 14 + surgeIntensity * 16
              const pulseGrad = ctx.createRadialGradient(px, screenPy, 0, px, screenPy, pulseRadius)
              pulseGrad.addColorStop(0, surgeIntensity > 0.3 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(50, 197, 232, 0.90)')
              pulseGrad.addColorStop(0.35, 'rgba(50, 197, 232, 0.50)')
              pulseGrad.addColorStop(1, 'rgba(50, 197, 232, 0)')

              ctx.fillStyle = pulseGrad
              ctx.beginPath()
              ctx.arc(px, screenPy, pulseRadius, 0, Math.PI * 2)
              ctx.fill()

              // Bright Core Dot
              ctx.fillStyle = '#FFFFFF'
              ctx.beginPath()
              ctx.arc(px, screenPy, 2.2 + surgeIntensity * 2.0, 0, Math.PI * 2)
              ctx.fill()
            }
            break
          }
          accumulated += segLen
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('exess-section-powerup', triggerSurge)
      clearTimeout(resizeTimeout)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-90"
    />
  )
}

export default GlobalCircuitNetwork
