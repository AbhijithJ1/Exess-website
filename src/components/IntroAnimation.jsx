import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * IntroAnimation — Premium 2.8s Technology Brand Identity Reveal Sequence
 *
 * RHYTHM & PACING CHOREOGRAPHY:
 * • PCB Formation (0.0s – 0.85s): Controlled stroke drawing of motherboard traces (~0.85s)
 * • Breathing Pause (0.85s – 1.03s): Intentional 180ms hold
 * • Particle Appears (1.03s – 1.10s): Single energy particle spawns in upper PCB gap (300, 40)
 * • Energy Travel (1.10s – 1.50s): Straight vertical downward travel (~400ms) with smooth ease-in-out
 * • Impact (1.50s – 1.63s): Particle hits emblem center (300, 220) & vanishes; 130ms energy flash
 * • Emblem Activation (1.63s – 2.00s): Emblem globe lines & orbit illuminate (~370ms)
 * • Wordmark Formation (2.00s – 2.65s): Letters E → x → E → S → S reveal progressively (~120ms/letter)
 * • Final Settle (2.65s – 2.95s): Cyan highlight gently fades into dark-blue #1E6B93 logo (~300ms)
 * • Preloader Exit (2.95s – 3.30s): Smooth unmount into main website
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
      containerRef.current.style.transition = 'opacity 0.35s ease-out'
      containerRef.current.style.opacity = '0'
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 340)
    } else if (onComplete) {
      onComplete()
    }
  }

  useEffect(() => {
    // Respect Reduced Motion Accessibility Preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      finishAnimation()
      return
    }

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

    // Setup Outer PCB Motherboard Traces
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
        gsap.set(letterEl, { opacity: 0, y: 0, filter: 'blur(0px)' })
      }
    })

    // Setup Socket Terminal Pads
    if (socketPadsRef.current) {
      const pads = socketPadsRef.current.querySelectorAll('.socket-pad')
      pads.forEach(p => gsap.set(p, { scale: 1, fill: '#1E6B93', opacity: 0.4 }))
    }

    // ── MASTER 2.8s PREMIUM CINEMATIC TIMELINE ─────────
    const tl = gsap.timeline({
      onComplete: finishAnimation,
    })

    // STEP 1: PCB TRACE FORMATION (~0.85s) (0.0s - 0.85s)
    if (pcbSvgRef.current) {
      const traces = pcbSvgRef.current.querySelectorAll('.pcb-trace')
      tl.to(traces, { strokeDashoffset: 0, opacity: 1, duration: 0.80, stagger: 0.04, ease: 'power2.inOut' }, 0.05)
    }

    // STEP 2: BREATHING PAUSE (~0.18s) (0.85s - 1.03s)
    tl.to({}, { duration: 0.18 }, 0.85)

    // STEP 3: SINGLE PARTICLE SPAWNS IN OPEN GAP BETWEEN UPPER PCB TRACES (300, 40) (1.03s - 1.10s)
    tl.to(pulseSparkRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.07,
      ease: 'power1.out',
    }, 1.03)

    // STEP 4: PERFECT STRAIGHT VERTICAL DOWNWARD TRAVEL (~0.40s) (1.10s - 1.50s)
    tl.to(pulseSparkRef.current, {
      y: 180,
      duration: 0.40,
      ease: 'power2.inOut',
    }, 1.10)

    // STEP 5: DIRECT IMPACT AT (300, 220) & PARTICLE VANISHES (~0.13s) (1.50s - 1.63s)
    tl.to(pulseSparkRef.current, { opacity: 0, scale: 0.1, duration: 0.06 }, 1.50)
    tl.to(logoGroupRef.current, { opacity: 1, duration: 0.10 }, 1.50)

    // Refined energy impact highlight
    tl.to(emblemWrapperRef.current, {
      filter: 'drop-shadow(0 0 14px rgba(50,197,232,0.70))',
      duration: 0.13,
      ease: 'power1.out',
    }, 1.50)

    // STEP 6: EMBLEM GLOBE LINES & ORBIT ACTIVATION (~0.37s) (1.63s - 2.00s)
    if (emblemEl) {
      const emblemPaths = emblemEl.querySelectorAll('.emblem-path')
      tl.to(emblemPaths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.03,
        ease: 'power2.out',
      }, 1.63)
    }

    // Connected electronic nodes activate
    if (emblemEl) {
      const nodePaths = emblemEl.querySelectorAll('.node-path')
      const nodeFills = emblemEl.querySelectorAll('.node-fill')

      tl.to(nodePaths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.25,
        stagger: 0.02,
        ease: 'power2.out',
      }, 1.83)

      tl.to(nodeFills, {
        opacity: 1,
        duration: 0.15,
        stagger: 0.01,
        ease: 'power1.out',
      }, 1.93)
    }

    // STEP 7: EXESS WORDMARK FORMS PROGRESSIVELY L → R (E → x → E → S → S) (~0.65s) (2.00s - 2.65s)
    letters.forEach((letterEl, index) => {
      if (letterEl) {
        tl.to(letterEl, {
          opacity: 1,
          duration: 0.12,
          ease: 'power1.out',
        }, 2.00 + index * 0.12)
      }
    })

    // STEP 8: FINAL LOGO SETTLE INTO CRISP EXESS DARK BLUE IDENTITY (~0.30s) (2.65s - 2.95s)
    tl.to(emblemWrapperRef.current, {
      filter: 'drop-shadow(0 0 6px rgba(50,197,232,0.12))',
      duration: 0.30,
      ease: 'power2.out',
    }, 2.65)

    // Brief hold before seamless preloader exit (2.95s - 3.30s)
    tl.to({}, { duration: 0.35 }, 2.95)

    const safetyTimer = setTimeout(() => {
      finishAnimation()
    }, 3600)

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
      {/* ── PCB MOTHERBOARD TRACES SVG (LIGHTWEIGHT STROKE ANIMATION) ── */}
      <svg
        ref={pcbSvgRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Symmetrical Outer PCB Framing Traces (Strict Logo Safe Zone x:175..425) */}
        <path className="pcb-trace" d="M 40 40 H 180 V 120 H 175" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 560 40 H 420 V 120 H 425" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />

        {/* Symmetrical Inward-Routing Middle PCB Signal Traces */}
        <path className="pcb-trace" d="M 20 260 H 130 V 270 H 175" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 20 340 H 130 V 330 H 175" stroke="rgba(50,197,232,0.65)" strokeWidth="1.8" strokeLinecap="square" />

        <path className="pcb-trace" d="M 580 260 H 470 V 270 H 425" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 580 340 H 470 V 320 H 425" stroke="rgba(50,197,232,0.65)" strokeWidth="1.8" strokeLinecap="square" />

        {/* Symmetrical Bottom Framing Traces */}
        <path className="pcb-trace" d="M 40 560 H 180 V 480 H 175" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 560 560 H 420 V 480 H 425" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />

        {/* Framing Corner Accents */}
        <path className="pcb-trace" d="M 130 160 V 130 H 175" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
        <path className="pcb-trace" d="M 470 160 V 130 H 425" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
        <path className="pcb-trace" d="M 130 440 V 470 H 175" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
        <path className="pcb-trace" d="M 470 440 V 470 H 425" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
      </svg>

      {/* ── TERMINAL SOCKET PADS GROUP (BALANCED BILATERAL LAYOUT) ── */}
      <svg
        ref={socketPadsRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className="socket-pad" cx="175" cy="120" r="3.5" />
        <circle className="socket-pad" cx="425" cy="120" r="3.5" />
        <circle className="socket-pad" cx="175" cy="270" r="3.5" />
        <circle className="socket-pad" cx="175" cy="330" r="3.5" />
        <circle className="socket-pad" cx="425" cy="270" r="3.5" />
        <circle className="socket-pad" cx="425" cy="330" r="3.5" />
        <circle className="socket-pad" cx="175" cy="480" r="3.5" />
        <circle className="socket-pad" cx="425" cy="480" r="3.5" />
      </svg>

      {/* ── ENERGY PARTICLE — ORIGINATES FROM OPEN GAP BETWEEN UPPER PCB TRACES (300, 40) ── */}
      <svg
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lightweight Single Energy Particle Spark Node */}
        <g ref={pulseSparkRef} style={{ transformOrigin: '300px 40px' }}>
          <circle cx="300" cy="40" r="7" fill="url(#sparkGlow)" />
          <circle cx="300" cy="40" r="2.5" fill="#FFFFFF" />
        </g>

        <defs>
          <radialGradient id="sparkGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#32C5E8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1E6B93" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* ── CENTRAL ExESS IDENTITY CORE ── */}
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

        {/* Wordmark Assembly — Progressive L→R Letter Reveal */}
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
