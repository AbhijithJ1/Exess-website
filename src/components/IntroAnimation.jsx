import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * IntroAnimation — Final ExESS PCB → Energy Convergence → Logo Reveal
 *
 * MASTER CHOREOGRAPHY:
 * 1. PCB Circuit Setup (0.0s – 0.9s): Clean symmetrical PCB traces draw smoothly around center.
 * 2. All PCB Endpoints Activate (0.9s – 1.3s): All outer starting pads glow bright cyan simultaneously.
 * 3. Energy Travels Through Existing PCB Traces (1.3s – 2.1s): Energy pulses travel ONLY along actual PCB paths.
 * 4. Energy Reaches Inner Endpoints (2.1s – 2.5s): Inner terminal pads illuminate as power collection nodes.
 * 5. Central Convergence (2.5s – 3.0s): Energy from inner pads gathers into ONE refined cyan-white core at (300, 220).
 * 6. Logo Formation (3.0s – 4.0s): Core energy draws/powers emblem & ExESS wordmark L → R (E → x → E → S → S).
 * 7. Final State (4.0s – 4.7s): Energy settles; PCB circuit REMAINS PERMANENTLY VISIBLE around clean logo identity.
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
  const containerRef     = useRef(null)
  const pcbSvgRef        = useRef(null)
  const outerPadsRef     = useRef(null)
  const pulseGroupRef    = useRef(null)
  const socketPadsRef    = useRef(null)
  const centerCoreRef    = useRef(null)
  const logoGroupRef     = useRef(null)
  const emblemWrapperRef = useRef(null)
  const emblemSvgRef     = useRef(null)
  const lettersRef       = useRef([])
  const hasFinishedRef   = useRef(false)

  const finishAnimation = () => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true
    if (containerRef.current) {
      containerRef.current.style.transition = 'opacity 0.45s ease-out'
      containerRef.current.style.opacity = '0'
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 440)
    } else if (onComplete) {
      onComplete()
    }
  }

  useEffect(() => {
    // Accessibility: Reduced Motion Check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      finishAnimation()
      return
    }

    const letters = lettersRef.current
    gsap.set(containerRef.current, { opacity: 1 })

    // Hide Logo Group & Energy Core Initially
    gsap.set(logoGroupRef.current, { opacity: 0 })
    gsap.set(centerCoreRef.current, { opacity: 0, scale: 0 })
    gsap.set(emblemWrapperRef.current, { filter: 'drop-shadow(0 0 0px transparent)' })

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

    // Setup Outer PCB Traces & Signal Pulses (PCB Geometry Remains Stable Throughout)
    let traceLens = []
    if (pcbSvgRef.current) {
      const traces = pcbSvgRef.current.querySelectorAll('.pcb-trace')
      traces.forEach((el) => {
        const len = (() => { try { return el.getTotalLength() } catch { return 400 } })()
        traceLens.push(len)
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.85 })
      })
    }

    if (pulseGroupRef.current) {
      const pulses = pulseGroupRef.current.querySelectorAll('.pulse-beam')
      pulses.forEach((el, idx) => {
        const len = traceLens[idx] || 400
        gsap.set(el, { strokeDasharray: `45 ${len}`, strokeDashoffset: len, opacity: 0 })
      })
    }

    // Setup Outer Starting Pads & Inner Socket Pads
    if (outerPadsRef.current) {
      const pads = outerPadsRef.current.querySelectorAll('.outer-pad')
      pads.forEach(p => gsap.set(p, { scale: 0.8, fill: '#1E6B93', opacity: 0.35 }))
    }

    if (socketPadsRef.current) {
      const pads = socketPadsRef.current.querySelectorAll('.socket-pad')
      pads.forEach(p => gsap.set(p, { scale: 0.8, fill: '#1E6B93', opacity: 0.35 }))
    }

    // Setup Wordmark Letters
    letters.forEach(letterEl => {
      if (letterEl) {
        gsap.set(letterEl, { opacity: 0, filter: 'blur(0px)' })
      }
    })

    // ── MASTER CHOREOGRAPHY TIMELINE (~4.5s TOTAL) ─────────
    const tl = gsap.timeline({
      onComplete: finishAnimation,
    })

    // STEP 1: PCB STRUCTURE SETUP (0.0s – 0.9s)
    if (pcbSvgRef.current) {
      const traces = pcbSvgRef.current.querySelectorAll('.pcb-trace')
      tl.to(traces, { strokeDashoffset: 0, opacity: 1, duration: 0.85, stagger: 0.03, ease: 'power2.inOut' }, 0.05)
    }

    // STEP 2: ALL PCB STARTING ENDPOINTS ACTIVATE SIMULTANEOUSLY (0.9s – 1.3s)
    if (outerPadsRef.current) {
      const pads = outerPadsRef.current.querySelectorAll('.outer-pad')
      tl.to(pads, { fill: '#32C5E8', opacity: 1, scale: 1.3, duration: 0.35, ease: 'power1.out' }, 0.90)
    }

    // STEP 3: ENERGY TRAVELS THROUGH EXISTING PCB TRACES ONLY (1.3s – 2.1s)
    if (pulseGroupRef.current) {
      const pulses = pulseGroupRef.current.querySelectorAll('.pulse-beam')
      pulses.forEach((el) => {
        tl.to(el, { strokeDashoffset: 0, opacity: 1, duration: 0.75, ease: 'power2.inOut' }, 1.30)
      })
    }

    // STEP 4: ENERGY REACHES INNER ENDPOINTS & ILLUMINATES COLLECTION NODES (2.1s – 2.5s)
    if (socketPadsRef.current) {
      const pads = socketPadsRef.current.querySelectorAll('.socket-pad')
      tl.to(pads, { fill: '#32C5E8', opacity: 1, scale: 1.4, duration: 0.35, ease: 'power1.out' }, 2.10)
    }

    if (pulseGroupRef.current) {
      const pulses = pulseGroupRef.current.querySelectorAll('.pulse-beam')
      tl.to(pulses, { opacity: 0, duration: 0.25 }, 2.20)
    }

    // STEP 5: CENTRAL CONVERGENCE — ONE REFINED CYAN-WHITE CORE FORMS AT CENTER (2.5s – 3.0s)
    tl.to(centerCoreRef.current, { opacity: 1, scale: 1.6, duration: 0.45, ease: 'power2.out' }, 2.50)

    // STEP 6: LOGO FORMATION FROM CENTRAL CORE (3.0s – 4.0s)
    tl.to(logoGroupRef.current, { opacity: 1, duration: 0.12 }, 3.00)

    tl.to(emblemWrapperRef.current, {
      filter: 'drop-shadow(0 0 16px rgba(50,197,232,0.80))',
      duration: 0.25,
      ease: 'power1.out',
    }, 3.00)

    if (emblemEl) {
      const emblemPaths = emblemEl.querySelectorAll('.emblem-path')
      const nodePaths   = emblemEl.querySelectorAll('.node-path')
      const nodeFills   = emblemEl.querySelectorAll('.node-fill')

      tl.to(emblemPaths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.04,
        ease: 'power2.out',
      }, 3.02)

      tl.to(nodePaths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.30,
        stagger: 0.02,
        ease: 'power2.out',
      }, 3.20)

      tl.to(nodeFills, { opacity: 1, duration: 0.20, stagger: 0.01 }, 3.35)
    }

    // ExESS wordmark progressive L->R reveal (E -> x -> E -> S -> S) (3.4s - 4.0s)
    letters.forEach((letterEl, index) => {
      if (letterEl) {
        tl.to(letterEl, {
          opacity: 1,
          duration: 0.12,
          ease: 'power1.out',
        }, 3.40 + index * 0.11)
      }
    })

    // Central core gently absorbs into emblem as logo completes
    tl.to(centerCoreRef.current, { opacity: 0, scale: 0.2, duration: 0.35 }, 3.10)

    // STEP 7: FINAL STATE — PCB CIRCUIT REMAINS PERMANENTLY VISIBLE AROUND LOGO (4.0s – 4.7s)
    tl.to(emblemWrapperRef.current, {
      filter: 'drop-shadow(0 0 6px rgba(50,197,232,0.15))',
      duration: 0.40,
      ease: 'power2.out',
    }, 4.00)

    if (socketPadsRef.current) {
      const pads = socketPadsRef.current.querySelectorAll('.socket-pad')
      tl.to(pads, { fill: '#1E6B93', opacity: 0.45, scale: 1.0, duration: 0.40 }, 4.00)
    }

    if (outerPadsRef.current) {
      const pads = outerPadsRef.current.querySelectorAll('.outer-pad')
      tl.to(pads, { fill: '#1E6B93', opacity: 0.45, scale: 1.0, duration: 0.40 }, 4.00)
    }

    // Hold final stable state with permanent PCB frame for user recognition
    tl.to({}, { duration: 0.60 }, 4.10)

    const safetyTimer = setTimeout(() => {
      finishAnimation()
    }, 5200)

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
      {/* ── PCB MOTHERBOARD TRACES SVG (REMAINS PERMANENTLY VISIBLE IN FINAL STATE) ── */}
      <svg
        ref={pcbSvgRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Symmetrical Outer PCB Framing Traces */}
        <path className="pcb-trace" d="M 40 40 H 180 V 120 H 175" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 560 40 H 420 V 120 H 425" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />

        {/* Symmetrical Inward-Routing Middle PCB Signal Traces */}
        <path className="pcb-trace" d="M 20 260 H 130 V 270 H 175" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 20 340 H 130 V 330 H 175" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />

        <path className="pcb-trace" d="M 580 260 H 470 V 270 H 425" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 580 340 H 470 V 320 H 425" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />

        {/* Symmetrical Bottom Framing Traces */}
        <path className="pcb-trace" d="M 40 560 H 180 V 480 H 175" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <path className="pcb-trace" d="M 560 560 H 420 V 480 H 425" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />

        {/* Framing Corner Accents */}
        <path className="pcb-trace" d="M 130 160 V 130 H 175" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
        <path className="pcb-trace" d="M 470 160 V 130 H 425" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
        <path className="pcb-trace" d="M 130 440 V 470 H 175" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
        <path className="pcb-trace" d="M 470 440 V 470 H 425" stroke="rgba(30,107,147,0.4)" strokeWidth="1.5" />
      </svg>

      {/* ── OUTER STARTING ENDPOINTS (GLOW CYAN SIMULTANEOUSLY IN STEP 2) ── */}
      <svg
        ref={outerPadsRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className="outer-pad" cx="40" cy="40" r="4" />
        <circle className="outer-pad" cx="560" cy="40" r="4" />
        <circle className="outer-pad" cx="20" cy="260" r="4" />
        <circle className="outer-pad" cx="20" cy="340" r="4" />
        <circle className="outer-pad" cx="580" cy="260" r="4" />
        <circle className="outer-pad" cx="580" cy="340" r="4" />
        <circle className="outer-pad" cx="40" cy="560" r="4" />
        <circle className="outer-pad" cx="560" cy="560" r="4" />
      </svg>

      {/* ── SYNCHRONIZED ENERGY PULSE BEAMS TRAVELLING ONLY ALONG EXISTING PCB TRACES (STEP 3) ── */}
      <svg
        ref={pulseGroupRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className="pulse-beam" d="M 40 40 H 180 V 120 H 175" stroke="#32C5E8" strokeWidth="2.4" strokeLinecap="round" />
        <path className="pulse-beam" d="M 560 40 H 420 V 120 H 425" stroke="#32C5E8" strokeWidth="2.4" strokeLinecap="round" />
        <path className="pulse-beam" d="M 20 260 H 130 V 270 H 175" stroke="#32C5E8" strokeWidth="2.4" strokeLinecap="round" />
        <path className="pulse-beam" d="M 20 340 H 130 V 330 H 175" stroke="#32C5E8" strokeWidth="2.4" strokeLinecap="round" />
        <path className="pulse-beam" d="M 580 260 H 470 V 270 H 425" stroke="#32C5E8" strokeWidth="2.4" strokeLinecap="round" />
        <path className="pulse-beam" d="M 580 340 H 470 V 320 H 425" stroke="#32C5E8" strokeWidth="2.4" strokeLinecap="round" />
        <path className="pulse-beam" d="M 40 560 H 180 V 480 H 175" stroke="#32C5E8" strokeWidth="2.4" strokeLinecap="round" />
        <path className="pulse-beam" d="M 560 560 H 420 V 480 H 425" stroke="#32C5E8" strokeWidth="2.4" strokeLinecap="round" />
      </svg>

      {/* ── TERMINAL SOCKET PADS GROUP (STEP 4: INNER ENDPOINTS LIGHT UP) ── */}
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

      {/* ── ONE REFINED CENTRAL ENERGY CORE AT (300, 220) (STEP 5) ── */}
      <svg
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={centerCoreRef} style={{ transformOrigin: '300px 220px' }}>
          <circle cx="300" cy="220" r="16" fill="url(#coreGlow)" />
          <circle cx="300" cy="220" r="4.5" fill="#FFFFFF" />
        </g>

        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#32C5E8" stopOpacity="1" />
            <stop offset="100%" stopColor="#1E6B93" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* ── CENTRAL ExESS IDENTITY CORE (STEP 6 & 7) ── */}
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
