/**
 * ExESS Executive Committee & Team Data
 * Categorized data for Faculty Coordinator, Executive Committee, Office Bearers, and Committee Members
 */

export const facultyCoordinator = {
  id: 'fac-coord',
  name: 'Dr. Elizabeth George',
  role: 'Faculty Coordinator',
  category: 'Faculty Coordinator',
  department: 'Associate Professor, ECE Dept.',
  initials: 'EG',
  image: null,
  bio: 'Guides ExESS technical workshops, hardware research projects, and departmental academic initiatives.',
  socials: {
    linkedin: 'https://linkedin.com',
    email: 'elizabeth@cec.ac.in',
  },
}

export const executiveCommittee = [
  {
    id: 'ak-chair',
    name: 'Aditya Krishnan',
    role: 'Chairperson',
    category: 'Executive Committee',
    year: 'Final Year, ECE',
    initials: 'AK',
    image: null,
    bio: 'Specializes in Embedded Real-Time Operating Systems (RTOS) and FPGA prototyping.',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'aditya@exess-cec.org',
    },
  },
  {
    id: 'mn-vice',
    name: 'Meera Nair',
    role: 'Vice Chairperson',
    category: 'Executive Committee',
    year: 'Final Year, ECE',
    initials: 'MN',
    image: null,
    bio: 'Focuses on RF System Architecture and Microwave Antenna design.',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'meera@exess-cec.org',
    },
  },
  {
    id: 'rm-sec',
    name: 'Rahul Menon',
    role: 'Secretary',
    category: 'Executive Committee',
    year: 'Third Year, ECE',
    initials: 'RM',
    image: null,
    bio: 'Passionate about Mixed-Signal Circuit Design and Analog Front-Ends.',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'rahul@exess-cec.org',
    },
  },
  {
    id: 'ar-tech',
    name: 'Anjali Rajesh',
    role: 'Technical Head',
    category: 'Executive Committee',
    year: 'Third Year, ECE',
    initials: 'AR',
    image: null,
    bio: 'Leads VLSI Design workshops and Digital Signal Processing (DSP) initiatives.',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'anjali@exess-cec.org',
    },
  },
]

export const officeBearers = [
  {
    id: 'vs-event',
    name: 'Vivek Soman',
    role: 'Event Coordinator',
    category: 'Office Bearers',
    year: 'Third Year, ECE',
    initials: 'VS',
    image: null,
    bio: 'Coordinates national-level hackathons and hands-on PCB soldering bootcamps.',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'vivek@exess-cec.org',
    },
  },
  {
    id: 'pt-design',
    name: 'Priya Thomas',
    role: 'Design Lead',
    category: 'Office Bearers',
    year: 'Third Year, ECE',
    initials: 'PT',
    image: null,
    bio: 'Architects hardware CAD schematics and visual graphics for ExESS events.',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'priya@exess-cec.org',
    },
  },
  {
    id: 'kd-proj',
    name: 'Kiran Das',
    role: 'Project Lead',
    category: 'Office Bearers',
    year: 'Third Year, ECE',
    initials: 'KD',
    image: null,
    bio: 'Oversees student hardware projects, sensor mesh networks, and IoT prototypes.',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'kiran@exess-cec.org',
    },
  },
  {
    id: 'sm-pr',
    name: 'Sneha Mohan',
    role: 'Public Relations',
    category: 'Office Bearers',
    year: 'Second Year, ECE',
    initials: 'SM',
    image: null,
    bio: 'Manages Industry-Academia outreach and alumni technical mentorship programs.',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'sneha@exess-cec.org',
    },
  },
]

export const committeeMembers = [
  {
    id: 'ab-comm',
    name: 'Arjun B',
    role: 'Web & Media Lead',
    category: 'Committee Members',
    year: 'Second Year, ECE',
    initials: 'AB',
    image: null,
    bio: 'Maintains the official ExESS website and digital event branding.',
  },
  {
    id: 'sk-comm',
    name: 'Siddharth K',
    role: 'Workshop Volunteer',
    category: 'Committee Members',
    year: 'Second Year, ECE',
    initials: 'SK',
    image: null,
    bio: 'Assists in soldering tool setups and hardware component logistics.',
  },
  {
    id: 'dv-comm',
    name: 'Devika V',
    role: 'Content & Editorial',
    category: 'Committee Members',
    year: 'Second Year, ECE',
    initials: 'DV',
    image: null,
    bio: 'Writes technical articles and documents ExESS project showcases.',
  },
  {
    id: 'rn-comm',
    name: 'Rohan N',
    role: 'Hardware Lab Asst.',
    category: 'Committee Members',
    year: 'Second Year, ECE',
    initials: 'RN',
    image: null,
    bio: 'Manages oscilloscope equipment and microcontroller kit inventory.',
  },
]

export const allTeamCategories = [
  { title: 'Faculty Coordinator', members: [facultyCoordinator] },
  { title: 'Executive Committee', members: executiveCommittee },
  { title: 'Office Bearers', members: officeBearers },
  { title: 'Committee Members', members: committeeMembers },
]
