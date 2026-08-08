import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * IntroAnimation — Circuit-Powered ExESS Identity Assembly
 *
 * PRECISE ANIMATION CHOREOGRAPHY:
 * PHASE 1: Circuit Wake-up — Surrounding PCB traces become visible outside logo bounding box.
 * PHASE 2: Signal Travel — 4 Cyan energy signals travel from outer corners toward central collision node at (300, 140).
 * PHASE 3: Energy Collision (LOGO HIDDEN) — Signals converge & collide at (300, 140). LOGO IS STILL 100% HIDDEN.
 * PHASE 4: Collision Resolution — Incoming signals fade out; energy contracts down to emblem origin.
 * PHASE 5: Emblem Assembly — ExESS emblem SVG draws itself from central energy (NO lines cross text).
 * PHASE 6: Wordmark Assembly — Letters 'E'-'x'-'E'-'S'-'S' reveal progressively LEFT → RIGHT. Text is 100% clean.
 * PHASE 7: Surrounding Circuit Settle — Peripheral PCB traces connect around outer logo bounds.
 * PHASE 8: Transition — Smooth 450ms opacity fade into main website.
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
      className="emblem-orbit"
      cx="100" cy="85" rx="64" ry="19"
      stroke="#32C5E8" strokeWidth="2.8"
      transform="rotate(-12 100 85)"
    />

    {/* PCB circuit traces below globe */}
    <path className="emblem-path" d="M75 135 L70 155 L55 155 L55 175"   stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="emblem-path" d="M90 135 L90 160 L75 160 L75 185"   stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="emblem-path" d="M110 135 L110 155 L125 155 L125 175" stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="emblem-path" d="M125 135 L130 160 L145 160 L145 185" stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="emblem-path" d="M100 135 L100 165"                  stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" />

    {/* Terminal pads */}
    <rect className="emblem-path" x="48"  y="173" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" />
    <rect className="emblem-path" x="68"  y="183" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" />
    <rect className="emblem-path" x="92"  y="168" width="16" height="16" rx="2.5" stroke="#1E6B93" strokeWidth="2" />
    <rect className="emblem-path" x="118" y="183" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" />
    <rect className="emblem-path" x="138" y="173" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" />

    {/* Pad fills */}
    <rect className="emblem-path" x="53"  y="178" width="4" height="4" rx="1" fill="#1E6B93" />
    <rect className="emblem-path" x="73"  y="188" width="4" height="4" rx="1" fill="#1E6B93" />
    <rect className="emblem-path" x="98"  y="174" width="4" height="4" rx="1" fill="#1E6B93" />
    <rect className="emblem-path" x="123" y="188" width="4" height="4" rx="1" fill="#1E6B93" />
    <rect className="emblem-path" x="143" y="178" width="4" height="4" rx="1" fill="#1E6B93" />
  </svg>
)

const IntroAnimation = ({ onComplete }) => {
  const containerRef     = useRef(null)
  const pcbSvgRef        = useRef(null)
  const pulseSvgRef      = useRef(null)
  const collisionSparkRef= useRef(null)
  const logoGroupRef     = useRef(null)
  const emblemSvgRef     = useRef(null)
  const lettersRef       = useRef([])
  const hasFinishedRef   = useRef(false)

  const finishAnimation = () => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true
    if (containerRef.current) {
      containerRef.current.style.transition = 'opacity 0.45s ease-in-out'
      containerRef.current.style.opacity = '0'
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 440)
    } else if (onComplete) {
      onComplete()
    }
  }

  useEffect(() => {
    const letters = lettersRef.current
    gsap.set(containerRef.current, { opacity: 1 })

    // Hide Logo Group Initially (BEFORE Collision)
    gsap.set(logoGroupRef.current, { opacity: 0 })
    gsap.set(collisionSparkRef.current, { opacity: 0, scale: 0 })

    // Setup Emblem paths
    const emblemEl = emblemSvgRef.current
    if (emblemEl) {
      const emblemPaths = emblemEl.querySelectorAll('.emblem-path')
      const orbitPath   = emblemEl.querySelector('.emblem-orbit')

      emblemPaths.forEach(el => {
        const len = (() => { try { return el.getTotalLength() } catch { return 200 } })()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      })

      if (orbitPath) {
        const len = (() => { try { return orbitPath.getTotalLength() } catch { return 450 } })()
        gsap.set(orbitPath, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      }
    }

    // Setup Outer PCB Traces & Signal Pulses (PERIPHERAL ONLY - TERMINATE OUTSIDE LOGO)
    if (pcbSvgRef.current) {
      const traces = pcbSvgRef.current.querySelectorAll('.pcb-trace')
      traces.forEach(el => {
        const len = (() => { try { return el.getTotalLength() } catch { return 400 } })()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      })
    }

    if (pulseSvgRef.current) {
      const pulses = pulseSvgRef.current.querySelectorAll('.pcb-pulse')
      pulses.forEach(el => {
        const len = (() => { try { return el.getTotalLength() } catch { return 400 } })()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      })
    }

    // Setup Wordmark Letters (Hidden initially)
    letters.forEach(letterEl => {
      if (letterEl) {
        gsap.set(letterEl, { opacity: 0, y: 16, filter: 'blur(8px)' })
      }
    })

    // ── MASTER CHOREOGRAPHED TIMELINE ────────────────────────────
    const tl = gsap.timeline({
      onComplete: finishAnimation,
    })

    // PHASE 1: CIRCUIT WAKE-UP (0.0s - 0.5s)
    if (pcbSvgRef.current) {
      const traces = pcbSvgRef.current.querySelectorAll('.pcb-trace')
      tl.to(traces, { strokeDashoffset: 0, opacity: 1, duration: 0.5, stagger: 0.03, ease: 'power2.inOut' }, 0.05)
    }

    // PHASE 2: INCOMING CONVERGING ENERGY SIGNALS (0.3s - 0.85s)
    if (pulseSvgRef.current) {
      const pulses = pulseSvgRef.current.querySelectorAll('.pcb-pulse')
      tl.to(pulses, { strokeDashoffset: 0, opacity: 1, duration: 0.55, stagger: 0.04, ease: 'power1.inOut' }, 0.3)
    }

    // PHASE 3 & 4: ENERGY COLLISION AT CENTRAL NODE (0.8s - 1.1s) — LOGO IS STILL 100% HIDDEN!
    tl.to(collisionSparkRef.current, {
      opacity: 1,
      scale: 1.6,
      duration: 0.25,
      ease: 'back.out(2)',
    }, 0.8)

    tl.to(collisionSparkRef.current, {
      opacity: 0,
      scale: 0.2,
      duration: 0.25,
      ease: 'power2.in',
    }, 1.05)

    // Clear incoming signal pulses BEFORE logo reveals
    if (pulseSvgRef.current) {
      tl.to(pulseSvgRef.current, { opacity: 0, duration: 0.2 }, 1.0)
    }

    // PHASE 5: EMBLEM ASSEMBLY FROM COLLISION ENERGY (1.1s - 1.65s) — Logo Group Revealed
    tl.to(logoGroupRef.current, { opacity: 1, duration: 0.1 }, 1.1)

    if (emblemEl) {
      const emblemPaths = emblemEl.querySelectorAll('.emblem-path')
      const orbitPath   = emblemEl.querySelector('.emblem-orbit')

      tl.to(emblemPaths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.015,
        ease: 'power2.out',
      }, 1.1)

      if (orbitPath) {
        tl.to(orbitPath, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
        }, 1.45)
      }
    }

    // PHASE 6: WORDMARK REVEAL LEFT → RIGHT (1.6s - 2.15s) — 100% Clean Typography
    letters.forEach((letterEl, index) => {
      if (letterEl) {
        tl.to(letterEl, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.35,
          ease: 'back.out(1.4)',
        }, 1.6 + index * 0.09)
      }
    })

    // Pause before transition
    tl.to({}, { duration: 0.35 }, 2.45)

    const safetyTimer = setTimeout(() => {
      finishAnimation()
    }, 2900)

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
      {/* ── PERIPHERAL PCB TRACES SVG (TERMINATES OUTSIDE LOGO BOUNDING BOX) ── */}
      <svg
        ref={pcbSvgRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top-Left Trace terminating at (240, 140) */}
        <path className="pcb-trace" d="M 40 40 H 200 V 140 H 240" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <circle className="pcb-trace" cx="240" cy="140" r="3.5" fill="#1E6B93" />

        {/* Top-Right Trace terminating at (360, 140) */}
        <path className="pcb-trace" d="M 560 40 H 400 V 140 H 360" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <circle className="pcb-trace" cx="360" cy="140" r="3.5" fill="#1E6B93" />

        {/* Left Side Upper Trace terminating at (150, 240) */}
        <path className="pcb-trace" d="M 20 240 H 150" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <circle className="pcb-trace" cx="150" cy="240" r="3.5" fill="#1E6B93" />

        {/* Left Side Lower Trace terminating at (150, 360) */}
        <path className="pcb-trace" d="M 20 360 H 150" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <circle className="pcb-trace" cx="150" cy="360" r="3.5" fill="#1E6B93" />

        {/* Right Side Upper Trace terminating at (450, 240) */}
        <path className="pcb-trace" d="M 580 240 H 450" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <circle className="pcb-trace" cx="450" cy="240" r="3.5" fill="#1E6B93" />

        {/* Right Side Lower Trace terminating at (450, 360) */}
        <path className="pcb-trace" d="M 580 360 H 450" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <circle className="pcb-trace" cx="450" cy="360" r="3.5" fill="#1E6B93" />

        {/* Bottom-Left Trace terminating at (240, 460) */}
        <path className="pcb-trace" d="M 40 560 H 200 V 460 H 240" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <circle className="pcb-trace" cx="240" cy="460" r="3.5" fill="#1E6B93" />

        {/* Bottom-Right Trace terminating at (360, 460) */}
        <path className="pcb-trace" d="M 560 560 H 400 V 460 H 360" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <circle className="pcb-trace" cx="360" cy="460" r="3.5" fill="#1E6B93" />
      </svg>

      {/* ── CONVERGING SIGNAL PULSES SVG (CONVERGES AT CENTRAL NODE (300, 140) BEFORE LOGO IS REVEALED) ── */}
      <svg
        ref={pulseSvgRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className="pcb-pulse" d="M 40 40 H 200 V 140 H 300" stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" />
        <path className="pcb-pulse" d="M 560 40 H 400 V 140 H 300" stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" />
        <path className="pcb-pulse" d="M 20 240 H 150 V 140 H 300" stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" />
        <path className="pcb-pulse" d="M 580 240 H 450 V 140 H 300" stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" />
      </svg>

      {/* ── PRECISE CENTRAL COLLISION SPARK NODE AT (300, 140) ABOVE EMBLEM ── */}
      <svg
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={collisionSparkRef} style={{ transformOrigin: '300px 140px' }}>
          <circle cx="300" cy="140" r="14" fill="url(#sparkGlow)" />
          <circle cx="300" cy="140" r="4" fill="#FFFFFF" />
        </g>
        <defs>
          <radialGradient id="sparkGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#32C5E8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1E6B93" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* ── CENTRAL ExESS IDENTITY CONTAINER (100% CLEAN & UNOBSTRUCTED) ── */}
      <div
        ref={logoGroupRef}
        className="relative z-10 flex flex-col items-center justify-center text-center p-4"
      >
        {/* Emblem Assembly */}
        <div
          className="filter drop-shadow-[0_0_16px_rgba(50,197,232,0.30)]"
          style={{ width: 'clamp(120px, 18vw, 150px)', height: 'clamp(130px, 20vw, 165px)' }}
        >
          <EmblemSVG svgRef={emblemSvgRef} />
        </div>

        {/* Wordmark Assembly — Progressive L→R Letter Reveal (100% CLEAN TEXT) */}
        <div className="mt-4 flex items-center justify-center gap-0.5">
          <h1
            className="font-brand font-bold text-light-sweep-dark tracking-tight flex"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 4.5rem)',
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
