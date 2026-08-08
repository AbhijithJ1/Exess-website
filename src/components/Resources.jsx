import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, FileText, ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import PowerOnHeader from './PowerOnHeader'
import PcbLightButton from './PcbLightButton'
import { resourcesData } from '../data/resourcesData'

const Resources = () => {
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation()
  const [showAllModal, setShowAllModal] = useState(false)

  // Curated 4 resources on homepage
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
    <section id="resources" className="relative section-gap overflow-hidden bg-transparent">
      <div className="section-padding relative z-10">
        <PowerOnHeader
          badge="Learning Vault & Resources"
          headline={<>Knowledge for <span className="text-light-sweep-dark">Hardware</span> Engineers</>}
          description="Curated technical documentation, PCB layout guides, synthesizable RTL templates, and engineering assets."
          align="left"
        />

        {/* Curated Resources Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {curatedResources.map((res) => (
            <div
              key={res.id}
              className="group p-6 sm:p-8 flex flex-col justify-between bg-white border border-border/70 rounded-3xl hover:border-primary/30 hover:shadow-soft-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-primary/[0.08] text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <res.icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
                    {res.format}
                  </span>
                </div>

                <span className="text-[10px] font-brand uppercase tracking-[0.16em] text-primary mb-1 block">
                  {res.category}
                </span>
                <h3 className="text-lg font-bold font-brand text-heading mb-2 group-hover:text-primary transition-colors">
                  {res.title}
                </h3>
                <p className="font-inter text-xs text-body leading-relaxed mb-6">
                  {res.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <span className="text-xs font-mono text-slate-400">
                  Size: {res.fileSize} &bull; {res.downloads} downloads
                </span>
                <a
                  href={res.url}
                  className="inline-flex items-center gap-1.5 text-[10px] font-brand uppercase tracking-wider text-primary hover:text-secondary transition-colors font-semibold"
                >
                  Download Asset <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Resources Button */}
        <div className="flex justify-center">
          <PcbLightButton onClick={() => setShowAllModal(true)}>
            VIEW ALL RESOURCES
          </PcbLightButton>
        </div>
      </div>

      {/* Full Resources Vault Directory Modal */}
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
                  <h3 className="font-brand text-xl text-heading font-bold">ExESS LEARNING VAULT &amp; RESOURCES</h3>
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
                        <span className="text-[9px] font-brand uppercase tracking-wider text-primary">{res.category} &bull; {res.format}</span>
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
