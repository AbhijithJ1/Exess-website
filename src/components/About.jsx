import { motion } from 'framer-motion'

/**
 * About — Architectural Studio Editorial Layout
 *
 * Full-Bleed Image Text-Overlay Concept:
 *   - The image occupies 100% of the detail card container space (0 extra text box below).
 *   - Title, mono badge, and description overlay directly on the photograph with a smooth gradient backdrop.
 *   - Prominent Mission & Vision cards matched to ExESS primary blue (#1E6B93) & cyan (#06B6D4).
 *   - Clean natural page scroll (0 GSAP scroll traps or blue circle artifacts).
 */

const About = () => {
  return (
    <section id="circuits" className="relative bg-white py-16 sm:py-24 text-slate-900 overflow-hidden">
      <div id="about" className="absolute -top-24" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">

        {/* ── TOP SECTION: EDITORIAL HEADER GRID ────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-10 sm:mb-14 relative z-10">
          
          {/* Left 8 Cols: Kicker + Architectural Headline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-3.5 mb-4">
              <span className="text-[10px] font-brand uppercase tracking-[0.3em] text-slate-400 font-bold">
                ESTABLISHED 2012
              </span>
              <div className="h-px w-10 bg-slate-300" />
              <span className="text-[10px] font-brand uppercase tracking-[0.3em] text-primary font-bold">
                ABOUT THE SOCIETY
              </span>
            </div>

            <div className="relative flex items-center">
              <h2 className="text-4xl sm:text-6xl lg:text-8xl font-brand font-bold tracking-tight leading-[0.95] text-heading">
                Building <br /> <span className="italic font-serif font-normal text-primary">Hardware</span>.
              </h2>
            </div>
          </motion.div>

          {/* Right 4 Cols: Lead Editorial Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 pb-1"
          >
            <p className="text-slate-600 font-inter text-xs sm:text-sm lg:text-base leading-relaxed">
              The Electronics Students Society (ExESS) is the official departmental forum at College of Engineering Chengannur, bridging theoretical circuit principles with physical silicon reality.
            </p>
          </motion.div>

        </div>

        {/* ── PROMINENT HIGH-CONTRAST MISSION & VISION CARDS ───────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="grid sm:grid-cols-2 gap-5 mb-10 sm:mb-14"
        >
          
          {/* OUR MISSION CARD */}
          <div className="p-5 sm:p-6 bg-slate-50/90 border border-slate-200 border-l-4 border-l-[#1E6B93] rounded-none shadow-sm hover:shadow-soft transition-all">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-brand uppercase tracking-[0.24em] text-[#1E6B93] font-bold">
                OUR MISSION
              </span>
            </div>
            <h3 className="font-brand text-base sm:text-lg font-bold text-heading mb-1.5">
              Hands-On Technical Mastery
            </h3>
            <p className="font-inter text-slate-600 text-xs sm:text-sm leading-relaxed">
              Strengthening technical knowledge through hands-on workshops, PCB fabrication bootcamps, synthesizable FPGA logic, and national hackathons.
            </p>
          </div>

          {/* OUR VISION CARD */}
          <div className="p-5 sm:p-6 bg-slate-50/90 border border-slate-200 border-r-4 border-r-[#06B6D4] rounded-none shadow-sm hover:shadow-soft transition-all">
            <div className="flex items-center justify-end sm:justify-start gap-2 mb-2">
              <span className="text-[11px] font-brand uppercase tracking-[0.24em] text-[#06B6D4] font-bold">
                OUR VISION
              </span>
            </div>
            <h3 className="font-brand text-base sm:text-lg font-bold text-heading mb-1.5 sm:text-left text-right">
              Pioneering Hardware Leadership
            </h3>
            <p className="font-inter text-slate-600 text-xs sm:text-sm leading-relaxed sm:text-left text-right">
              To serve as a benchmark engineering body that inspires hardware innovation and empowers undergraduates to become competent technology leaders.
            </p>
          </div>

        </motion.div>

        {/* ── MIDDLE SECTION: FULL-BLEED IMAGE OVERLAY DETAIL CARDS ──────── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-2 gap-6 sm:gap-8 items-start"
        >
          
          {/* Card 01: Image takes entire space, text overlays directly on top */}
          <div className="aspect-[16/11] sm:aspect-[4/5] overflow-hidden rounded-2xl group relative shadow-lg border border-slate-200/80 bg-slate-950">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
              alt="ExESS PCB Design & Electronics Lab"
              className="object-cover size-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
            {/* Gradient Overlay & Overlapping Text */}
            <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent text-white pointer-events-none">
              <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-bold mb-1.5">
                01 / PRACTICAL FABRICATION
              </span>
              <h3 className="text-lg sm:text-2xl font-brand font-bold text-white mb-2 tracking-tight">
                Practical Silicon Engineering
              </h3>
              <p className="font-inter text-xs sm:text-sm text-slate-200 leading-relaxed max-w-lg opacity-90">
                Our approach begins with raw elements — circuit design, multi-layer PCB routing, synthesizable Verilog/FPGA logic, and embedded microcontrollers.
              </p>
            </div>
          </div>

          {/* Card 02: Image takes entire space, text overlays directly on top (Staggered Offset) */}
          <div className="aspect-[16/11] sm:aspect-[4/5] overflow-hidden rounded-2xl group relative shadow-lg border border-slate-200/80 bg-slate-950 md:mt-10">
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
              alt="Hardware Hackathon & Community Collaboration"
              className="object-cover size-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
            {/* Gradient Overlay & Overlapping Text */}
            <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent text-white pointer-events-none">
              <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-bold mb-1.5">
                02 / LEADERSHIP &amp; COMMUNITY
              </span>
              <h3 className="text-lg sm:text-2xl font-brand font-bold text-white mb-2 tracking-tight">
                Ecosystem of Excellence
              </h3>
              <p className="font-inter text-slate-200 text-xs sm:text-sm leading-relaxed max-w-lg opacity-90">
                Fostering a collaborative network of hardware enthusiasts, research teams, and alumni working across global semiconductor industries.
              </p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  )
}

export default About
