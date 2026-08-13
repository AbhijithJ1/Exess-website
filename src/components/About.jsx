import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Compass } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ImagePlaceholder from './ImagePlaceholder'

gsap.registerPlugin(ScrollTrigger)

/**
 * About — "SIGNAL, NOT BLOCKS" (Rhythm-driven Pinned Sequence)
 *
 * Pacing & Architecture:
 *   Stage 1 — Pulse Only: Energy convergence burst at section anchor (~0.5s pause beat).
 *   Stage 2 — Oversized Word: Single word "ExESS" fills the viewport at massive scale.
 *   Stage 3 — Word Recedes: "ExESS" scales down into headline; full sentence clip-reveals.
 *   Stage 4 — Image as a Breath: Generous image hero beat with SVG frame draw & light scan pass.
 *   Stage 5 — Supporting Copy & Panels: Paragraphs + Mission/Vision schematic panels reveal.
 */

const About = () => {
  const wrapperRef = useRef(null)
  const pinContainerRef = useRef(null)

  // Stage element refs
  const burstRef = useRef(null)
  const bigWordRef = useRef(null)
  const headlineWrapRef = useRef(null)
  const headlineSubRef = useRef(null)
  const imageStageRef = useRef(null)
  const imageFrameSvgRef = useRef(null)
  const imageScanRef = useRef(null)
  const copyPanelRef = useRef(null)
  const missionPanelRef = useRef(null)
  const visionPanelRef = useRef(null)

  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const reducedMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(reducedMedia.matches)

    if (reducedMedia.matches) return

    const isMobile = window.innerWidth < 768
    const scrollDistance = isMobile ? '+=60%' : '+=90%'

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: pinContainerRef.current,
          start: 'top top',
          end: scrollDistance,
          scrub: 1,
          anticipatePin: 1,
          onRefresh: () => {
            // Recalculate ScrollTrigger positions after Lenis refresh
          }
        }
      })

      // Initial state setup for discrete timeline stages
      gsap.set(burstRef.current, { scale: 0, opacity: 0 })
      gsap.set(bigWordRef.current, { scale: isMobile ? 1.4 : 2.2, opacity: 0, filter: 'blur(16px)' })
      gsap.set(headlineWrapRef.current, { opacity: 0, y: 30 })
      gsap.set(headlineSubRef.current, { opacity: 0, y: 20 })
      gsap.set(imageStageRef.current, { opacity: 0, scale: 1.06, filter: 'blur(12px)', y: 40 })
      gsap.set(copyPanelRef.current, { opacity: 0, y: 30 })
      gsap.set(missionPanelRef.current, { opacity: 0, x: -30 })
      gsap.set(visionPanelRef.current, { opacity: 0, x: 30 })

      // ── STAGE 1: Pulse Only (Convergence burst at center anchor) ───────
      tl.addLabel('stage1')
        .to(burstRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        })
        .to(burstRef.current, {
          scale: 1.8,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in'
        })

      // ── STAGE 2: One Oversized Word ("ExESS" presence moment) ─────────
      tl.addLabel('stage2')
        .to(bigWordRef.current, {
          opacity: 1,
          scale: isMobile ? 1.2 : 1.6,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out'
        })
        .to({}, { duration: 0.5 }) // Controlled hold beat ("breathing room")

      // ── STAGE 3: Word Recedes into Real Headline Sentence ──────────────
      tl.addLabel('stage3')
        .to(bigWordRef.current, {
          scale: 1.0,
          y: -20,
          duration: 0.7,
          ease: 'power3.inOut'
        })
        .to(headlineWrapRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.4')
        .to(headlineSubRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.3')
        .to({}, { duration: 0.4 }) // Hold beat

      // ── STAGE 4: Image as a Breath (Full-bleed hero beat) ───────────────
      tl.addLabel('stage4')
        .to([headlineWrapRef.current, headlineSubRef.current, bigWordRef.current], {
          y: -40,
          opacity: 0.3,
          duration: 0.5,
          ease: 'power2.inOut'
        })
        .to(imageStageRef.current, {
          opacity: 1,
          scale: 1.0,
          filter: 'blur(0px)',
          y: 0,
          duration: 0.9,
          ease: 'power3.out'
        }, '-=0.3')
        .to(imageScanRef.current, {
          x: '200%',
          duration: 0.8,
          ease: 'power2.inOut'
        }, '-=0.5')
        .to({}, { duration: 0.6 }) // Pause beat (Image as a breath)

      // ── STAGE 5: Supporting Copy + Mission/Vision Panels ───────────────
      tl.addLabel('stage5')
        .to([headlineWrapRef.current, headlineSubRef.current, bigWordRef.current], {
          y: 0,
          opacity: 1,
          duration: 0.5
        })
        .to(imageStageRef.current, {
          scale: 0.98,
          duration: 0.5
        }, '-=0.5')
        .to(copyPanelRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out'
        })
        .to([missionPanelRef.current, visionPanelRef.current], {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        }, '-=0.3')

    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="circuits" ref={wrapperRef} className="relative bg-transparent">
      <div id="about" className="absolute -top-24" />

      {/* Pinned Container Wrapper */}
      <div
        ref={pinContainerRef}
        className="w-full min-h-[100svh] flex items-center justify-center py-8 sm:py-12 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">

          {/* ── STAGE 1: ANCHOR PULSE CONVERGENCE BURST ──────────────────── */}
          {!isReducedMotion && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div
                ref={burstRef}
                className="w-48 h-48 sm:w-80 sm:h-80 rounded-full bg-cyan-400/20 border-2 border-cyan-400 shadow-[0_0_80px_#32C5E8]"
              />
            </div>
          )}

          {/* ── STAGE 2 & 3: OVERSIZED WORD & HEADLINE SENTENCE ───────────── */}
          <div className="mb-12 text-center max-w-4xl mx-auto relative z-10">
            {/* Section Tagline */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-brand uppercase tracking-[0.24em] text-xs font-bold text-primary">
                ABOUT ExESS // 01
              </span>
            </div>

            {/* Standalone Oversized "Presence" Word */}
            <div className="relative min-h-[120px] sm:min-h-[180px] flex items-center justify-center">
              <h1
                ref={bigWordRef}
                className="font-brand font-black text-6xl sm:text-8xl lg:text-[10rem] tracking-tight text-primary leading-none select-none"
              >
                ExESS
              </h1>
            </div>

            {/* Full Headline Sentence */}
            <div ref={headlineWrapRef} className="mt-2">
              <h2 className="font-brand text-heading text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Pioneering Hardware &amp; Embedded Systems Excellence at College of Engineering Chengannur.
              </h2>
            </div>

            <p ref={headlineSubRef} className="font-inter text-slate-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
              Electronics Students Society (ExESS) is the official departmental forum at CEC. Our mission is to transform theoretical understanding into real-world hardware engineering mastery.
            </p>
          </div>

          {/* ── STAGE 4: IMAGE AS A BREATH (HERO BEAT) ───────────────────── */}
          <div ref={imageStageRef} className="max-w-4xl mx-auto mb-16 relative">
            <div className="relative rounded-none overflow-hidden border border-border/80 border-t-2 border-t-primary shadow-soft bg-white p-3 group">
              
              {/* Technical SVG Corner Frame Overlay */}
              <svg
                ref={imageFrameSvgRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                fill="none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path d="M 4 10 L 4 4 L 10 4" stroke="#32C5E8" strokeWidth="1.5" />
                <path d="M 90 4 L 96 4 L 96 10" stroke="#32C5E8" strokeWidth="1.5" />
                <path d="M 4 90 L 4 96 L 10 96" stroke="#32C5E8" strokeWidth="1.5" />
                <path d="M 90 96 L 96 96 L 96 90" stroke="#32C5E8" strokeWidth="1.5" />
              </svg>

              {/* Light Scan Pass Overlay */}
              <div
                ref={imageScanRef}
                className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none z-20 -translate-x-full"
              />

              <ImagePlaceholder
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80"
                alt="ExESS Electronics Lab Facilities"
                type="cover"
                aspectRatio="aspect-[16/9] sm:aspect-[21/9]"
                badge="LAB_FACILITIES_CAD"
                className="rounded-none"
              />
            </div>
          </div>

          {/* ── STAGE 5: SUPPORTING COPY + MISSION / VISION PANELS ─────────── */}
          <div ref={copyPanelRef} className="max-w-4xl mx-auto mb-12 text-center">
            <p className="font-inter text-slate-700 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              Throughout the academic calendar, ExESS organizes hands-on PCB fabrication bootcamps, synthesizable Verilog/FPGA workshops, national hackathons, and guest lecture series from silicon industry specialists.
            </p>
          </div>

          {/* Mission & Vision Schematic Panels */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* MISSION PANEL */}
            <div
              ref={missionPanelRef}
              className="relative p-6 sm:p-8 rounded-none border border-border/80 bg-white/90 shadow-soft backdrop-blur-sm flex flex-col justify-between"
              style={{ borderLeft: '4px solid #1E6B93' }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-brand uppercase tracking-[0.2em] text-primary font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    MISSION // 01
                  </span>
                </div>
                <h3 className="font-brand text-heading text-xl sm:text-2xl font-bold mb-3 tracking-tight">
                  OUR MISSION
                </h3>
                <p className="font-inter text-slate-700 text-xs sm:text-sm leading-relaxed">
                  Our mission is to strengthen students&apos; technical knowledge through workshops, technical talks, hands-on sessions, hackathons, competitions, PCB design activities, embedded systems learning, and industry-oriented skill development.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-gray-400">
                <span>SYSTEM_MISSION // CEC</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              </div>
            </div>

            {/* VISION PANEL */}
            <div
              ref={visionPanelRef}
              className="relative p-6 sm:p-8 rounded-none border border-border/80 bg-white/90 shadow-soft backdrop-blur-sm flex flex-col justify-between"
              style={{ borderRight: '4px solid #06b6d4' }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-brand uppercase tracking-[0.2em] text-cyan-600 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    VISION // 02
                  </span>
                </div>
                <h3 className="font-brand text-heading text-xl sm:text-2xl font-bold mb-3 tracking-tight">
                  OUR VISION
                </h3>
                <p className="font-inter text-slate-700 text-xs sm:text-sm leading-relaxed">
                  To serve as a benchmark student engineering body that nurtures inquisitive minds, inspires hardware innovation, and empowers electronics undergraduates to become competent, industry-ready technology leaders.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-gray-400">
                <span>SYSTEM_VISION // CEC</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default About
