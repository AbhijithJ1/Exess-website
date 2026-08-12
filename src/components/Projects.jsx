import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, Users, Cpu, Maximize2 } from 'lucide-react'
import ImagePlaceholder from './ImagePlaceholder'
import PcbLightButton from './PcbLightButton'
import { projectsData } from '../data/projectsData'

/**
 * Projects — Asymmetric Editorial Construction Composition
 *
 * Choreography:
 *   1. ENGINEERING CONSTRUCTION typography wireframe to solid assembly.
 *   2. Asymmetric full-viewport case study grid (inspired by editorial collage).
 *   3. Individual project cards enter at different scales, initial offsets (y, x, scale),
 *      and progressive stagger delays, rearranging into their asymmetric collage layout.
 *   4. Interactive Case Study inspection lightbox.
 */

// Asymmetric layout config for 4 featured projects
const ASYMMETRIC_PROJECT_LAYOUT = [
  // Item 0: Hero Project Card (8 columns wide)
  { colSpan: 'md:col-span-8', aspect: 'aspect-[16/10]', initial: { y: 40, opacity: 0, scale: 0.94 }, delay: 0.1 },
  // Item 1: Tall Side Project Card (4 columns wide)
  { colSpan: 'md:col-span-4', aspect: 'aspect-[16/10] md:aspect-[4/5]', initial: { x: 40, opacity: 0, scale: 0.95 }, delay: 0.25 },
  // Item 2: Medium Landscape Project Card (6 columns wide)
  { colSpan: 'md:col-span-6', aspect: 'aspect-[16/10]', initial: { x: -40, opacity: 0, scale: 0.95 }, delay: 0.35 },
  // Item 3: Medium Landscape Project Card (6 columns wide)
  { colSpan: 'md:col-span-6', aspect: 'aspect-[16/10]', initial: { y: 40, opacity: 0, scale: 0.94 }, delay: 0.45 },
]

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [showAllModal, setShowAllModal] = useState(false)

  const featuredProjects = projectsData.slice(0, 4)

  return (
    <section id="projects" className="relative section-gap overflow-hidden bg-slate-50/30">
      <div className="section-padding max-w-7xl mx-auto relative z-10">

        {/* ── 1. ENGINEERING CONSTRUCTION ASSEMBLY TYPOGRAPHY ────────────── */}
        <div className="mb-14 border-b border-border/60 pb-8 relative">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, margin: '-10%' }}
            className="text-[10px] font-brand uppercase tracking-[0.24em] text-primary font-bold block mb-2"
          >
            PROJECTS &amp; INNOVATION
          </motion.span>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-10%' }}
            className="origin-left relative min-h-[120px] sm:min-h-[160px]"
          >
            {/* Overlay CAD Construction Lines */}
            <svg className="absolute -top-4 -left-4 right-0 bottom-0 w-full h-full pointer-events-none z-10 overflow-visible">
              <motion.rect
                x="0" y="0" width="98%" height="90%" rx="12" fill="none"
                stroke="#32C5E8" strokeWidth="1.5" strokeDasharray="8 8"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: {
                    pathLength: 1,
                    opacity: [0, 0.8, 0],
                    transition: { duration: 1.5, ease: 'easeInOut' }
                  }
                }}
              />
              <motion.line
                x1="0" y1="50%" x2="100%" y2="50%"
                stroke="#32C5E8" strokeWidth="1" strokeDasharray="4 4"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: {
                    pathLength: 1,
                    opacity: [0, 0.6, 0],
                    transition: { duration: 1.2, delay: 0.2, ease: 'easeInOut' }
                  }
                }}
              />
            </svg>

            {/* Wireframe to Solid Text Transition */}
            <div className="relative">
              {/* Wireframe text */}
              <motion.h2
                className="absolute top-0 left-0 font-brand text-heading text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.0]"
                style={{ WebkitTextStroke: '1px #32C5E8', WebkitTextFillColor: 'transparent' }}
                variants={{
                  hidden: { opacity: 0, scale: 1.05 },
                  visible: { opacity: [0, 1, 0], scale: 1, transition: { duration: 1.0, ease: 'easeOut' } }
                }}
              >
                PROJECTS
              </motion.h2>

              {/* Solid text */}
              <motion.h2
                className="font-brand text-heading text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.0] text-light-sweep-dark"
                variants={{
                  hidden: { opacity: 0, scale: 1.05, filter: 'blur(4px)' },
                  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, delay: 0.8, ease: 'easeOut' } }
                }}
              >
                PROJECTS
              </motion.h2>
            </div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1.2 } }
              }}
              className="font-inter text-body text-sm sm:text-base text-gray-600 mt-2 max-w-xl"
            >
              Hardware case studies, circuit prototypes, and embedded systems engineered by ExESS members.
            </motion.p>
          </motion.div>
        </div>

        {/* ── 2. ASYMMETRIC EDITORIAL CASE STUDY GRID ─────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 mb-16 items-start">
          {featuredProjects.map((project, idx) => {
            const layout = ASYMMETRIC_PROJECT_LAYOUT[idx % ASYMMETRIC_PROJECT_LAYOUT.length]

            return (
              <motion.div
                key={project.id}
                initial={layout.initial}
                whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                viewport={{ once: false, margin: '-5%' }}
                transition={{ duration: 0.8, delay: layout.delay, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedProject(project)}
                className={`${layout.colSpan} relative group cursor-pointer rounded-3xl overflow-hidden border border-border/80 bg-white shadow-soft hover:shadow-soft-xl hover:border-primary/50 transition-all duration-500 flex flex-col justify-between`}
              >
                {/* Photo / Image Container */}
                <div className={`relative w-full ${layout.aspect} overflow-hidden border-b border-border/60 bg-slate-900`}>
                  <ImagePlaceholder
                    src={project.image}
                    alt={project.title}
                    type="cover"
                    aspectRatio="w-full h-full"
                    className="group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-brand tracking-wider font-semibold backdrop-blur-md shadow-sm ${
                      project.status === 'Completed'
                        ? 'bg-emerald-500/90 text-white border border-emerald-400/40'
                        : 'bg-amber-500/90 text-white border border-amber-400/40'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Top Right Zoom Icon */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 group-hover:scale-110">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Information Card Body */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-xs font-mono font-bold text-primary flex items-center gap-1.5 mb-2">
                      <Cpu className="w-3.5 h-3.5" /> SYSTEM_INSPECTION_0{idx + 1}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-bold font-brand text-heading mb-2 group-hover:text-primary transition-colors leading-tight">
                      {project.title}
                    </h3>

                    <p className="font-inter text-xs sm:text-sm text-body leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4 font-mono">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/40 flex items-center justify-between mt-auto">
                    <span className="text-xs text-body flex items-center gap-1 font-mono">
                      <Users className="w-3.5 h-3.5 text-primary" /> {project.team}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-brand uppercase tracking-wider text-primary group-hover:text-cyan-600 font-bold">
                      Inspect <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <PcbLightButton onClick={() => setShowAllModal(true)}>
            VIEW ALL HARDWARE PROJECTS
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
              className="relative w-full max-w-5xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-border/80 my-auto max-h-[calc(100vh-100px)] overflow-y-auto"
            >
              <div className="sticky top-0 right-0 z-30 flex justify-between items-center bg-white/95 backdrop-blur-md pb-4 border-b border-border/60 -mt-2 mb-6">
                <div>
                  <h3 className="font-brand text-xl text-heading font-bold">ALL ExESS HARDWARE PROJECTS</h3>
                  <p className="text-xs font-inter text-gray-500">Complete archive of circuit prototypes and embedded systems</p>
                </div>
                <button onClick={() => setShowAllModal(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {projectsData.map((project) => (
                  <div key={project.id} onClick={() => { setShowAllModal(false); setSelectedProject(project) }} className="p-5 rounded-2xl border border-border/60 hover:border-primary/40 transition-colors cursor-pointer bg-slate-50/50">
                    <span className="text-[9px] font-mono text-primary font-bold block mb-1">{project.status}</span>
                    <h4 className="font-brand text-base text-heading font-bold mb-1">{project.title}</h4>
                    <p className="text-xs font-inter text-gray-500 line-clamp-2">{project.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] flex items-start justify-center p-3 sm:p-6 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-slate-900/65 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-border/80 my-auto max-h-[calc(100vh-100px)] overflow-y-auto"
            >
              <div className="sticky top-0 right-0 z-30 flex justify-end pb-2 pointer-events-none -mr-2 sm:-mr-4 -mt-2 sm:-mt-4">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full bg-white/90 shadow-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors pointer-events-auto cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="-mt-6">
                <ImagePlaceholder src={selectedProject.image} alt={selectedProject.title} type="cover" aspectRatio="aspect-[21/9]" className="mb-6 rounded-2xl" badge={selectedProject.status} />
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-brand tracking-wider font-semibold ${selectedProject.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/40' : 'bg-amber-50 text-amber-600 border border-amber-200/40'}`}>{selectedProject.status}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-brand text-heading font-bold mb-4">{selectedProject.title}</h3>
                <p className="font-inter text-body text-sm leading-relaxed mb-6">{selectedProject.description}</p>
                <div className="flex items-center gap-2 font-mono text-xs text-gray-500 pt-4 border-t border-border/40">
                  <Users className="w-4 h-4 text-primary" /> {selectedProject.team}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
