import { useEffect, useRef } from 'react'

/**
 * GlobalCircuitNetwork — Scroll-Synchronized Electrical Signal System
 *
 * Drives a primary cyan electrical energy current that is 100% synchronized
 * with user scrolling:
 * - Smooth lerped scroll tracking: lerps current scroll position for fluid motion.
 * - Downward scroll: electrical pulse travels forward through motherboard traces.
 * - Upward scroll: electrical pulse reverses naturally along traces.
 * - Fast scroll: pulse accelerates smoothly to catch up (zero teleporting/jumping).
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
    let height = Math.max(document.documentElement.scrollHeight || 6000, 6000)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Lerped scroll tracking for ultra-smooth 60 FPS motion
    let targetScrollY = window.scrollY
    let lerpedScrollY = window.scrollY

    const resize = () => {
      width = window.innerWidth
      height = Math.max(document.documentElement.scrollHeight || 6000, 6000)
      canvas.width = width * dpr
      canvas.height = height * dpr
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
    const numTraces = Math.min(22, Math.max(14, Math.floor(width / 80)))
    const paths = []

    for (let i = 0; i < numTraces; i++) {
      const startX = (width / numTraces) * i + (i % 2 === 0 ? 20 : 50)
      const segments = []
      const viaNodes = []
      let currentX = startX
      let currentY = 0

      while (currentY < height) {
        const segLen = 140 + Math.random() * 220
        const angleType = Math.floor(Math.random() * 4)

        let nextX = currentX
        let nextY = currentY + segLen

        if (angleType === 1) nextX = Math.min(width - 30, currentX + segLen * 0.45)
        if (angleType === 2) nextX = Math.max(30, currentX - segLen * 0.45)

        // Intelligent PCB Routing: Push traces to perimeter if entering Hero Heading text zone
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
      // Lerp scroll position for smooth acceleration and deceleration
      lerpedScrollY += (targetScrollY - lerpedScrollY) * 0.08

      const viewportH = window.innerHeight
      const minY = Math.max(0, lerpedScrollY - 300)
      const maxY = Math.min(height, lerpedScrollY + viewportH + 300)

      ctx.clearRect(0, 0, width, height)

      // 1. Engineering Blueprint Grid
      ctx.strokeStyle = 'rgba(30, 107, 147, 0.035)'
      ctx.lineWidth = 1
      const gridStep = 70

      ctx.beginPath()
      for (let x = 0; x < width; x += gridStep) {
        ctx.moveTo(x, minY)
        ctx.lineTo(x, maxY)
      }
      ctx.stroke()

      // 2. Motherboard Copper Traces & Scroll-Driven Electrical Pulses
      paths.forEach((p, pathIdx) => {
        // Trace lines (The Wires)
        ctx.strokeStyle = `rgba(30, 107, 147, ${p.alpha})`
        ctx.lineWidth = p.width
        ctx.lineCap = 'square'

        ctx.beginPath()
        p.segments.forEach((seg, idx) => {
          if (seg.y2 >= minY && seg.y1 <= maxY) {
            if (idx === 0 || p.segments[idx - 1].y2 < minY) ctx.moveTo(seg.x1, seg.y1)
            ctx.lineTo(seg.x2, seg.y2)
          }
        })
        ctx.stroke()

        // Via Nodes inside viewport
        p.viaNodes.forEach((node) => {
          if (node.y >= minY && node.y <= maxY) {
            ctx.fillStyle = `rgba(30, 107, 147, ${p.alpha * 2.2})`
            ctx.beginPath()
            ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
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

            if (py >= minY && py <= maxY) {
              // Fading Trail behind pulse
              const trailGrad = ctx.createLinearGradient(seg.x1, seg.y1, px, py)
              trailGrad.addColorStop(0, 'rgba(50, 197, 232, 0)')
              trailGrad.addColorStop(1, 'rgba(50, 197, 232, 0.50)')

              ctx.strokeStyle = trailGrad
              ctx.lineWidth = p.width * 1.8
              ctx.beginPath()
              ctx.moveTo(seg.x1 + (px - seg.x1) * Math.max(0, ratio - 0.25), seg.y1 + (py - seg.y1) * Math.max(0, ratio - 0.25))
              ctx.lineTo(px, py)
              ctx.stroke()

              // Soft Blue Halo
              const pulseGrad = ctx.createRadialGradient(px, py, 0, px, py, 14)
              pulseGrad.addColorStop(0, 'rgba(50, 197, 232, 0.90)')
              pulseGrad.addColorStop(0.35, 'rgba(50, 197, 232, 0.35)')
              pulseGrad.addColorStop(1, 'rgba(50, 197, 232, 0)')

              ctx.fillStyle = pulseGrad
              ctx.beginPath()
              ctx.arc(px, py, 14, 0, Math.PI * 2)
              ctx.fill()

              // Bright Cyan Core Dot
              ctx.fillStyle = '#FFFFFF'
              ctx.beginPath()
              ctx.arc(px, py, 2.2, 0, Math.PI * 2)
              ctx.fill()

              // Via Pad Illumination when pulse passes over via node
              p.viaNodes.forEach((node) => {
                const distToNode = Math.hypot(px - node.x, py - node.y)
                if (distToNode < 14) {
                  ctx.fillStyle = `rgba(50, 197, 232, ${0.85 * (1 - distToNode / 14)})`
                  ctx.beginPath()
                  ctx.arc(node.x, node.y, node.r + 2.5, 0, Math.PI * 2)
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-95"
    />
  )
}

export default GlobalCircuitNetwork
