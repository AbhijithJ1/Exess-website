import { motion } from 'framer-motion'
import { Linkedin, Mail, Github } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import { teamMembers } from '../data/teamData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

const Team = () => {
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation()

  return (
    <section id="team" className="relative section-gap overflow-hidden">
      <div className="section-padding relative z-10 max-w-7xl mx-auto">
        <PowerOnHeader
          badge="Executive Committee"
          headline={<>Meet the <span className="text-light-sweep-dark">Minds</span> Behind ExESS</>}
          description="A dedicated team of student engineers passionate about hardware design, embedded systems, and technical community leadership."
        />

        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="group bg-white rounded-3xl border border-border/70 p-6 shadow-soft transition-all duration-400 hover:shadow-soft-lg hover:border-primary/30 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle Corner PCB Vector Trace */}
              <svg className="absolute top-0 right-0 w-24 h-24 opacity-[0.06] group-hover:opacity-15 transition-opacity pointer-events-none" viewBox="0 0 100 100" fill="none">
                <path d="M100 0 V40 H60 V80 H0" stroke="#1E6B93" strokeWidth="1.5" />
                <circle cx="60" cy="40" r="3" fill="#1E6B93" />
              </svg>

              <div>
                {/* Responsive Avatar Frame with Neutral Engineering Placeholder */}
                <div className="w-16 h-16 mb-5">
                  <ImagePlaceholder
                    src={member.image}
                    alt={member.name}
                    type="avatar"
                    aspectRatio="aspect-square"
                    initials={member.initials}
                    badge="EXEC"
                  />
                </div>

                <h4 className="font-grotesk font-bold text-heading text-xl mb-1 tracking-tight">
                  {member.name}
                </h4>
                <p className="text-xs font-grotesk font-bold uppercase tracking-[0.16em] text-primary mb-1">
                  {member.role}
                </p>
                <p className="text-xs font-inter text-gray-500 mb-4">{member.year}</p>
                <p className="text-body-sm text-body/80 text-xs leading-relaxed mb-6 line-clamp-2">
                  {member.bio}
                </p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border/40">
                {member.socials?.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-xl bg-primary/[0.06] flex items-center justify-center hover:bg-primary hover:text-white text-gray-500 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.socials?.github && (
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-xl bg-primary/[0.06] flex items-center justify-center hover:bg-primary hover:text-white text-gray-500 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.socials?.email && (
                  <a
                    href={`mailto:${member.socials.email}`}
                    className="w-8 h-8 rounded-xl bg-primary/[0.06] flex items-center justify-center hover:bg-primary hover:text-white text-gray-500 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Team
