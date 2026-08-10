import { useEffect, useRef } from 'react'

/**
 * GlobalCircuitNetwork — Ultra-High Performance Viewport-Scoped Electrical Signal System
 *
 * Optimized to run at 60 FPS on 100vh viewport canvas (zero lag / zero memory bloat):
 * - Canvas sized strictly to 100vh viewport (100% resolution, zero massive multi-thousand px canvas allocation).
 * - Smooth lerped scroll tracking: current scroll position drives fluid movement.
 * - Viewport clipping: only active visible trace segments in the viewport are processed.
 * - Downward scroll: electrical pulse travels forward through motherboard traces.
 * - Upward scroll: electrical pulse reverses naturally along traces.
 * - Bright cyan core, soft blue halo, fading tail, via pad illumination.
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

    // Lerped scroll tracking for ultra-smooth 60 FPS motion
    let targetScrollY = window.scrollY
    let lerpedScrollY = window.scrollY

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

    // Seed continuous motherboard PCB traces
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

      // Lerp scroll position for smooth acceleration and deceleration
      lerpedScrollY += (targetScrollY - lerpedScrollY) * 0.12

      ctx.clearRect(0, 0, width, height)

      // 1. Engineering Blueprint Grid
      ctx.strokeStyle = 'rgba(30, 107, 147, 0.03)'
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

      // 2. Motherboard Copper Traces & Scroll-Driven Electrical Pulses
      paths.forEach((p, pathIdx) => {
        // Trace lines (The Wires) rendered relative to current viewport
        ctx.strokeStyle = `rgba(30, 107, 147, ${p.alpha})`
        ctx.lineWidth = p.width
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
            ctx.fillStyle = `rgba(30, 107, 147, ${p.alpha * 2.2})`
            ctx.beginPath()
            ctx.arc(node.x, ny, node.r, 0, Math.PI * 2)
            ctx.fill()
          }
        })

        // Scroll-driven Electrical Energy Pulse (Synchronized with scroll progress)
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
              // Fading Trail behind pulse
              const startHeadRatio = Math.max(0, ratio - 0.25)
              const tailX = seg.x1 + (seg.x2 - seg.x1) * startHeadRatio
              const tailY = seg.y1 + (seg.y2 - seg.y1) * startHeadRatio - lerpedScrollY

              const trailGrad = ctx.createLinearGradient(tailX, tailY, px, screenPy)
              trailGrad.addColorStop(0, 'rgba(50, 197, 232, 0)')
              trailGrad.addColorStop(1, 'rgba(50, 197, 232, 0.50)')

              ctx.strokeStyle = trailGrad
              ctx.lineWidth = p.width * 1.8
              ctx.beginPath()
              ctx.moveTo(tailX, tailY)
              ctx.lineTo(px, screenPy)
              ctx.stroke()

              // Soft Blue Halo
              const pulseGrad = ctx.createRadialGradient(px, screenPy, 0, px, screenPy, 14)
              pulseGrad.addColorStop(0, 'rgba(50, 197, 232, 0.90)')
              pulseGrad.addColorStop(0.35, 'rgba(50, 197, 232, 0.35)')
              pulseGrad.addColorStop(1, 'rgba(50, 197, 232, 0)')

              ctx.fillStyle = pulseGrad
              ctx.beginPath()
              ctx.arc(px, screenPy, 14, 0, Math.PI * 2)
              ctx.fill()

              // Bright Cyan Core Dot
              ctx.fillStyle = '#FFFFFF'
              ctx.beginPath()
              ctx.arc(px, screenPy, 2.2, 0, Math.PI * 2)
              ctx.fill()

              // Via Pad Illumination when pulse passes over via node
              p.viaNodes.forEach((node) => {
                const distToNode = Math.hypot(px - node.x, py - node.y)
                if (distToNode < 14) {
                  const ny = node.y - lerpedScrollY
                  ctx.fillStyle = `rgba(50, 197, 232, ${0.85 * (1 - distToNode / 14)})`
                  ctx.beginPath()
                  ctx.arc(node.x, ny, node.r + 2.5, 0, Math.PI * 2)
                  ctx.fill()
                }
              })
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
