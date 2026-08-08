import { Linkedin, Mail, Github } from 'lucide-react'
import PowerOnHeader from './PowerOnHeader'
import ImagePlaceholder from './ImagePlaceholder'
import {
  facultyCoordinator,
  executiveCommittee,
  officeBearers,
  committeeMembers,
} from '../data/teamData'

// Combined Team Members Array
const teamMembers = [
  facultyCoordinator,
  ...executiveCommittee,
  ...officeBearers,
  ...committeeMembers,
]

// Duplicate array for 100% seamless infinite marquee loop
const marqueeList = [...teamMembers, ...teamMembers]

const TeamMemberCard = ({ member }) => (
  <div className="group w-72 sm:w-80 h-[380px] sm:h-[420px] flex-shrink-0 bg-white rounded-3xl border border-border/70 p-4 shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
    {/* Upper 60-65%: Member Photo Visual Focus */}
    <div className="w-full h-[62%] rounded-2xl overflow-hidden relative bg-slate-100">
      <ImagePlaceholder
        src={member.image}
        alt={member.name}
        type="avatar"
        aspectRatio="w-full h-full"
        initials={member.initials}
      />
    </div>

    {/* Lower 35-40%: Clean Member Info & LinkedIn Link */}
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
  return (
    <section id="team" className="relative section-gap overflow-hidden">
      <div className="section-padding relative z-10">
        <PowerOnHeader
          headline={<>TEAM <span className="text-light-sweep-dark">2025–2026</span></>}
          align="left"
        />

        {/* Seamless Infinite Horizontal Marquee Track (Full Width, Large PRODDEC Scale Cards, No White Side Masks) */}
        <div className="relative w-full overflow-hidden my-6 py-4 group">
          <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused] will-change-transform">
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
