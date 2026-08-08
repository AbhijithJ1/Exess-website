import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * IntroAnimation — Invisible Trajectory Energy Particle Impact Logo Activation
 *
 * NO VISIBLE SVG LINE / NO BEAM / NO TRAIL:
 * 1. PCB System Initializes (0.0s - 3.2s): PCB traces & socket frame draw & settle first.
 * 2. Particle Spawns Top-Left (3.2s - 3.7s): Small cyan/white energy particle spawns at (60, 60).
 * 3. Invisible Straight Diagonal Flight (3.7s - 4.7s): Particle flies to (300, 220) with ZERO visible line path.
 * 4. Direct Impact & Particle Vanishes (4.7s): Impact at (300, 220) triggers brief flash; particle vanishes.
 * 5. Emblem & Nodes Power On (4.7s - 5.8s): Emblem globe lines draw; connected electronic nodes activate.
 * 6. Wordmark Energization (5.8s - 7.0s): ExESS letters energize progressively LEFT → RIGHT.
 * 7. Clean Settle & Transition (7.0s - 7.8s): Crisp ExESS identity remains stable for preloader exit.
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

    // ── MASTER CINEMATIC TIMELINE (7.8s TOTAL DURATION) ─────────
    const tl = gsap.timeline({
      onComplete: finishAnimation,
    })

    // STEP 1: PCB SYSTEM INITIALIZES & SETTLES (0.0s - 3.2s)
    if (pcbSvgRef.current) {
      const traces = pcbSvgRef.current.querySelectorAll('.pcb-trace')
      tl.to(traces, { strokeDashoffset: 0, opacity: 1, duration: 2.8, stagger: 0.1, ease: 'power2.inOut' }, 0.1)
    }

    // STEP 2: SMALL BRIGHT CYAN/WHITE PARTICLE SPAWNS IN FAR TOP-LEFT (60, 60) (3.2s - 3.7s)
    tl.to(pulseSparkRef.current, {
      opacity: 1,
      scale: 1.2,
      duration: 0.5,
      ease: 'power1.out',
    }, 3.2)

    // STEP 3: PARTICLE FLIES IN A STRAIGHT DIAGONAL TRAJECTORY (ZERO VISIBLE LINE) (3.7s - 4.7s)
    tl.to(pulseSparkRef.current, {
      x: 240,
      y: 160,
      duration: 1.0,
      ease: 'power2.in',
    }, 3.7)

    // STEP 4: DIRECT IMPACT AT LOGO CENTER (300, 220) & PARTICLE VANISHES (4.7s)
    tl.to(pulseSparkRef.current, { opacity: 0, scale: 0.1, duration: 0.1 }, 4.7)
    tl.to(logoGroupRef.current, { opacity: 1, duration: 0.15 }, 4.7)

    // Sharp concentrated impact flash bloom
    tl.to(emblemWrapperRef.current, {
      filter: 'drop-shadow(0 0 24px rgba(50,197,232,0.80))',
      duration: 0.25,
      ease: 'power1.out',
    }, 4.7)

    // STEP 5: EMBLEM GLOBE LINES & ORBIT ACTIVATION (4.7s - 5.5s)
    if (emblemEl) {
      const emblemPaths = emblemEl.querySelectorAll('.emblem-path')
      tl.to(emblemPaths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.04,
        ease: 'power2.out',
      }, 4.75)
    }

    // STEP 6: CONNECTED ELECTRONIC NODES POWER ON (5.4s - 6.0s)
    if (emblemEl) {
      const nodePaths = emblemEl.querySelectorAll('.node-path')
      const nodeFills = emblemEl.querySelectorAll('.node-fill')

      tl.to(nodePaths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.03,
        ease: 'power2.out',
      }, 5.3)

      tl.to(nodeFills, {
        opacity: 1,
        duration: 0.3,
        stagger: 0.02,
        ease: 'power1.out',
      }, 5.6)
    }

    // STEP 7: WORDMARK ENERGIZATION PROGRESSIVELY LEFT → RIGHT (5.8s - 7.0s)
    letters.forEach((letterEl, index) => {
      if (letterEl) {
        tl.to(letterEl, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.45,
          ease: 'back.out(1.4)',
        }, 5.8 + index * 0.18)
      }
    })

    // STEP 8: IMPACT GLOW SETTLES & CLEAN FINAL LOGO REMAINS (7.0s - 7.8s)
    tl.to(emblemWrapperRef.current, {
      filter: 'drop-shadow(0 0 8px rgba(50,197,232,0.15))',
      duration: 0.8,
      ease: 'power2.out',
    }, 6.8)

    // Pause to admire complete stable ExESS identity
    tl.to({}, { duration: 0.4 }, 7.4)

    const safetyTimer = setTimeout(() => {
      finishAnimation()
    }, 8200)

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

      {/* ── FLYING ENERGY PARTICLE (ZERO VISIBLE SVG LINE / ZERO PERSISTENT BEAM) ── */}
      <svg
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* High-Speed Flying Energy Particle Spark Node */}
        <g ref={pulseSparkRef} style={{ transformOrigin: '60px 60px' }}>
          <circle cx="60" cy="60" r="8" fill="url(#sparkGlow)" />
          <circle cx="60" cy="60" r="2.8" fill="#FFFFFF" />
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
