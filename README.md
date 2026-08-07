# ExESS — Electronics Students Society Website

Official website of the **Electronics Students Society (ExESS)**, College of Engineering Chengannur.

## Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS**
- **Framer Motion**
- **GSAP** + ScrollTrigger
- **Lenis** (smooth scroll)
- **Lucide React** (icons)

## Design Language

- **Light theme only** — `#F8FAFC` background
- **Engineering aesthetic** — PCB traces, circuit patterns, signal flow
- **Premium minimal** — large whitespace, soft shadows, 20px rounded cards
- **Corporate precision** — Space Grotesk + Inter typography

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| Primary | `#1E6B93` | Brand, buttons, accents |
| Secondary | `#187AA3` | Gradients, hover states |
| Accent | `#32C5E8` | Highlights, signals, orbit |
| Background | `#F8FAFC` | Page background |
| Card | `#FFFFFF` | Card surfaces |
| Border | `#E5E7EB` | Subtle dividers |
| Heading | `#1F2937` | All headings |
| Body | `#6B7280` | Paragraph text |

## Project Structure

```
exess-website/
├── public/
│   └── exess-favicon.svg
├── src/
│   ├── components/
│   │   ├── IntroAnimation.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Team.jsx
│   │   ├── Events.jsx
│   │   ├── Projects.jsx
│   │   ├── Resources.jsx
│   │   ├── Gallery.jsx
│   │   ├── Alumni.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Sections

| Section | Description |
|---|---|
| **Intro Animation** | 2.5s GSAP sequence — pixels, traces, logo draw, orbit sweep |
| **Navbar** | Glassmorphism, scroll-aware, mobile responsive |
| **Hero** | Canvas PCB background, animated signal traces, stats |
| **About** | Mission, innovation hub, community, industry connect |
| **Team** | 8 core members with gradient avatars |
| **Events** | Filterable cards (Upcoming/Past), detail modal |
| **Projects** | 6 projects with category tags, status, detail modal |
| **Resources** | Study materials, lab manuals, video lectures |
| **Gallery** | Masonry grid with lightbox |
| **Alumni** | Testimonials + stats bar |
| **Contact** | Info + functional form with success state |
| **Footer** | Links, newsletter, social icons |

## Key Features

- **Smooth scroll** via Lenis with GSAP ScrollTrigger sync
- **Scroll-triggered animations** using Framer Motion `useInView`
- **Interactive modals** for events, projects, and gallery
- **Responsive design** — mobile-first, all breakpoints
- **No backend** — fully frontend, static data

## License

MIT — ExESS, College of Engineering Chengannur
