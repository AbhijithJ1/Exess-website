import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, FileText } from 'lucide-react'
import PcbLightButton from './PcbLightButton'
import { resourcesData } from '../data/resourcesData'

/**
 * Resources — "DATA ORGANIZATION"
 *
 * Motion Grammar:
 *   - RESOURCES typography starts horizontally stretched and blurred.
 *   - Fast technical data strips shoot across.
 *   - Typography compresses into correct proportions and sharpens.
 *   - Resource row interface staggers in.
 *   - Replayable: plays on enter, resets on leave.
 */
const Resources = () => {
  const [showAllModal, setShowAllModal] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState(null)

  const curatedResources = resourcesData.slice(0, 4)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 1.0 }
    }
  }

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <section id="resources" className="relative section-gap overflow-hidden bg-transparent">
      <div className="section-padding max-w-7xl mx-auto relative z-10 min-h-[85vh]">

        {/* ── 1. ARCHIVE / DATA ORGANIZATION TYPOGRAPHY ──────────────────── */}
        <div className="mb-12 border-b border-border/60 pb-8 relative">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, margin: "-10%" }}
            className="text-[10px] font-brand uppercase tracking-[0.22em] text-primary font-bold block mb-2"
          >
            LEARNING VAULT &amp; TECHNICAL ARCHIVE
          </motion.span>

          <div className="relative">
            {/* Fast Archival Data Strips overlay */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              whileInView={{ x: "100%", opacity: [0, 1, 1, 0] }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
              className="absolute top-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none z-10 w-1/2"
            />
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              whileInView={{ x: "100%", opacity: [0, 1, 1, 0] }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }}
              className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent pointer-events-none z-10 w-1/3"
            />

            <motion.div
              initial={{ scaleX: 1.5, opacity: 0, filter: "blur(20px)" }}
              whileInView={{ scaleX: 1, opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="origin-left"
            >
              <h2
                className="font-brand text-heading font-bold tracking-tight leading-[1.0] text-light-sweep-dark"
                style={{ fontSize: 'clamp(2.2rem, 9vw, 6rem)' }}
              >
                RESOURCES
              </h2>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="font-inter text-body text-sm sm:text-base text-gray-600 mt-2 max-w-xl"
            >
              Curated technical schematics, PCB layout guides, synthesizable RTL templates, and engineering assets.
            </motion.p>
          </div>
        </div>

        {/* ── 2. TECHNICAL ARCHIVE INDEX LIST ─────────────────────────── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
          className="space-y-4 mb-12"
        >
          {curatedResources.map((res, idx) => {
            const isHovered = hoveredIdx === idx
            return (
              <motion.div
                key={res.id}
                variants={rowVariants}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group relative p-5 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer ${
                  isHovered
                    ? 'bg-white border-primary/60 shadow-soft-lg scale-[1.015]'
                    : 'bg-white/85 border-border/70 hover:border-border'
                }`}
              >
                {/* PCB Node Indicator */}
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 rounded-r-full transition-all duration-300 ${
                  isHovered ? 'bg-primary shadow-[0_0_10px_#32C5E8]' : 'bg-transparent'
                }`} />

                <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                  <span className="text-sm font-mono font-bold text-primary">
                    0{idx + 1}
                  </span>

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
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 1.5 }}
          className="flex justify-center mt-10"
        >
          <PcbLightButton onClick={() => setShowAllModal(true)}>
            ACCESS COMPLETE ARCHIVE
          </PcbLightButton>
        </motion.div>
      </div>

      {/* Directory Modal */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-slate-900/65 backdrop-blur-md overflow-y-auto"
            onClick={() => setShowAllModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-border/80 my-auto max-h-[calc(100vh-100px)] overflow-y-auto"
            >
              <div className="sticky top-0 right-0 z-30 flex justify-between items-center bg-white/95 backdrop-blur-md pb-4 border-b border-border/60 -mt-2 mb-6">
                <div>
                  <h3 className="font-brand text-xl text-heading font-bold">ExESS LEARNING VAULT ARCHIVE</h3>
                  <p className="text-xs font-inter text-gray-500">Technical schematics, datasheets, and lecture notes</p>
                </div>
                <button onClick={() => setShowAllModal(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {resourcesData.map((res) => (
                  <div key={res.id} className="p-4 sm:p-5 rounded-2xl border border-border/60 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                    <a href={res.url} className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-brand uppercase tracking-wider font-semibold inline-flex items-center gap-1.5 hover:bg-secondary transition-colors">
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
