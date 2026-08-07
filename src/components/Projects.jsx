import { useState } from 'react'
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

const Projects = () => {
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation()
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="relative section-gap overflow-hidden">
      <div className="section-padding relative z-10 max-w-7xl mx-auto">
        <PowerOnHeader
          badge="Innovation & Projects"
          headline={<>Engineering in <span className="text-light-sweep-dark">Action</span></>}
          description="Real-world hardware & embedded projects engineered by ExESS members. From circuit prototypes to working systems."
        />

        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onClick={() => setSelectedProject(project)}
              className="group bg-white rounded-3xl border border-border/70 overflow-hidden cursor-pointer flex flex-col justify-between hover:shadow-soft-lg hover:border-primary/30 transition-all duration-300"
            >
              <div>
                <ImagePlaceholder
                  src={project.image}
                  alt={project.title}
                  type="cover"
                  aspectRatio="aspect-[16/9]"
                  badge={project.status}
                  overlayContent={
                    <div className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <project.icon className="w-4 h-4 text-accent" />
                    </div>
                  }
                />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-brand tracking-wide ${
                      project.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50'
                        : 'bg-amber-50 text-amber-600 border border-amber-200/50'
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

                  <p className="font-inter text-xs text-body leading-relaxed mb-5 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-2 font-mono">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-lg text-[9px] font-semibold bg-gray-100 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <span className="inline-flex items-center gap-2 text-[10px] font-brand uppercase tracking-wider text-primary group-hover:text-secondary transition-colors">
                  Documentation <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal View */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-border/80 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
