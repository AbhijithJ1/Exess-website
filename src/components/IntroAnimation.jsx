import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * IntroAnimation — Electronic Circuit Powering On (Motherboard Architecture)
 *
 * Symmetrical Motherboard IC Composition:
 * - ExESS Globe Logo & EXESS Typography are mounted inside ONE central IC Package frame.
 * - Symmetrical 90° PCB motherboard traces surround the frame on all 4 sides with equal spacing.
 * - Sequence:
 *   Power On -> Traces draw -> Signal pulse travels to motherboard core ->
 *   Core energizes -> Logo draws -> EXESS text appears with metallic light sweep ->
 *   Signal exits downward into Hero -> Seamless transition.
 */

const LogoSVG = ({ svgRef }) => (
  <svg
    ref={svgRef}
    viewBox="0 0 200 210"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* Globe outer circle */}
    <circle cx="100" cy="85" r="50" stroke="#1E6B93" strokeWidth="3" />

    {/* Latitude ellipses */}
    <ellipse cx="100" cy="85" rx="50" ry="15" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />
    <ellipse cx="100" cy="85" rx="50" ry="30" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />
    <ellipse cx="100" cy="85" rx="50" ry="43" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />

    {/* Longitude lines */}
    <line x1="100" y1="35" x2="100" y2="135" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />
    <line x1="70"  y1="48" x2="70"  y2="122" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />
    <line x1="130" y1="48" x2="130" y2="122" stroke="#1E6B93" strokeWidth="1.5" opacity="0.7" />
    <line x1="50"  y1="68" x2="50"  y2="102" stroke="#1E6B93" strokeWidth="1"   opacity="0.5" />
    <line x1="150" y1="68" x2="150" y2="102" stroke="#1E6B93" strokeWidth="1"   opacity="0.5" />

    {/* Orbit ellipse */}
    <ellipse
      className="orbit"
      cx="100" cy="85" rx="64" ry="19"
      stroke="#32C5E8" strokeWidth="2.5"
      transform="rotate(-12 100 85)"
    />

    {/* PCB circuit traces below globe */}
    <path d="M75 135 L70 155 L55 155 L55 175"   stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M90 135 L90 160 L75 160 L75 185"   stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M110 135 L110 155 L125 155 L125 175" stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M125 135 L130 160 L145 160 L145 185" stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M100 135 L100 165"                  stroke="#1E6B93" strokeWidth="2.5" strokeLinecap="round" />

    {/* Terminal pads */}
    <rect x="48"  y="173" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" />
    <rect x="68"  y="183" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" />
    <rect x="92"  y="168" width="16" height="16" rx="2.5" stroke="#1E6B93" strokeWidth="2" />
    <rect x="118" y="183" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" />
    <rect x="138" y="173" width="14" height="14" rx="2.5" stroke="#1E6B93" strokeWidth="2" />

    {/* Pad fills */}
    <rect x="53"  y="178" width="4" height="4" rx="1" fill="#1E6B93" />
    <rect x="73"  y="188" width="4" height="4" rx="1" fill="#1E6B93" />
    <rect x="98"  y="174" width="4" height="4" rx="1" fill="#1E6B93" />
    <rect x="123" y="188" width="4" height="4" rx="1" fill="#1E6B93" />
    <rect x="143" y="178" width="4" height="4" rx="1" fill="#1E6B93" />
  </svg>
)

const IntroAnimation = ({ onComplete }) => {
  const containerRef   = useRef(null)
  const pcbSvgRef      = useRef(null)
  const pulseSvgRef    = useRef(null)
  const logoSvgRef     = useRef(null)
  const logoBoxRef     = useRef(null)
  const wordRef        = useRef(null)
  const exitPulseRef   = useRef(null)
  const hasFinishedRef = useRef(false)

  const finishAnimation = () => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true
    if (containerRef.current) {
      containerRef.current.style.transition = 'opacity 0.45s ease-in-out'
      containerRef.current.style.opacity = '0'
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 400)
    } else if (onComplete) {
      onComplete()
    }
  }

  useEffect(() => {
    gsap.set(containerRef.current, { opacity: 1 })
    gsap.set(logoBoxRef.current,   { scale: 0, opacity: 0 })
    gsap.set(wordRef.current,      { opacity: 0, y: 14, filter: 'blur(8px)' })
    gsap.set(exitPulseRef.current, { opacity: 0, strokeDashoffset: 400 })

    const logoEl = logoSvgRef.current
    if (logoEl) {
      const allStrokes = logoEl.querySelectorAll('circle, ellipse, line, path, rect')
      const orbits     = logoEl.querySelectorAll('.orbit')

      allStrokes.forEach(el => {
        const len = (() => { try { return el.getTotalLength() } catch { return 200 } })()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
      })
      orbits.forEach(el => gsap.set(el, { opacity: 0 }))
    }

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

    // Master Story Timeline
    const tl = gsap.timeline({
      onComplete: finishAnimation,
    })

    // Step 1: Motherboard PCB traces draw from edges toward central frame (0.1s - 0.7s)
    if (pcbSvgRef.current) {
      const traces = pcbSvgRef.current.querySelectorAll('.pcb-trace')
      tl.to(traces,
        { strokeDashoffset: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: 'power2.inOut' },
        0.1
      )
    }

    // Step 2: Signal pulse travels through motherboard traces (0.45s - 0.9s)
    if (pulseSvgRef.current) {
      const pulses = pulseSvgRef.current.querySelectorAll('.pcb-pulse')
      tl.to(pulses,
        { strokeDashoffset: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power1.inOut' },
        0.45
      )
    }

    // Step 3: Central Motherboard Frame & Core Logo Stroke Draw (0.75s - 1.4s)
    tl.to(logoBoxRef.current,
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' },
      0.75
    )

    if (logoEl) {
      const nonOrbit = logoEl.querySelectorAll('circle:not(.orbit), ellipse:not(.orbit), line, path, rect')
      tl.to(nonOrbit,
        { strokeDashoffset: 0, opacity: 1, duration: 0.6, stagger: 0.018, ease: 'power2.out' },
        0.95
      )
    }

    // Step 4: Orbit ellipse sweeps around logo (1.45s - 1.85s)
    if (logoEl) {
      const orbit = logoEl.querySelector('.orbit')
      if (orbit) {
        const orbitLen = (() => { try { return orbit.getTotalLength() } catch { return 450 } })()
        gsap.set(orbit, { strokeDasharray: orbitLen, strokeDashoffset: orbitLen })
        tl.to(orbit,
          { strokeDashoffset: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
          1.45
        )
      }
    }

    // Step 5: EXESS text reveals inside the motherboard frame directly beneath logo (1.65s - 2.05s)
    tl.to(wordRef.current,
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' },
      1.65
    )

    // Step 6: Downward exit pulse flows out of motherboard into Hero (2.0s - 2.4s)
    if (exitPulseRef.current) {
      tl.to(exitPulseRef.current,
        { strokeDashoffset: 0, opacity: 1, duration: 0.45, ease: 'power2.in' },
        2.0
      )
    }

    tl.to({}, { duration: 0.25 }, 2.35)

    // Native safety fallback timer
    const safetyTimer = setTimeout(() => {
      finishAnimation()
    }, 2700)

    return () => {
      clearTimeout(safetyTimer)
      tl.kill()
    }
  }, [])

  const SVG_SIZE = 'min(90vw, 560px)'

  return (
    <div
      ref={containerRef}
      onClick={finishAnimation}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden select-none cursor-pointer bg-white"
    >
      {/* Symmetrical Motherboard 90° PCB Routing SVG */}
      <svg
        ref={pcbSvgRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 560 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Horizontal Left Bus Lines */}
        <path className="pcb-trace" d="M 20 190 H 160 V 210 H 200" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <circle className="pcb-trace" cx="160" cy="190" r="3.5" fill="#1E6B93" strokeDasharray="30" />

        <path className="pcb-trace" d="M 20 370 H 160 V 350 H 200" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <circle className="pcb-trace" cx="160" cy="370" r="3.5" fill="#1E6B93" strokeDasharray="30" />

        {/* Horizontal Right Bus Lines */}
        <path className="pcb-trace" d="M 540 190 H 400 V 210 H 360" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <circle className="pcb-trace" cx="400" cy="190" r="3.5" fill="#1E6B93" strokeDasharray="30" />

        <path className="pcb-trace" d="M 540 370 H 400 V 350 H 360" stroke="#1E6B93" strokeWidth="1.8" strokeLinecap="square" />
        <circle className="pcb-trace" cx="400" cy="370" r="3.5" fill="#1E6B93" strokeDasharray="30" />

        {/* Vertical Top Bus Lines */}
        <path className="pcb-trace" d="M 200 20 V 160 H 220 V 200" stroke="#32C5E8" strokeWidth="2" strokeLinecap="square" />
        <circle className="pcb-trace" cx="200" cy="160" r="3.5" fill="#32C5E8" strokeDasharray="30" />

        <path className="pcb-trace" d="M 360 20 V 160 H 340 V 200" stroke="#32C5E8" strokeWidth="2" strokeLinecap="square" />
        <circle className="pcb-trace" cx="360" cy="160" r="3.5" fill="#32C5E8" strokeDasharray="30" />

        {/* Vertical Bottom Bus Lines */}
        <path className="pcb-trace" d="M 280 380 V 540" stroke="#1E6B93" strokeWidth="2.2" strokeLinecap="square" />
        <path className="pcb-trace" d="M 200 540 V 400 H 220 V 360" stroke="#32C5E8" strokeWidth="2" strokeLinecap="square" />
        <circle className="pcb-trace" cx="200" cy="400" r="3.5" fill="#32C5E8" strokeDasharray="30" />

        <path className="pcb-trace" d="M 360 540 V 400 H 340 V 360" stroke="#32C5E8" strokeWidth="2" strokeLinecap="square" />
        <circle className="pcb-trace" cx="360" cy="400" r="3.5" fill="#32C5E8" strokeDasharray="30" />

        {/* Motherboard Central Frame Boundary (Encloses BOTH Logo & EXESS Typography) */}
        <rect
          className="pcb-trace"
          x="160" y="140" width="240" height="280" rx="14"
          stroke="rgba(30,107,147,0.30)" strokeWidth="1.6" strokeDasharray="6 4"
        />
        <rect className="pcb-trace" x="160" y="140" width="8" height="8" rx="1" fill="#1E6B93" strokeDasharray="30" />
        <rect className="pcb-trace" x="392" y="140" width="8" height="8" rx="1" fill="#1E6B93" strokeDasharray="30" />
        <rect className="pcb-trace" x="160" y="412" width="8" height="8" rx="1" fill="#1E6B93" strokeDasharray="30" />
        <rect className="pcb-trace" x="392" y="412" width="8" height="8" rx="1" fill="#1E6B93" strokeDasharray="30" />
      </svg>

      {/* Electrical Signal Pulse SVG */}
      <svg
        ref={pulseSvgRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
        viewBox="0 0 560 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className="pcb-pulse" d="M 20 190 H 160 V 210 H 200" stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 4px rgba(50,197,232,0.8))' }} />
        <path className="pcb-pulse" d="M 540 190 H 400 V 210 H 360" stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 4px rgba(50,197,232,0.8))' }} />
        <path className="pcb-pulse" d="M 200 20 V 160 H 220 V 200" stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 4px rgba(50,197,232,0.8))' }} />
        <path className="pcb-pulse" d="M 360 20 V 160 H 340 V 200" stroke="#32C5E8" strokeWidth="3" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 4px rgba(50,197,232,0.8))' }} />

        {/* Downward Exit Signal Traveling into Hero */}
        <path
          ref={exitPulseRef}
          d="M 280 380 V 540"
          stroke="#32C5E8"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="400"
          style={{ filter: 'drop-shadow(0 0 6px #32C5E8)' }}
        />
      </svg>

      {/* Motherboard Core Package: Logo & EXESS Typography Mounted Centered Inside Frame */}
      <div
        ref={logoBoxRef}
        className="relative z-10 flex flex-col items-center justify-center text-center p-8 bg-white/90 rounded-3xl border border-primary/10 shadow-sm"
        style={{ transformOrigin: 'center center', width: 'clamp(210px, 32vw, 260px)' }}
      >
        {/* Core Processor Logo */}
        <div style={{ width: 'clamp(110px, 16vw, 135px)', height: 'clamp(120px, 18vw, 150px)' }}>
          <LogoSVG svgRef={logoSvgRef} />
        </div>

        {/* EXESS Typography Directly Below Logo inside Motherboard Frame */}
        <div className="mt-3 text-center">
          <h2
            ref={wordRef}
            className="font-grotesk font-black text-light-sweep-dark tracking-tight"
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.2rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
            }}
          >
            EXESS
          </h2>
        </div>
      </div>

      {/* Click to skip hint */}
      <div className="absolute bottom-6 right-8 text-[11px] font-mono text-slate-400 uppercase tracking-widest pointer-events-none opacity-50">
        Click to skip &rarr;
      </div>
    </div>
  )
}

export default IntroAnimation
