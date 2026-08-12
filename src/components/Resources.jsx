import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, FileText } from 'lucide-react'
import PowerOnHeader from './PowerOnHeader'
import PcbLightButton from './PcbLightButton'
import { resourcesData } from '../data/resourcesData'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Resources = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.15 })
  const [showAllModal, setShowAllModal] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState(null)

  // Trigger Section Power-Up Electrical Surge on entry
  useEffect(() => {
    if (sectionVisible) {
      window.dispatchEvent(new CustomEvent('exess-section-powerup'))
    }
  }, [sectionVisible])

  const curatedResources = resourcesData.slice(0, 4)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowAllModal(false)
    }
    if (showAllModal) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showAllModal])

  return (
    <section ref={sectionRef} id="resources" className="relative section-gap overflow-hidden bg-transparent">
      <div className="section-padding max-w-7xl mx-auto relative z-10">
        
        {/* ── 1. Section Header ───────────────────────────────────────── */}
        <PowerOnHeader
          badge="LEARNING VAULT & TECHNICAL ARCHIVE"
          headline={<>Technical <span className="text-light-sweep-dark">Archive</span></>}
          description="Curated technical schematics, PCB layout guides, synthesizable RTL templates, and engineering assets."
          align="left"
        />

        {/* Horizontal Section Activation Scanning Beam */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={sectionVisible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-8 origin-left"
        />

        {/* ── 2. TECHNICAL ARCHIVE INDEX LIST ─────────────────────────── */}
        <div className="space-y-4 mb-12">
          {curatedResources.map((res, idx) => {
            const isHovered = hoveredIdx === idx
            return (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group relative p-5 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer ${
                  isHovered
                    ? 'bg-white border-primary/60 shadow-soft-lg scale-[1.015]'
                    : 'bg-white/85 border-border/70 hover:border-border'
                }`}
              >
                {/* PCB Node Indicator on Left Edge */}
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 rounded-r-full transition-all duration-300 ${
                  isHovered ? 'bg-primary shadow-[0_0_10px_#32C5E8]' : 'bg-transparent'
                }`} />

                <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                  {/* Index Number */}
                  <span className={`text-sm font-mono font-bold transition-colors ${
                    isHovered ? 'text-primary' : 'text-gray-400'
                  }`}>
                    0{idx + 1}
                  </span>

                  {/* Resource Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider transition-colors ${
                        isHovered ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {res.format}
                      </span>
                      <span className="text-[10px] font-brand uppercase tracking-wider text-gray-400 font-semibold">
                        {res.category}
                      </span>
                    </div>

                    <h3 className={`text-base sm:text-lg font-bold font-brand transition-colors ${
                      isHovered ? 'text-primary' : 'text-heading'
                    }`}>
                      {res.title}
                    </h3>
                    <p className="font-inter text-xs text-gray-500 line-clamp-1 max-w-2xl">
                      {res.description}
                    </p>
                  </div>
                </div>

                {/* Right Metadata & Download Button */}
                <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/40">
                  <span className="text-xs font-mono text-gray-400">
                    {res.fileSize} &bull; {res.downloads} downloads
                  </span>

                  <a
                    href={res.url}
                    className={`px-4 py-2 rounded-xl text-xs font-brand uppercase tracking-wider font-semibold inline-flex items-center gap-2 transition-all ${
                      isHovered
                        ? 'bg-primary text-white shadow-sm translate-x-1'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Asset <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── 3. Standalone Centered CTA ──────────────────────────────── */}
        <div className="flex justify-center mt-10">
          <PcbLightButton onClick={() => setShowAllModal(true)}>
            ACCESS COMPLETE ARCHIVE
          </PcbLightButton>
        </div>

      </div>

      {/* Full Resources Directory Modal */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-slate-900/65 backdrop-blur-md overflow-y-auto"
            onClick={() => setShowAllModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-border/80 my-auto max-h-[calc(100vh-100px)] overflow-y-auto"
            >
              <div className="sticky top-0 right-0 z-30 flex justify-between items-center bg-white/95 backdrop-blur-md pb-4 border-b border-border/60 -mt-2 mb-6">
                <div>
                  <h3 className="font-brand text-xl text-heading font-bold">ExESS LEARNING VAULT &amp; RESOURCES ARCHIVE</h3>
                  <p className="text-xs font-inter text-gray-500">Technical schematics, datasheets, and lecture notes</p>
                </div>
                <button
                  onClick={() => setShowAllModal(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors pointer-events-auto cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {resourcesData.map((res) => (
                  <div
                    key={res.id}
                    className="p-4 sm:p-5 rounded-2xl border border-border/60 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[9px] font-brand uppercase tracking-wider text-primary font-semibold">{res.category} &bull; {res.format}</span>
                        <h4 className="font-brand text-sm text-heading font-bold">{res.title}</h4>
                        <p className="text-xs font-inter text-gray-500">{res.description}</p>
                      </div>
                    </div>

                    <a
                      href={res.url}
                      className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-brand uppercase tracking-wider font-semibold inline-flex items-center gap-1.5 self-start sm:self-center hover:bg-secondary transition-colors"
                    >
                      Download <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Resources
