# Akhil Neelam Portfolio Website

## Overview
A professional portfolio website for Akhil Neelam, a UC Berkeley MBA student, co-founder, and product leader. The site showcases his work, speaking engagements, experience, and provides a way to connect with him.

## Recent Changes
- **Jan 10, 2026**: Initial implementation completed
  - Built full portfolio site with Hero, Work, Speaking, Experience, Bio, Personal, and Contact sections
  - Implemented custom vertical sidebar navigation per design_guidelines.md specifications
  - Added theme toggle for light/dark mode
  - Created resume download API endpoint
  - Added comprehensive data-testid attributes for testing

## Project Architecture

### Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Backend**: Express.js
- **Routing**: Wouter (frontend)

### Color Scheme
- Primary: #2C3E50 (Deep navy blue)
- Secondary/Accent: #E8B4B8 (Soft rose)
- Muted: #95A5A6 (Cool grey)
- Highlight: #3498DB (Electric blue)

### Key Design Decisions

#### Custom Vertical Sidebar Navigation
The navigation uses a **custom implementation** (not shadcn sidebar primitives) because:
1. User specifically requested "vertical navigation menu instead of horizontal" inspired by Jaclyn Konzelmann's website
2. The design_guidelines.md specifies a fixed 280px sidebar with specific behavior:
   - Smooth scroll to sections
   - Active section highlighting based on scroll position
   - Mobile hamburger menu overlay with Framer Motion animations
3. This portfolio-specific navigation pattern differs from typical app sidebar behavior (collapsible, icon mode, etc.)

### File Structure
```
client/src/
├── components/
│   ├── ui/              # shadcn components
│   ├── navigation.tsx   # Custom vertical sidebar
│   ├── theme-toggle.tsx # Light/dark mode toggle
│   ├── hero-section.tsx
│   ├── work-section.tsx
│   ├── speaking-section.tsx
│   ├── experience-section.tsx
│   ├── bio-section.tsx
│   ├── personal-section.tsx
│   └── contact-section.tsx
├── pages/
│   └── home.tsx         # Main page composing all sections
└── index.css            # Theme tokens and custom utilities

server/
└── routes.ts            # API routes including /api/resume
```

### API Endpoints
- `GET /api/resume` - Downloads the PDF resume file

## User Preferences
- Vertical fixed sidebar navigation (not horizontal)
- Specific color palette from design guidelines
- Framer Motion animations for smooth transitions
- Responsive mobile menu with hamburger icon
