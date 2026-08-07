import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Cpu, ArrowRight, X, Users, Calendar } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import { projectsData } from '../data/projectsData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const Projects = () => {
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation()
  const [selectedProject, setSelectedProject] = useState(null)

  // Lock body scroll and handle ESC key listener when modal is active
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProject])

  return (
    <section id="projects" className="relative section-gap overflow-hidden">
      <div className="section-padding relative z-10 max-w-7xl mx-auto">
        <PowerOnHeader
          badge="Innovation & Projects"
          headline={<>Engineering in <span className="text-light-sweep-dark">Action</span></>}
          description="Real-world hardware & embedded projects engineered by ExESS members. From circuit prototypes to working systems."
        />

        {/* Open Editorial Layout — Reduced Heavy Card Borders */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer flex flex-col justify-between border-b border-border/50 pb-6 transition-all duration-300"
            >
              <div>
                <ImagePlaceholder
                  src={project.image}
                  alt={project.title}
                  type="cover"
                  aspectRatio="aspect-[16/9]"
                  badge={project.status}
                  overlayContent={
                    <div className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <project.icon className="w-3.5 h-3.5 text-accent" />
                    </div>
                  }
                />

                <div className="pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-brand tracking-wide ${
                      project.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/40'
                        : 'text-amber-600'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-xs text-body flex items-center gap-1 font-mono">
                      <Users className="w-3.5 h-3.5 text-primary" /> {project.team}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-brand text-heading mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="font-inter text-xs text-body leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-2 font-mono">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-lg text-[9px] font-semibold bg-gray-100/80 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <span className="inline-flex items-center gap-2 text-[10px] font-brand uppercase tracking-wider text-primary group-hover:text-secondary transition-colors">
                  Documentation <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal View — Fully Responsive with Navbar Clearance & ESC Key Handler */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center p-3 sm:p-6 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-slate-900/65 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-border/80 my-auto max-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-120px)] overflow-y-auto overscroll-contain"
            >
              {/* Sticky close button */}
              <div className="sticky top-0 right-0 z-30 flex justify-end pb-2 pointer-events-none -mr-2 sm:-mr-4 -mt-2 sm:-mt-4">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full bg-white/90 shadow-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors pointer-events-auto cursor-pointer"
                  aria-label="Close modal"
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
