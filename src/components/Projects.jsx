import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ArrowRight, X, Users } from 'lucide-react'
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
      <div className="section-padding relative z-10">
        <PowerOnHeader
          badge="Innovation & Projects"
          headline={<>Engineering in <span className="text-light-sweep-dark">Action</span></>}
          description="Real-world hardware & embedded projects engineered by ExESS members. From circuit prototypes to working systems."
          align="left"
        />

        {/* Curated Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-12">
          {curatedProjects.map((project) => (
            <div
              key={project.id}
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
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center">
          <PcbLightButton onClick={() => setShowAllModal(true)}>
            VIEW ALL PROJECTS
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
                    className="p-4 rounded-2xl border border-border/60 hover:border-primary/40 transition-colors cursor-pointer bg-slate-50/50"
                  >
                    <span className="text-[9px] font-brand uppercase tracking-wider text-primary block mb-1">{proj.status}</span>
                    <h4 className="font-brand text-sm text-heading font-bold mb-1">{proj.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3 font-inter">{proj.description}</p>
                    <span className="text-[10px] font-brand text-primary font-semibold flex items-center gap-1">
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
