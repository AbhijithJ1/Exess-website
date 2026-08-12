import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import ImagePlaceholder from './ImagePlaceholder'
import {
  facultyCoordinator,
  executiveCommittee,
  officeBearers,
  committeeMembers,
} from '../data/teamData'

/**
 * Timeline Stagger Animation Component
 * Animates elements sequentially as they enter the viewport
 */
const TimelineAnimation = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: false, margin: '-10%' }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
)

/**
 * Vertical PCB Team Card — Executive Team only
 * Dark PCB avatar box, initials, badge, name, role & LinkedIn
 */
const TeamMemberCard = ({ person, badge = null }) => {
  const linkedinUrl = person.socials?.linkedin || 'https://linkedin.com/company/exess-cec'

  return (
    <div className="relative group bg-white border border-border/80 rounded-3xl p-5 shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 flex flex-col h-full">
      {/* Dark PCB Image / Avatar Area */}
      <div className="relative mb-5 rounded-2xl overflow-hidden border border-border/60">
        <ImagePlaceholder
          src={person.image}
          alt={person.name}
          type="avatar"
          aspectRatio="aspect-[4/5]"
          initials={person.initials}
          className="group-hover:scale-105 transition-transform duration-500"
        />
        {badge && (
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[9px] font-brand uppercase tracking-wider font-bold px-2.5 py-1 rounded-lg text-primary shadow-sm border border-border/60">
            {badge}
          </span>
        )}
      </div>

      {/* Name, Role & LinkedIn Connect Button */}
      <div className="flex items-end justify-between gap-3 pt-2 mt-auto">
        <div className="overflow-hidden">
          <h4 className="font-brand font-bold text-heading text-base sm:text-lg group-hover:text-primary transition-colors leading-snug truncate">
            {person.name}
          </h4>
          <p className="font-inter text-[11px] sm:text-xs font-semibold text-primary/90 uppercase tracking-wide mt-0.5 truncate">
            {person.role}
          </p>
        </div>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#0A66C2] hover:text-white hover:shadow-md transition-all border border-border/60 flex-shrink-0 group/link"
          aria-label={`Connect with ${person.name} on LinkedIn`}
        >
          <Linkedin className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
        </a>
      </div>
    </div>
  )
}


const Team = () => {
  return (
    <section id="team" className="relative section-gap overflow-hidden bg-slate-50/50">
      <div className="section-padding max-w-7xl mx-auto relative z-10">

        {/* ── 1. TIMELINE ANIMATION — SECTION HEADING ─────────────────────── */}
        <div className="mb-14 border-b border-border/60 pb-10 text-center">
          <TimelineAnimation delay={0.1}>
            <span className="text-[10px] font-brand uppercase tracking-[0.24em] text-primary font-bold block mb-2">
              CORE SYSTEM ARCHITECTS
            </span>
          </TimelineAnimation>

          <TimelineAnimation delay={0.2}>
            <h2 className="font-brand text-heading text-4xl sm:text-6xl font-bold tracking-tight leading-[1.0] text-light-sweep-dark">
              EXECUTIVE <span className="text-primary">TEAM</span>
            </h2>
          </TimelineAnimation>

          <TimelineAnimation delay={0.3}>
            <p className="font-inter text-body text-sm sm:text-base text-gray-600 mt-4 max-w-2xl mx-auto">
              The driving force behind ExESS. Our leadership structure facilitates technical events, hardware mentorship, and organisational growth.
            </p>
          </TimelineAnimation>
        </div>

        {/* ── 2. EXECUTIVE TEAM GRID (FACULTY + CORE LEADERS) ─────────────── */}
        <div className="relative max-w-5xl mx-auto mb-20">
          {/* Faculty Coordinator — Centered Top */}
          <div className="flex justify-center mb-10">
            <TimelineAnimation delay={0.4} className="w-full max-w-xs">
              <TeamMemberCard person={facultyCoordinator} badge="FACULTY" />
            </TimelineAnimation>
          </div>

          {/* Executive Committee Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {executiveCommittee.map((person, i) => (
              <TimelineAnimation key={person.id} delay={0.5 + i * 0.1}>
                <TeamMemberCard
                  person={person}
                  badge={person.role.includes('Chair') ? 'SYS_ADMIN' : 'CORE_EXEC'}
                />
              </TimelineAnimation>
            ))}
          </div>
        </div>

        {/* ── 3. EXTENDED COMMITTEE — SINGLE ROW MARQUEE ─────────────────── */}
        <div className="relative pt-16 border-t border-border/40">
          <TimelineAnimation delay={0.2} className="text-center mb-10">
            <h3 className="font-brand text-2xl sm:text-3xl font-bold text-heading uppercase tracking-tight">
              COMMITTEE &amp; OFFICE BEARERS
            </h3>
            <p className="text-xs font-inter text-gray-500 mt-2">
              The operational nodes maintaining ExESS systems across all domains
            </p>
          </TimelineAnimation>

          {/* Single row: all members combined, duplicated once for seamless loop */}
          <div className="relative overflow-hidden w-full py-4">
            <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max">
              {[...officeBearers, ...committeeMembers, ...officeBearers, ...committeeMembers].map((person, idx) => (
                <div key={`ext-${person.id}-${idx}`} className="w-52 sm:w-64 lg:w-72 flex-shrink-0">
                  <TeamMemberCard person={person} badge={officeBearers.includes(person) ? 'OFFICE_BEARER' : 'COMMITTEE'} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Team
