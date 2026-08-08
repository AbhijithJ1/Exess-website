import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * IntroAnimation — Straight Diagonal Energy Projectile & Direct Impact Logo Activation
 *
 * SEQUENCE CHOREOGRAPHY:
 * 1. PCB System Initializes (0.0s - 3.2s): PCB traces & socket frame draw & settle first.
 * 2. Projectile Appears Far Top-Left (3.2s - 3.8s): Concentrated cyan projectile appears at (60, 60).
 * 3. Straight Line High-Speed Travel (3.8s - 5.0s): Projectile travels in 1 PERFECT STRAIGHT DIAGONAL LINE to logo (300, 220).
 * 4. Direct Impact & Emblem Power-On (5.0s - 5.8s): Impact at (300, 220) triggers brief energy spark; emblem lines draw.
 * 5. Connected Nodes Power-On (5.6s - 6.2s): Energy flows into terminal nodes & pads below emblem.
 * 6. Wordmark Energization (6.2s - 7.4s): ExESS letters energize progressively LEFT → RIGHT.
 * 7. Energy Trail Fade & Clean Settle (7.4s - 8.2s): Impact glow & trail fade away; stable logo remains for preloader exit.
 */

const EmblemSVG = ({ svgRef }) => (
  <svg
    ref={svgRef}
    viewBox="0 0 200 210"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full overflow-visible"
  >
    {/* Globe outer circle */}
    <circle className="emblem-path" cx="100" cy="85" r="50" stroke="#1E6B93" strokeWidth="3" />

    {/* Latitude ellipses */}
    <ellipse className="emblem-path" cx="100" cy="85" rx="50" ry="15" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />
    <ellipse className="emblem-path" cx="100" cy="85" rx="50" ry="30" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />
    <ellipse className="emblem-path" cx="100" cy="85" rx="50" ry="43" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />

    {/* Longitude lines */}
    <line className="emblem-path" x1="100" y1="35" x2="100" y2="135" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />
    <line className="emblem-path" x1="70"  y1="48" x2="70"  y2="122" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />
    <line className="emblem-path" x1="130" y1="48" x2="130" y2="122" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />
    <line className="emblem-path" x1="50"  y1="68" x2="50"  y2="102" stroke="#1E6B93" strokeWidth="1"   opacity="0.5" />
    <line className="emblem-path" x1="150" y1="68" x2="150" y2="102" stroke="#1E6B93" strokeWidth="1"   opacity="0.5" />

    {/* Cyan Orbit ellipse */}
    <ellipse
      className="emblem-path emblem-orbit"
      cx="100" cy="85" rx="64" ry="19"
      stroke="#32C5E8" strokeWidth="2.8"
      transform="rotate(-12 100 85)"
    />

    {/* PCB circuit traces below globe (connected nodes) */}
    <path className="node-path" d="M75 135 L70 155 L55 155 L55 175"   stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="node-path" d="M90 135 L90 160 L75 160 L75 185"   stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="node-path" d="M110 135 L110 155 L125 155 L125 175" stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="node-path" d="M125 135 L130 160 L145 160 L145 185" stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="node-path" d="M100 135 L100 165"                  stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" />

    {/* Terminal pads */}
    <rect className="node-path node-pad" x="48"  y="173" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" fill="none" />
    <rect className="node-path node-pad" x="68"  y="183" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" fill="none" />
    <rect className="node-path node-pad" x="92"  y="168" width="16" height="16" rx="2.5" stroke="#1E6B93" strokeWidth="2" fill="none" />
    <rect className="node-path node-pad" x="118" y="183" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" fill="none" />
    <rect className="node-path node-pad" x="138" y="173" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" fill="none" />

    {/* Pad fills */}
    <rect className="node-fill" x="53"  y="178" width="4" height="4" rx="1" fill="#1E6B93" opacity="0" />
    <rect className="node-fill" x="73"  y="188" width="4" height="4" rx="1" fill="#1E6B93" opacity="0" />
    <rect className="node-fill" x="98"  y="174" width="4" height="4" rx="1" fill="#1E6B93" opacity="0" />
    <rect className="node-fill" x="123" y="188" width="4" height="4" rx="1" fill="#1E6B93" opacity="0" />
    <rect className="node-fill" x="143" y="178" width="4" height="4" rx="1" fill="#1E6B93" opacity="0" />
  </svg>
)

const IntroAnimation = ({ onComplete }) => {
  const containerRef       = useRef(null)
  const pcbSvgRef          = useRef(null)
  const straightTrailRef   = useRef(null)
  const pulseSparkRef      = useRef(null)
  const socketPadsRef      = useRef(null)
  const logoGroupRef       = useRef(null)
  const emblemWrapperRef   = useRef(null)
  const emblemSvgRef       = useRef(null)
  const lettersRef         = useRef([])
  const hasFinishedRef     = useRef(false)

  const finishAnimation = () => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true
    if (containerRef.current) {
      containerRef.current.style.transition = 'opacity 0.5s ease-in-out'
      containerRef.current.style.opacity = '0'
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 480)
    } else if (onComplete) {
      onComplete()
    }
  }

  useEffect(() => {
    const letters = lettersRef.current
    gsap.set(containerRef.current, { opacity: 1 })

    // Hide Logo Group Initially
    gsap.set(logoGroupRef.current, { opacity: 0 })
    gsap.set(emblemWrapperRef.current, { filter: 'drop-shadow(0 0 0px transparent)' })
    gsap.set(pulseSparkRef.current, { opacity: 0, scale: 0, x: 0, y: 0 })

    // Setup Straight Diagonal Trail Line (From 60,60 to 300,220)
    if (straightTrailRef.current) {
      const len = (() => { try { return straightTrailRef.current.getTotalLength() } catch { return 300 } })()
      gsap.set(straightTrailRef.current, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
    }

    // Setup Emblem paths
    const emblemEl = emblemSvgRef.current
    if (emblemEl) {
      const emblemPaths = emblemEl.querySelectorAll('.emblem-path')
      const nodePaths   = emblemEl.querySelectorAll('.node-path')
      const nodeFills   = emblemEl.querySelectorAll('.node-fill')

      emblemPaths.forEach(el => {
        const len = (() => { try { return el.getTotalLength() } catch { return 200 } })()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      })

      nodePaths.forEach(el => {
        const len = (() => { try { return el.getTotalLength() } catch { return 150 } })()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      })

      nodeFills.forEach(el => gsap.set(el, { opacity: 0 }))
    }

    // Setup Outer PCB Motherboard Traces (Initially hidden)
    if (pcbSvgRef.current) {
      const traces = pcbSvgRef.current.querySelectorAll('.pcb-trace')
      traces.forEach(el => {
        const len = (() => { try { return el.getTotalLength() } catch { return 400 } })()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      })
    }

    // Setup Wordmark Letters
    letters.forEach(letterEl => {
      if (letterEl) {
        gsap.set(letterEl, { opacity: 0, y: 16, filter: 'blur(8px)' })
      }
    })

    // Setup Socket Terminal Pads
    if (socketPadsRef.current) {
      const pads = socketPadsRef.current.querySelectorAll('.socket-pad')
      pads.forEach(p => gsap.set(p, { scale: 1, fill: '#1E6B93', opacity: 0.4 }))
    }

    // ── MASTER CINEMATIC TIMELINE (8.2s TOTAL DURATION) ─────────
    const tl = gsap.timeline({
      onComplete: finishAnimation,
    })

    // STEP 1: PCB SYSTEM INITIALIZES & SETTLES (0.0s - 3.2s)
    if (pcbSvgRef.current) {
      const traces = pcbSvgRef.current.querySelectorAll('.pcb-trace')
      tl.to(traces, { strokeDashoffset: 0, opacity: 1, duration: 2.8, stagger: 0.1, ease: 'power2.inOut' }, 0.1)
    }

    // STEP 2: CONCENTRATED PROJECTILE APPEARS IN FAR TOP-LEFT (60, 60) (3.2s - 3.8s)
    tl.to(pulseSparkRef.current, {
      opacity: 1,
      scale: 1.3,
      duration: 0.6,
      ease: 'power1.out',
    }, 3.2)

    // STEP 3: PERFECT STRAIGHT DIAGONAL LINE TRAVEL TO LOGO CENTER (300, 220) (3.8s - 5.0s)
    if (straightTrailRef.current) {
      tl.to(straightTrailRef.current, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.in',
      }, 3.8)
    }

    // Projectile spark moves in a PERFECT STRAIGHT DIAGONAL VECTOR from (60, 60) to (300, 220)
    tl.to(pulseSparkRef.current, {
      x: 240,
      y: 160,
      duration: 1.2,
      ease: 'power2.in',
    }, 3.8)

    // STEP 4: DIRECT IMPACT AT (300, 220) & EMBLEM POWER ON (5.0s - 5.8s)
    tl.to(logoGroupRef.current, { opacity: 1, duration: 0.15 }, 4.95)

    // Sharp concentrated impact bloom
    tl.to(emblemWrapperRef.current, {
      filter: 'drop-shadow(0 0 24px rgba(50,197,232,0.75))',
      duration: 0.3,
      ease: 'power1.out',
    }, 5.0)

    if (emblemEl) {
      const emblemPaths = emblemEl.querySelectorAll('.emblem-path')
      tl.to(emblemPaths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power2.out',
      }, 5.0)
    }

    // STEP 5: CONNECTED ELECTRONIC NODES POWER ON (5.6s - 6.2s)
    if (emblemEl) {
      const nodePaths = emblemEl.querySelectorAll('.node-path')
      const nodeFills = emblemEl.querySelectorAll('.node-fill')

      tl.to(nodePaths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.03,
        ease: 'power2.out',
      }, 5.5)

      tl.to(nodeFills, {
        opacity: 1,
        duration: 0.3,
        stagger: 0.02,
        ease: 'power1.out',
      }, 5.8)
    }

    // STEP 6: WORDMARK ENERGIZATION PROGRESSIVELY LEFT → RIGHT (6.2s - 7.4s)
    letters.forEach((letterEl, index) => {
      if (letterEl) {
        tl.to(letterEl, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.45,
          ease: 'back.out(1.4)',
        }, 6.2 + index * 0.18)
      }
    })

    // STEP 7: TRAIL FADES & CLEAN FINAL LOGO SETTLES (7.2s - 8.2s)
    if (straightTrailRef.current) {
      tl.to(straightTrailRef.current, { opacity: 0, duration: 0.7 }, 7.0)
    }
    tl.to(pulseSparkRef.current, { opacity: 0, duration: 0.5 }, 7.0)

    tl.to(emblemWrapperRef.current, {
      filter: 'drop-shadow(0 0 8px rgba(50,197,232,0.15))',
      duration: 0.8,
      ease: 'power2.out',
    }, 7.2)

    // Pause to admire complete stable ExESS identity
    tl.to({}, { duration: 0.4 }, 7.8)

    const safetyTimer = setTimeout(() => {
      finishAnimation()
    }, 8600)

    return () => {
      clearTimeout(safetyTimer)
      tl.kill()
    }
  }, [])

  const SVG_SIZE = 'min(92vw, 620px)'
  const exessLetters = ['E', 'x', 'E', 'S', 'S']

  return (
    <div
      ref={containerRef}
      onClick={finishAnimation}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none cursor-pointer bg-white"
    >
      {/* ── PCB MOTHERBOARD TRACES SVG (DRAWS & SETTLES FIRST) ── */}
      <svg
        ref={pcbSvgRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Socket Outer Framing Brackets */}
        <path className="pcb-trace" d="M 40 40 H 200 V 140 H 240" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 560 40 H 400 V 140 H 360" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />

        {/* Left / Right Vertical Socket Boundaries */}
        <path className="pcb-trace" d="M 20 240 H 140 V 360 H 20" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 580 240 H 460 V 360 H 580" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />

        {/* Bottom Framing Brackets */}
        <path className="pcb-trace" d="M 40 560 H 200 V 460 H 240" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 560 560 H 400 V 460 H 360" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />

        {/* Framing Corner Accents */}
        <path className="pcb-trace" d="M 140 180 V 140 H 180" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
        <path className="pcb-trace" d="M 460 180 V 140 H 420" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
        <path className="pcb-trace" d="M 140 420 V 460 H 180" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
        <path className="pcb-trace" d="M 460 420 V 460 H 420" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
      </svg>

      {/* ── TERMINAL SOCKET PADS GROUP ── */}
      <svg
        ref={socketPadsRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className="socket-pad" cx="240" cy="140" r="3.5" />
        <circle className="socket-pad" cx="360" cy="140" r="3.5" />
        <circle className="socket-pad" cx="140" cy="240" r="3.5" />
        <circle className="socket-pad" cx="140" cy="360" r="3.5" />
        <circle className="socket-pad" cx="460" cy="240" r="3.5" />
        <circle className="socket-pad" cx="460" cy="360" r="3.5" />
        <circle className="socket-pad" cx="240" cy="460" r="3.5" />
        <circle className="socket-pad" cx="360" cy="460" r="3.5" />
      </svg>

      {/* ── PERFECT STRAIGHT DIAGONAL LINE PROJECTILE TRAIL (FROM 60,60 DIRECTLY TO LOGO 300,220) ── */}
      <svg
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Perfect Straight Line Trajectory */}
        <line
          ref={straightTrailRef}
          x1="60" y1="60"
          x2="300" y2="220"
          stroke="#32C5E8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* High-Speed Projectile Spark Node */}
        <g ref={pulseSparkRef} style={{ transformOrigin: '60px 60px' }}>
          <circle cx="60" cy="60" r="10" fill="url(#sparkGlow)" />
          <circle cx="60" cy="60" r="3" fill="#FFFFFF" />
        </g>

        <defs>
          <radialGradient id="sparkGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#32C5E8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1E6B93" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* ── CENTRAL ExESS IDENTITY CORE (NO LARGE CIRCLE AT ALL) ── */}
      <div
        ref={logoGroupRef}
        className="relative z-10 flex flex-col items-center justify-center text-center p-4"
        style={{ transformOrigin: 'center center' }}
      >
        {/* Emblem Assembly */}
        <div
          ref={emblemWrapperRef}
          style={{ width: 'clamp(110px, 16vw, 135px)', height: 'clamp(120px, 18vw, 150px)' }}
        >
          <EmblemSVG svgRef={emblemSvgRef} />
        </div>

        {/* Wordmark Assembly — Progressive L→R Letter Reveal (100% CLEAN TEXT) */}
        <div className="mt-3.5 flex items-center justify-center gap-0.5">
          <h1
            className="font-brand font-bold text-light-sweep-dark tracking-tight flex"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
              lineHeight: '0.95',
              letterSpacing: '-0.04em',
            }}
          >
            {exessLetters.map((char, index) => (
              <span
                key={index}
                ref={(el) => (lettersRef.current[index] = el)}
                className="inline-block"
              >
                {char}
              </span>
            ))}
          </h1>
        </div>
      </div>

      <div className="absolute bottom-6 right-8 text-[11px] font-mono text-slate-400 uppercase tracking-widest pointer-events-none opacity-50">
        Click to skip &rarr;
      </div>
    </div>
  )
}

export default IntroAnimation
