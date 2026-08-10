import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ArrowRight, X, Users, Cpu } from 'lucide-react'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import PcbLightButton from './PcbLightButton'
import { projectsData } from '../data/projectsData'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [showAllModal, setShowAllModal] = useState(false)

  // Curated 3 projects on homepage
  const curatedProjects = projectsData.slice(0, 3)

  // Lock body scroll and handle ESC key listener when modal is active
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null)
        setShowAllModal(false)
      }
    }
    if (selectedProject || showAllModal) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProject, showAllModal])

  return (
    <section id="projects" className="relative section-gap overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto relative z-10">
        
        {/* ── 1. Section Header ───────────────────────────────────────── */}
        <PowerOnHeader
          badge="PROJECTS & INNOVATION"
          headline={<>Featured <span className="text-light-sweep-dark">Tech Showcase</span></>}
          description="Engineering case studies, circuit prototypes, and hardware systems engineered by ExESS members."
          align="left"
        />

        {/* ── 2. Alternating Editorial Tech Showcase Compositions ────── */}
        <div className="space-y-16 sm:space-y-24 mb-16">
          {curatedProjects.map((project, idx) => {
            const isEven = idx % 2 === 0
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer rounded-3xl bg-white border border-border/80 p-6 sm:p-10 shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 relative overflow-hidden"
              >
                {/* PCB Accent Trace on Border */}
                <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-primary to-accent opacity-80" />

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Visual Panel (60% / 7 Cols) */}
                  <motion.div
                    initial={{ scale: 0.96 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                    <div className="rounded-2xl overflow-hidden border border-border/70 shadow-sm relative group-hover:shadow-md transition-shadow">
                      <ImagePlaceholder
                        src={project.image}
                        alt={project.title}
                        type="cover"
                        aspectRatio="aspect-[16/10]"
                        badge={project.status}
                      />
                    </div>
                  </motion.div>

                  {/* Information Panel (40% / 5 Cols) */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'} flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-bold text-primary flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" /> CASE_STUDY_0{idx + 1}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-brand tracking-wide font-semibold ${
                          project.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/40'
                            : 'text-amber-600 bg-amber-50/50'
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold font-brand text-heading mb-3 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="font-inter text-xs sm:text-sm text-body leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6 font-mono">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                      <span className="text-xs text-body flex items-center gap-1 font-mono">
                        <Users className="w-3.5 h-3.5 text-primary" /> {project.team}
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs font-brand uppercase tracking-wider text-primary group-hover:text-secondary font-bold">
                        Read Engineering Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>

                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── 3. Standalone Centered CTA ──────────────────────────────── */}
        <div className="flex justify-center">
          <PcbLightButton onClick={() => setShowAllModal(true)}>
            VIEW ALL HARDWARE PROJECTS
          </PcbLightButton>
        </div>

      </div>

      {/* Full Projects Showcase Directory Modal */}
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
              className="relative w-full max-w-5xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-border/80 my-auto max-h-[calc(100vh-100px)] overflow-y-auto"
            >
              <div className="sticky top-0 right-0 z-30 flex justify-between items-center bg-white/95 backdrop-blur-md pb-4 border-b border-border/60 -mt-2 mb-6">
                <div>
                  <h3 className="font-brand text-xl text-heading font-bold">ALL ExESS HARDWARE PROJECTS</h3>
                  <p className="text-xs font-inter text-gray-500 font-medium">Complete repository of student engineering innovations</p>
                </div>
                <button
                  onClick={() => setShowAllModal(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors pointer-events-auto cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsData.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => {
                      setShowAllModal(false)
                      setSelectedProject(proj)
                    }}
                    className="p-4 rounded-2xl border border-border/60 hover:border-primary/40 transition-colors cursor-pointer bg-slate-50/50 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-brand uppercase tracking-wider text-primary block mb-1">{proj.status}</span>
                      <h4 className="font-brand text-sm text-heading font-bold mb-1">{proj.title}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-3 font-inter">{proj.description}</p>
                    </div>
                    <span className="text-[10px] font-brand text-primary font-semibold flex items-center gap-1 pt-2">
                      Documentation <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Single Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] flex items-start justify-center p-3 sm:p-6 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-slate-900/65 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-border/80 my-auto max-h-[calc(100vh-100px)] overflow-y-auto"
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
                <ImagePlaceholder
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  type="cover"
                  aspectRatio="aspect-[21/9]"
                  className="mb-6"
                  badge={selectedProject.status}
                />

                <h3 className="text-xl sm:text-2xl font-brand text-heading mb-3">
                  {selectedProject.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4 font-mono">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary/[0.08] text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="font-inter text-body text-sm leading-relaxed mb-6">
                  {selectedProject.details || selectedProject.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-gray-50 border border-border/60 text-xs font-inter">
                  <div>
                    <span className="text-gray-400 block mb-0.5">Team Size</span>
                    <span className="font-semibold text-heading">{selectedProject.team}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Project Year</span>
                    <span className="font-semibold text-heading">{selectedProject.year}</span>
                  </div>
                </div>

                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary w-full inline-flex items-center justify-center gap-2 font-brand text-xs uppercase tracking-wider py-3.5"
                  >
                    <Github className="w-4 h-4" /> View Hardware Repository
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
