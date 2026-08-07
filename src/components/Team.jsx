import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Linkedin, Mail, Github, Users, X, ArrowRight, Sparkles, Cpu } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import Logo from './Logo'
import {
  facultyCoordinator,
  executiveCommittee,
  officeBearers,
  committeeMembers,
  allTeamCategories,
} from '../data/teamData'

// Select representative orbital members
const orbitMembersInner = [
  { ...facultyCoordinator, angle: 0 },
  { ...executiveCommittee[0], angle: 180 }, // Aditya Krishnan
]

const orbitMembersMiddle = [
  { ...executiveCommittee[1], angle: 0 },   // Meera Nair
  { ...executiveCommittee[2], angle: 90 },  // Rahul Menon
  { ...executiveCommittee[3], angle: 180 }, // Anjali Rajesh
  { ...officeBearers[0], angle: 270 },      // Vivek Soman
]

const orbitMembersOuter = [
  { ...officeBearers[1], angle: 0 },        // Priya Thomas
  { ...officeBearers[2], angle: 72 },       // Kiran Das
  { ...officeBearers[3], angle: 144 },      // Sneha Mohan
  { ...committeeMembers[0], angle: 216 },   // Arjun B
  { ...committeeMembers[2], angle: 288 },   // Devika V
]

const TeamMemberCardModal = ({ member }) => (
  <div className="group bg-white rounded-3xl border border-border/70 p-5 sm:p-6 shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:border-primary/30 relative overflow-hidden flex flex-col justify-between h-full">
    <svg className="absolute top-0 right-0 w-24 h-24 opacity-[0.05] group-hover:opacity-15 transition-opacity pointer-events-none" viewBox="0 0 100 100" fill="none">
      <path d="M100 0 V40 H60 V80 H0" stroke="#1E6B93" strokeWidth="1.5" />
      <circle cx="60" cy="40" r="3" fill="#1E6B93" />
    </svg>

    <div>
      <div className="w-14 h-14 sm:w-16 sm:h-16 mb-4 sm:mb-5">
        <ImagePlaceholder
          src={member.image}
          alt={member.name}
          type="avatar"
          aspectRatio="aspect-square"
          initials={member.initials}
          badge="ExESS"
        />
      </div>

      <h4 className="font-brand text-heading text-base sm:text-lg mb-1 tracking-tight">
        {member.name}
      </h4>
      <p className="text-[10px] font-brand uppercase tracking-[0.14em] text-primary mb-1">
        {member.role}
      </p>
      <p className="text-xs font-inter text-gray-500 mb-2.5">{member.department || member.year}</p>
      <p className="font-inter text-xs leading-relaxed text-gray-600 mb-4 line-clamp-2">
        {member.bio}
      </p>
    </div>

    {member.socials && (
      <div className="flex gap-2 pt-3.5 border-t border-border/40">
        {member.socials.linkedin && (
          <a
            href={member.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-primary/[0.06] flex items-center justify-center hover:bg-primary hover:text-white text-gray-500 transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
        )}
        {member.socials.github && (
          <a
            href={member.socials.github}
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-primary/[0.06] flex items-center justify-center hover:bg-primary hover:text-white text-gray-500 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        )}
        {member.socials.email && (
          <a
            href={`mailto:${member.socials.email}`}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-primary/[0.06] flex items-center justify-center hover:bg-primary hover:text-white text-gray-500 transition-colors"
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
  const [isPaused, setIsPaused] = useState(false)

  // Lock background scroll and handle ESC key listener when modal is active
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
          description="Hover over orbital nodes to explore key leaders, or view the complete directory of our departmental committee."
        />

        {/* ── 1. FUTURISTIC ORBITAL TEAM VISUALIZATION ───────────────────── */}
        <div
          className="relative w-full max-w-4xl mx-auto h-[480px] sm:h-[580px] my-6 flex items-center justify-center select-none overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Orbital Concentric PCB Blueprint SVG Rings */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
            <defs>
              <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#32C5E8" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#1E6B93" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#1E6B93" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Central Sun Ambient Glow */}
            <circle cx="300" cy="300" r="90" fill="url(#sunGlow)" />

            {/* Orbit Ring 1 (Inner) — Radius 120 */}
            <circle cx="300" cy="300" r="120" stroke="rgba(30,107,147,0.20)" strokeWidth="1.2" strokeDasharray="6 6" fill="none" />
            <circle cx="300" cy="180" r="3" fill="#32C5E8" opacity="0.6" />
            <circle cx="300" cy="420" r="3" fill="#32C5E8" opacity="0.6" />

            {/* Orbit Ring 2 (Middle) — Radius 200 */}
            <circle cx="300" cy="300" r="200" stroke="rgba(30,107,147,0.16)" strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
            <circle cx="100" cy="300" r="3.5" fill="#1E6B93" opacity="0.6" />
            <circle cx="500" cy="300" r="3.5" fill="#1E6B93" opacity="0.6" />

            {/* Orbit Ring 3 (Outer) — Radius 270 */}
            <circle cx="300" cy="300" r="270" stroke="rgba(30,107,147,0.12)" strokeWidth="1" strokeDasharray="8 8" fill="none" />
          </svg>

          {/* Central Sun Node: ExESS Core IC Package */}
          <div className="absolute z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-900 border-2 border-primary/50 shadow-soft-lg flex flex-col items-center justify-center p-2 text-center group cursor-pointer transition-transform duration-500 hover:scale-105">
            <div className="w-8 h-8 mb-1 flex items-center justify-center text-accent">
              <Logo size={28} color="#32C5E8" />
            </div>
            <span className="font-brand text-xs text-white tracking-wider">Ex<span className="text-accent">ESS</span></span>
            <span className="text-[7.5px] font-mono text-cyan-300 uppercase tracking-widest mt-0.5">CORE_IC</span>
          </div>

          {/* Orbital Ring 1 (Inner) Container */}
          <div
            className="absolute z-10 w-[240px] h-[240px] rounded-full pointer-events-none"
            style={{
              animation: 'spin 40s linear infinite',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {orbitMembersInner.map((m, idx) => {
              const rad = (m.angle * Math.PI) / 180
              const x = 120 + 120 * Math.cos(rad) - 24
              const y = 120 + 120 * Math.sin(rad) - 24
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="absolute pointer-events-auto cursor-pointer group"
                  style={{ left: `${x}px`, top: `${y}px` }}
                >
                  <div
                    className="w-12 h-12 rounded-full border-2 border-primary bg-white shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-125 group-hover:border-accent group-hover:shadow-soft-lg"
                    style={{
                      animation: 'spin 40s linear infinite reverse',
                      animationPlayState: isPaused ? 'paused' : 'running',
                    }}
                  >
                    <span className="font-brand font-bold text-xs text-primary group-hover:text-accent">
                      {m.initials}
                    </span>
                  </div>
                  {/* Tooltip on Hover */}
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white px-2.5 py-1 rounded-lg text-[9px] font-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md z-30">
                    {m.name} • <span className="text-cyan-300">{m.role}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Orbital Ring 2 (Middle) Container — Reverse Spin */}
          <div
            className="absolute z-10 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              animation: 'spin 60s linear infinite reverse',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {orbitMembersMiddle.map((m) => {
              const rad = (m.angle * Math.PI) / 180
              const x = 200 + 200 * Math.cos(rad) - 26
              const y = 200 + 200 * Math.sin(rad) - 26
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="absolute pointer-events-auto cursor-pointer group"
                  style={{ left: `${x}px`, top: `${y}px` }}
                >
                  <div
                    className="w-13 h-13 rounded-full border-2 border-primary/70 bg-white shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-125 group-hover:border-accent group-hover:shadow-soft-lg"
                    style={{
                      animation: 'spin 60s linear infinite',
                      animationPlayState: isPaused ? 'paused' : 'running',
                    }}
                  >
                    <span className="font-brand font-bold text-xs text-primary group-hover:text-accent">
                      {m.initials}
                    </span>
                  </div>
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white px-2.5 py-1 rounded-lg text-[9px] font-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md z-30">
                    {m.name} • <span className="text-cyan-300">{m.role}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Orbital Ring 3 (Outer) Container */}
          <div
            className="absolute z-10 w-[540px] h-[540px] rounded-full pointer-events-none"
            style={{
              animation: 'spin 85s linear infinite',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {orbitMembersOuter.map((m) => {
              const rad = (m.angle * Math.PI) / 180
              const x = 270 + 270 * Math.cos(rad) - 24
              const y = 270 + 270 * Math.sin(rad) - 24
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="absolute pointer-events-auto cursor-pointer group"
                  style={{ left: `${x}px`, top: `${y}px` }}
                >
                  <div
                    className="w-12 h-12 rounded-full border-2 border-slate-300 bg-white shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-125 group-hover:border-primary group-hover:shadow-soft-lg"
                    style={{
                      animation: 'spin 85s linear infinite reverse',
                      animationPlayState: isPaused ? 'paused' : 'running',
                    }}
                  >
                    <span className="font-brand font-bold text-[11px] text-slate-700 group-hover:text-primary">
                      {m.initials}
                    </span>
                  </div>
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white px-2.5 py-1 rounded-lg text-[9px] font-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md z-30">
                    {m.name} • <span className="text-cyan-300">{m.role}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── 2. "Meet the ExESS Team" Dedicated Trigger Button ───────────────────── */}
        <div className="flex justify-center pt-4">
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

      {/* ── 3. Individual Member Detail Popover Card ─────────────────── */}
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
                          <TeamMemberCardModal key={m.id} member={m} />
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
