import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import PowerOnHeader from './PowerOnHeader'
import { resourcesData } from '../data/resourcesData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
}

const Resources = () => {
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation()

  return (
    <section id="resources" className="relative section-gap overflow-hidden bg-background">
      <div className="section-padding relative z-10 max-w-7xl mx-auto">
        <PowerOnHeader
          badge="Learning Vault & Resources"
          headline={<>Knowledge for <span className="text-light-sweep-dark">Hardware</span> Engineers</>}
          description="Curated technical documentation, PCB layout guides, synthesizable RTL templates, and engineering assets."
        />

        {/* Technical Resources Cards - Premium Light Cards */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-6"
        >
          {resourcesData.map((res) => (
            <motion.div
              key={res.id}
              variants={itemVariants}
              className="group card-premium p-6 sm:p-8 flex flex-col justify-between bg-card border border-border/80 rounded-3xl hover:border-primary/30 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/[0.08] text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <res.icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
                    {res.format}
                  </span>
                </div>

                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-1 block">
                  {res.category}
                </span>
                <h3 className="text-xl font-bold font-grotesk text-heading mb-2 group-hover:text-primary transition-colors">
                  {res.title}
                </h3>
                <p className="text-body-sm text-body leading-relaxed mb-6">
                  {res.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/60">
                <span className="text-xs font-mono text-slate-400">
                  Size: {res.fileSize} &bull; {res.downloads} downloads
                </span>
                <a
                  href={res.url}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-secondary transition-colors"
                >
                  Download Asset <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Resources
