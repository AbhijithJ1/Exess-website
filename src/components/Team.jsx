import { useState } from 'react'
import { Linkedin, ChevronDown } from 'lucide-react'
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

// Static Leadership Grid Card (Full Height & Grid-Adapted Width)
const LeadershipMemberCard = ({ member }) => (
  <div className="group bg-white rounded-3xl border border-border/70 p-4 shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-[380px] sm:h-[400px]">
    {/* Upper 62%: Member Photo Focus */}
    <div className="w-full h-[62%] rounded-2xl overflow-hidden relative bg-slate-100">
      <ImagePlaceholder
        src={member.image}
        alt={member.name}
        type="avatar"
        aspectRatio="w-full h-full"
        initials={member.initials}
      />
    </div>

    {/* Lower 38%: Name, Role & LinkedIn Link */}
    <div className="pt-3 px-2 flex items-end justify-between">
      <div>
        <h4 className="font-brand text-heading text-base sm:text-lg mb-0.5 tracking-tight group-hover:text-primary transition-colors">
          {member.name}
        </h4>
        <p className="text-[11px] font-brand uppercase tracking-wider text-primary font-semibold">
          {member.role}
        </p>
      </div>

      {member.socials && member.socials.linkedin && (
        <a
          href={member.socials.linkedin}
          target="_blank"
          rel="noreferrer"
          className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white text-gray-600 transition-colors flex-shrink-0"
          title="LinkedIn Profile"
        >
          <Linkedin className="w-4 h-4" />
        </a>
      )}
    </div>
  </div>
)

// Marquee Card (Fixed Width for Smooth Scrolling Track)
const TeamMemberCard = ({ member }) => (
  <div className="group w-72 sm:w-80 h-[380px] sm:h-[400px] flex-shrink-0 bg-white rounded-3xl border border-border/70 p-4 shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
    <div className="w-full h-[62%] rounded-2xl overflow-hidden relative bg-slate-100">
      <ImagePlaceholder
        src={member.image}
        alt={member.name}
        type="avatar"
        aspectRatio="w-full h-full"
        initials={member.initials}
      />
    </div>

    <div className="pt-3 px-2 flex items-end justify-between">
      <div>
        <h4 className="font-brand text-heading text-base sm:text-lg mb-0.5 tracking-tight group-hover:text-primary transition-colors">
          {member.name}
        </h4>
        <p className="text-[11px] font-brand uppercase tracking-wider text-primary font-semibold">
          {member.role}
        </p>
      </div>

      {member.socials && member.socials.linkedin && (
        <a
          href={member.socials.linkedin}
          target="_blank"
          rel="noreferrer"
          className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white text-gray-600 transition-colors flex-shrink-0"
          title="LinkedIn Profile"
        >
          <Linkedin className="w-4 h-4" />
        </a>
      )}
    </div>
  </div>
)

const Team = () => {
  const [selectedYear, setSelectedYear] = useState('2025–2026')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const activeMembers = selectedYear === '2025–2026' ? team2025 : team2024

  // Static Leadership tier (top 4 core leaders)
  const leadershipMembers = activeMembers.slice(0, 4)
  // Committee tier for marquee (remaining members)
  const committeeTier = activeMembers.slice(4)
  const marqueeList = committeeTier.length > 0 ? [...committeeTier, ...committeeTier] : [...activeMembers, ...activeMembers]

  return (
    <section id="team" className="relative section-gap overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto relative z-10">
        {/* Header Row with Title + Inline Right-Aligned Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-border/60 pb-6">
          <PowerOnHeader
            badge="EXECUTIVE LEADERSHIP"
            headline={<>EXECUTIVE <span className="text-light-sweep-dark">TEAM</span> {selectedYear}</>}
            description="Meet the faculty advisors and student leaders steering ExESS initiatives."
            align="left"
            className="mb-0"
          />

          {/* Inline Right-Aligned Year Switcher */}
          <div className="relative flex-shrink-0 self-start sm:self-end">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-border/80 text-xs font-brand font-bold text-primary shadow-soft hover:border-primary/40 transition-colors cursor-pointer"
            >
              <span>TEAM {selectedYear}</span>
              <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-12 z-30 w-44 bg-white rounded-2xl shadow-xl border border-border/80 py-2 space-y-1">
                {['2025–2026', '2024–2025'].map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year)
                      setDropdownOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-brand transition-colors ${
                      selectedYear === year
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-gray-600 hover:bg-slate-50'
                    }`}
                  >
                    TEAM {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── 1. Static Executive Leadership Grid (4 Columns Desktop) ──── */}
        <div className="mb-14">
          <span className="text-[11px] font-brand uppercase tracking-[0.20em] text-primary mb-4 block font-bold">
            CORE LEADERSHIP TIER
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipMembers.map((member) => (
              <LeadershipMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* ── 2. Secondary Committee Tier (Infinite Marquee) ──────────── */}
        {committeeTier.length > 0 && (
          <div className="pt-4">
            <span className="text-[11px] font-brand uppercase tracking-[0.20em] text-gray-500 mb-4 block font-bold">
              COMMITTEE &amp; OFFICE BEARERS
            </span>
            <div className="relative w-full overflow-hidden my-2 py-2 group">
              <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused] will-change-transform">
                {marqueeList.map((m, idx) => (
                  <TeamMemberCard key={`${m.id}-${idx}`} member={m} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Team
