import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * About — Refined Compact Editorial Layout & Graduated Typographic Hierarchy
 *
 * Visual Hierarchy & Scale:
 *   - Hero EXESS Headline: clamp(3.2rem, 14vw, 11rem)  [#1 Largest]
 *   - About ABOUT US Headline: clamp(2.4rem, 6.8vw, 5.2rem) [#2 Medium-Large]
 *   - Section Subheadings: clamp(1.8rem, 5vw, 3.8rem) [#3 Standard]
 *
 * Sequence Choreography:
 *   1. "ABOUT US" enters with matrix ASCII scramble (01 10 // <> [] {} = + *).
 *   2. Slow contraction & crisp resolution into section heading position.
 *   3. Compact content resolves naturally from TOP (y: -16px -> 0, blur -> sharp).
 *   4. Restrained vertical spacing ensures a fast, compact, ultra-premium experience.
 */

const TARGET_TEXT = 'ABOUT US'
const ASCII_NOISE = ['0', '1', '/', '<', '>', '{', '}', '=', '+', '*', '#', '%']

const About = () => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { amount: 0.25, once: false })
  
  const [displayText, setDisplayText] = useState(TARGET_TEXT.split(''))
  const [animStage, setAnimStage] = useState(0) // 0: Idle, 1: Massive ASCII, 2: Resolved Text, 3: Content Settled

  useEffect(() => {
    if (!isInView) {
      setAnimStage(0)
      setDisplayText(TARGET_TEXT.split(''))
      return
    }

    // Stage 1: Typographic Entrance with ASCII Matrix Scramble
    setAnimStage(1)
    
    let frame = 0
    const totalFrames = 16
    const interval = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      
      setDisplayText(
        TARGET_TEXT.split('').map((char, idx) => {
          if (char === ' ') return ' '
          if (idx / TARGET_TEXT.length < progress) {
            return char
          }
          return ASCII_NOISE[Math.floor(Math.random() * ASCII_NOISE.length)]
        })
      )

      if (frame >= totalFrames) {
        clearInterval(interval)
        setDisplayText(TARGET_TEXT.split(''))
        setAnimStage(2)
      }
    }, 40)

    const tContent = setTimeout(() => {
      setAnimStage(3)
    }, 950)

    return () => {
      clearInterval(interval)
      clearTimeout(tContent)
    }
  }, [isInView])

  return (
    <section
      ref={containerRef}
      id="circuits"
      className="relative bg-transparent py-10 sm:py-16 text-slate-900 overflow-hidden"
    >
      <div id="about" className="absolute -top-24" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">

        {/* ── 1. TYPOGRAPHIC HERO TRANSFORMATION ("ABOUT US") ──────────────── */}
        <div className="mb-6 sm:mb-8 flex flex-col items-start justify-center relative">
          
          {/* Subheader Kicker */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={animStage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-2"
          >
            <span className="text-[10px] font-brand uppercase tracking-[0.3em] text-slate-400 font-bold">
              ESTABLISHED 2012
            </span>
            <div className="h-px w-8 bg-slate-300" />
            <span className="text-[10px] font-brand uppercase tracking-[0.3em] text-[#1E6B93] font-bold">
              OFFICIAL SOCIETY
            </span>
          </motion.div>

          {/* "ABOUT US" TYPOGRAPHY TRANSFORMATION (Graduated Scale: Hero > About Us >= Other Sections) */}
          <div className="w-full overflow-hidden py-1">
            <motion.h2
              initial={{ scale: 1.5, filter: 'blur(12px)', opacity: 0.2, y: 20 }}
              animate={
                animStage === 1
                  ? { scale: 1.25, filter: 'blur(6px)', opacity: 0.75, y: 10 }
                  : animStage >= 2
                  ? { scale: 1, filter: 'blur(0px)', opacity: 1, y: 0 }
                  : { scale: 1.5, filter: 'blur(12px)', opacity: 0.2, y: 20 }
              }
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-brand font-bold text-light-sweep-dark tracking-tight leading-none origin-left select-none text-[clamp(2.4rem,6.8vw,5.2rem)]"
            >
              {displayText.map((char, index) => (
                <span key={index} className="inline-block transition-all duration-150">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </motion.h2>
          </div>

          {/* Hairline Cyan Energy Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={animStage >= 2 ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full origin-left mt-3"
          >
            <div
              className="h-px w-full max-w-sm"
              style={{
                background: 'linear-gradient(90deg, rgba(30,107,147,0.6) 0%, rgba(6,182,212,0.3) 60%, transparent 100%)',
              }}
            />
          </motion.div>
        </div>

        {/* ── 2. REFINED COMPACT ABOUT CONTENT (TOP-DOWN RESOLUTION) ────────── */}
        <motion.div
          initial={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
          animate={
            animStage >= 3
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: -16, filter: 'blur(6px)' }
          }
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 sm:space-y-8"
        >
          {/* INTRO DESCRIPTION */}
          <div className="max-w-3xl">
            <p className="text-slate-600 font-inter text-xs sm:text-sm lg:text-base leading-relaxed">
              The Electronics Students Society (ExESS) is the official departmental forum at College of Engineering Chengannur. We bridge circuit theory with physical silicon through practical fabrication, FPGA synthesis, and industry-grade embedded systems.
            </p>
          </div>

          {/* PROMINENT MISSION & VISION CARDS (NO DOTS) */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* OUR MISSION CARD */}
            <div className="p-4 sm:p-5 bg-slate-50/90 border border-slate-200 border-l-4 border-l-[#1E6B93] rounded-none shadow-sm hover:shadow-soft transition-all">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-brand uppercase tracking-[0.24em] text-[#1E6B93] font-bold">
                  OUR MISSION
                </span>
              </div>
              <h3 className="font-brand text-sm sm:text-base font-bold text-heading mb-1">
                Hands-On Technical Mastery
              </h3>
              <p className="font-inter text-slate-600 text-xs sm:text-sm leading-relaxed">
                Strengthening technical knowledge through hands-on workshops, PCB fabrication bootcamps, synthesizable FPGA logic, and national hackathons.
              </p>
            </div>

            {/* OUR VISION CARD */}
            <div className="p-4 sm:p-5 bg-slate-50/90 border border-slate-200 border-r-4 border-r-[#06B6D4] rounded-none shadow-sm hover:shadow-soft transition-all">
              <div className="flex items-center justify-end sm:justify-start gap-2 mb-1.5">
                <span className="text-[10px] font-brand uppercase tracking-[0.24em] text-[#06B6D4] font-bold">
                  OUR VISION
                </span>
              </div>
              <h3 className="font-brand text-sm sm:text-base font-bold text-heading mb-1 sm:text-left text-right">
                Pioneering Hardware Leadership
              </h3>
              <p className="font-inter text-slate-600 text-xs sm:text-sm leading-relaxed sm:text-left text-right">
                To serve as a benchmark engineering body that inspires hardware innovation and empowers undergraduates to become competent technology leaders.
              </p>
            </div>
          </div>

          {/* FULL-BLEED IMAGE OVERLAY DETAIL CARDS (COMPACT ASPECT RATIO) */}
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6 items-start">
            {/* Card 01: Image takes entire space, text overlays directly on top */}
            <div className="aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-2xl group relative shadow-md border border-slate-200/80 bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                alt="ExESS PCB Design & Electronics Lab"
                className="object-cover size-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              {/* Gradient Overlay & Overlapping Text */}
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent text-white pointer-events-none">
                <span className="text-[9px] font-mono tracking-widest uppercase text-cyan-400 font-bold mb-1">
                  01 / PRACTICAL FABRICATION
                </span>
                <h3 className="text-base sm:text-xl font-brand font-bold text-white mb-1.5 tracking-tight">
                  Practical Silicon Engineering
                </h3>
                <p className="font-inter text-xs text-slate-200 leading-relaxed max-w-lg opacity-90">
                  Our approach begins with raw elements — circuit design, multi-layer PCB routing, synthesizable Verilog/FPGA logic, and embedded microcontrollers.
                </p>
              </div>
            </div>

            {/* Card 02: Image takes entire space, text overlays directly on top */}
            <div className="aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-2xl group relative shadow-md border border-slate-200/80 bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
                alt="Hardware Hackathon & Community Collaboration"
                className="object-cover size-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              {/* Gradient Overlay & Overlapping Text */}
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent text-white pointer-events-none">
                <span className="text-[9px] font-mono tracking-widest uppercase text-cyan-400 font-bold mb-1">
                  02 / LEADERSHIP &amp; COMMUNITY
                </span>
                <h3 className="text-base sm:text-xl font-brand font-bold text-white mb-1.5 tracking-tight">
                  Ecosystem of Excellence
                </h3>
                <p className="font-inter text-xs text-slate-200 leading-relaxed max-w-lg opacity-90">
                  Fostering a collaborative network of hardware enthusiasts, research teams, and alumni working across global semiconductor industries.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default About
