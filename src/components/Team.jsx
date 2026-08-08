import { useState } from 'react'
import { Linkedin, Mail, Github, ChevronDown } from 'lucide-react'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import {
  facultyCoordinator,
  executiveCommittee,
  officeBearers,
  committeeMembers,
} from '../data/teamData'

// Team dataset for 2025-2026
const team2025 = [
  facultyCoordinator,
  ...executiveCommittee,
  ...officeBearers,
  ...committeeMembers,
]

// Team dataset for 2024-2025 (Previous Term)
const team2024 = [
  facultyCoordinator,
  {
    id: 'prev-1',
    name: 'Siddharth V',
    role: 'Former Chairperson',
    department: 'Final Year, ECE',
    initials: 'SV',
    image: null,
    socials: { linkedin: 'https://linkedin.com', email: 'siddharth@exess-cec.org' },
  },
  {
    id: 'prev-2',
    name: 'Gautam Ram',
    role: 'Former Vice Chair',
    department: 'Final Year, ECE',
    initials: 'GR',
    image: null,
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    id: 'prev-3',
    name: 'Riya Joseph',
    role: 'Former Secretary',
    department: 'Final Year, ECE',
    initials: 'RJ',
    image: null,
    socials: { linkedin: 'https://linkedin.com', email: 'riya@exess-cec.org' },
  },
  {
    id: 'prev-4',
    name: 'Nikhil K',
    role: 'Former Tech Lead',
    department: 'Final Year, ECE',
    initials: 'NK',
    image: null,
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
]

const TeamMemberCard = ({ member }) => (
  <div className="group w-60 sm:w-68 flex-shrink-0 bg-white rounded-3xl border border-border/70 p-5 shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
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
      <p className="text-xs font-inter text-gray-500 mb-3">{member.department || member.year}</p>
    </div>

    {member.socials && (
      <div className="flex gap-2 pt-3 border-t border-border/40">
        {member.socials.linkedin && (
          <a
            href={member.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-xl bg-primary/[0.06] flex items-center justify-center hover:bg-primary hover:text-white text-gray-500 transition-colors"
            title="LinkedIn Profile"
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
            title="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        )}
        {member.socials.email && (
          <a
            href={`mailto:${member.socials.email}`}
            className="w-7 h-7 rounded-xl bg-primary/[0.06] flex items-center justify-center hover:bg-primary hover:text-white text-gray-500 transition-colors"
            title="Send Email"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    )}
  </div>
)

const Team = () => {
  const [selectedYear, setSelectedYear] = useState('2025–2026')

  const activeMembers = selectedYear === '2025–2026' ? team2025 : team2024
  // Duplicate array for seamless infinite marquee loop
  const marqueeList = [...activeMembers, ...activeMembers]

  return (
    <section id="team" className="relative section-gap overflow-hidden">
      <div className="section-padding relative z-10 max-w-7xl mx-auto">
        <PowerOnHeader
          badge="Executive Leadership"
          headline={<>Meet the <span className="text-light-sweep-dark">Minds</span> Behind ExESS</>}
          description="Faculty mentors and student leaders driving technical bootcamps, hardware research, and departmental initiatives."
        />

        {/* Year Selector Control */}
        <div className="flex items-center justify-center gap-3 my-6">
          <span className="text-xs font-brand uppercase tracking-wider text-gray-500 font-semibold">
            Select Term:
          </span>
          <div className="relative inline-block">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-white border border-border/80 rounded-2xl px-5 py-2.5 pr-10 font-brand text-xs text-primary font-bold shadow-soft hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              <option value="2025–2026">TEAM 2025–2026</option>
              <option value="2024–2025">TEAM 2024–2025</option>
            </select>
            <ChevronDown className="w-4 h-4 text-primary absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Seamless Infinite Horizontal Marquee Track */}
        <div className="relative w-full overflow-hidden my-6 py-4 group">
          {/* Subtle gradient side masks */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          <div className="flex gap-5 w-max animate-marquee group-hover:[animation-play-state:paused] will-change-transform">
            {marqueeList.map((m, idx) => (
              <TeamMemberCard key={`${m.id}-${idx}`} member={m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team
