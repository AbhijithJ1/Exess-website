import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Linkedin, Mail, Github, Users, X, ArrowRight } from 'lucide-react'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import {
  facultyCoordinator,
  executiveCommittee,
  officeBearers,
  committeeMembers,
  allTeamCategories,
} from '../data/teamData'

// Combine all members into a flat array for the horizontal marquee
const carouselMembers = [
  facultyCoordinator,
  ...executiveCommittee,
  ...officeBearers,
  ...committeeMembers,
]

// Duplicate array to ensure seamless infinite looping
const marqueeList = [...carouselMembers, ...carouselMembers]

const TeamMemberCard = ({ member, onClick }) => (
  <div
    onClick={() => onClick(member)}
    className="group w-64 sm:w-72 flex-shrink-0 bg-white rounded-3xl border border-border/70 p-5 shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between"
  >
    <svg className="absolute top-0 right-0 w-20 h-20 opacity-[0.05] group-hover:opacity-15 transition-opacity pointer-events-none" viewBox="0 0 100 100" fill="none">
      <path d="M100 0 V40 H60 V80 H0" stroke="#1E6B93" strokeWidth="1.5" />
      <circle cx="60" cy="40" r="3" fill="#1E6B93" />
    </svg>

    <div>
      <div className="w-14 h-14 sm:w-16 sm:h-16 mb-4">
        <ImagePlaceholder
          src={member.image}
          alt={member.name}
          type="avatar"
          aspectRatio="aspect-square"
          initials={member.initials}
          badge="ExESS"
        />
      </div>

      <h4 className="font-brand text-heading text-base mb-1 tracking-tight group-hover:text-primary transition-colors">
        {member.name}
      </h4>
      <p className="text-[10px] font-brand uppercase tracking-[0.14em] text-primary mb-1">
        {member.role}
      </p>
      <p className="text-xs font-inter text-gray-500 mb-2.5">{member.department || member.year}</p>
      <p className="font-inter text-xs leading-relaxed text-gray-600 line-clamp-2 mb-4">
        {member.bio}
      </p>
    </div>

    {member.socials && (
      <div className="flex gap-2 pt-3 border-t border-border/40" onClick={(e) => e.stopPropagation()}>
        {member.socials.linkedin && (
          <a
            href={member.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-xl bg-primary/[0.06] flex items-center justify-center hover:bg-primary hover:text-white text-gray-500 transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
        )}
        {member.socials.github && (
          <a
            href={member.socials.github}
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-xl bg-primary/[0.06] flex items-center justify-center hover:bg-primary hover:text-white text-gray-500 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        )}
        {member.socials.email && (
          <a
            href={`mailto:${member.socials.email}`}
            className="w-7 h-7 rounded-xl bg-primary/[0.06] flex items-center justify-center hover:bg-primary hover:text-white text-gray-500 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    )}
  </div>
)

const Team = () => {
  const [fullTeamOpen, setFullTeamOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('All')
  const [selectedMember, setSelectedMember] = useState(null)

  // Lock background scroll and add ESC key listener when modal is active
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setFullTeamOpen(false)
        setSelectedMember(null)
      }
    }
    if (fullTeamOpen || selectedMember) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [fullTeamOpen, selectedMember])

  return (
    <section id="team" className="relative section-gap overflow-hidden">
      <div className="section-padding relative z-10 max-w-7xl mx-auto">
        <PowerOnHeader
          badge="Executive Leadership"
          headline={<>Meet the <span className="text-light-sweep-dark">Minds</span> Behind ExESS</>}
          description="Faculty mentors and student leaders driving technical bootcamps, hardware research, and departmental initiatives."
        />

        {/* ── 1. PREMIER INFINITE HORIZONTAL MARQUEE CAROUSEL ────────────── */}
        <div className="relative w-full overflow-hidden my-8 py-4 group">
          {/* Subtle left & right gradient fade masks */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Continuous Smooth Infinite Track */}
          <div className="flex gap-5 w-max animate-marquee group-hover:[animation-play-state:paused] will-change-transform">
            {marqueeList.map((m, idx) => (
              <TeamMemberCard key={`${m.id}-${idx}`} member={m} onClick={setSelectedMember} />
            ))}
          </div>
        </div>

        {/* ── 2. "Meet the ExESS Team" Dedicated Trigger Button ───────────────────── */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setFullTeamOpen(true)}
            className="btn-primary inline-flex items-center gap-3 font-brand text-xs tracking-wider px-7 sm:px-8 py-3.5 shadow-soft"
          >
            <Users className="w-4 h-4 text-accent" />
            Meet the ExESS Team
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── 3. Individual Member Detail Popover Modal ─────────────────── */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-border/80"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 mb-4">
                <ImagePlaceholder
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  type="avatar"
                  aspectRatio="aspect-square"
                  initials={selectedMember.initials}
                  badge="ExESS"
                />
              </div>

              <h4 className="font-brand text-lg text-heading mb-1">{selectedMember.name}</h4>
              <p className="text-[10px] font-brand uppercase tracking-widest text-primary mb-1">{selectedMember.role}</p>
              <p className="text-xs font-inter text-gray-500 mb-3">{selectedMember.department || selectedMember.year}</p>

              <p className="font-inter text-xs leading-relaxed text-gray-600 mb-5">
                {selectedMember.bio}
              </p>

              {selectedMember.socials && (
                <div className="flex gap-2 pt-3 border-t border-border/40">
                  {selectedMember.socials.linkedin && (
                    <a
                      href={selectedMember.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-xl bg-primary/[0.06] flex items-center justify-center hover:bg-primary hover:text-white text-gray-600 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {selectedMember.socials.github && (
                    <a
                      href={selectedMember.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-xl bg-primary/[0.06] flex items-center justify-center hover:bg-primary hover:text-white text-gray-600 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {selectedMember.socials.email && (
                    <a
                      href={`mailto:${selectedMember.socials.email}`}
                      className="w-8 h-8 rounded-xl bg-primary/[0.06] flex items-center justify-center hover:bg-primary hover:text-white text-gray-600 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 4. Full Team Directory Modal Page ────────────────────────── */}
      <AnimatePresence>
        {fullTeamOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center p-3 sm:p-6 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-slate-900/65 backdrop-blur-md overflow-y-auto"
            onClick={() => setFullTeamOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl border border-border/80 my-auto max-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-120px)] overflow-y-auto overscroll-contain"
            >
              {/* Sticky close button */}
              <div className="sticky top-0 right-0 z-30 flex justify-end pb-2 pointer-events-none -mr-2 sm:-mr-4 -mt-2 sm:-mt-4">
                <button
                  onClick={() => setFullTeamOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/90 shadow-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors pointer-events-auto cursor-pointer"
                  aria-label="Close team page"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6 sm:mb-8 pr-8 -mt-6">
                <span className="text-[10px] font-brand uppercase tracking-[0.20em] text-primary block mb-1.5">
                  Complete Directory
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-brand text-heading mb-2">
                  ExESS Team Structure
                </h3>
                <p className="font-inter text-xs sm:text-sm text-gray-500">
                  Faculty coordinator, executive committee, office bearers, and committee members of the Electronics Students Society.
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 border-b border-border/60 pb-4">
                {['All', 'Faculty Coordinator', 'Executive Committee', 'Office Bearers', 'Committee Members'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3.5 py-2 rounded-xl font-brand text-[10px] sm:text-xs tracking-wider transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-primary text-white shadow-soft'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Categorized Team Sections */}
              <div className="space-y-8 sm:space-y-10">
                {allTeamCategories
                  .filter((cat) => activeTab === 'All' || activeTab === cat.title)
                  .map((cat) => (
                    <div key={cat.title}>
                      <h4 className="font-brand text-xs sm:text-sm text-primary uppercase tracking-[0.18em] mb-4 border-l-2 border-primary pl-3">
                        {cat.title}
                      </h4>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {cat.members.map((m) => (
                          <TeamMemberCard key={m.id} member={m} onClick={setSelectedMember} />
                        ))}
                      </div>
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

export default Team
