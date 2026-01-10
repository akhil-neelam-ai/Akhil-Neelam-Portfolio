# Design Guidelines for Akhil Neelam's Portfolio

## Design Approach
**Reference-Based:** Jaclyn Konzelmann's portfolio aesthetic - clean, professional, elegant with generous whitespace and smooth transitions. Key adaptation: vertical sidebar navigation instead of horizontal top nav.

## Layout System

### Navigation Structure
- **Fixed vertical sidebar** (left-aligned, ~280px width on desktop)
- Height: 100vh, positioned fixed
- Navigation items: Work, Speaking, Experience, Bio, Personal, Contact
- Active section indicator with subtle accent treatment
- Mobile: Collapses to hamburger menu (top-right), slide-in overlay navigation
- Navigation links trigger smooth scroll to sections

### Spacing Framework
Use Tailwind spacing units: **4, 6, 8, 12, 16, 20, 24, 32** for consistent rhythm
- Section padding: `py-20 md:py-32` for major sections
- Container: `max-w-6xl mx-auto px-6 md:px-8`
- Main content area: `ml-0 md:ml-[280px]` (offset for fixed sidebar)
- Card spacing: `gap-8 md:gap-12` for grid layouts
- Element spacing: `space-y-6` for stacked content

### Grid Patterns
- **Hero:** Full-width, centered content with image
- **Work Showcase:** 2-column grid on desktop (`grid-cols-1 lg:grid-cols-2`), single column mobile
- **Experience Timeline:** Single column with expandable cards
- **Speaking:** Masonry-style image grid (3-4 columns desktop, 2 tablet, 1 mobile)

## Typography Hierarchy

**Font Families:**
- Headings: Playfair Display (serif, elegant)
- Body: Open Sans (sans-serif, readable)

**Scale:**
- Hero headline: `text-5xl md:text-7xl font-bold` (Playfair)
- Hero subheadline: `text-xl md:text-2xl font-light` (Playfair)
- Section headings: `text-4xl md:text-5xl font-bold mb-4` (Playfair)
- Subsection headings: `text-2xl md:text-3xl font-semibold` (Playfair)
- Card titles: `text-xl md:text-2xl font-semibold` (Playfair)
- Body text: `text-base md:text-lg leading-relaxed` (Open Sans)
- Metadata/labels: `text-sm uppercase tracking-wider` (Open Sans)

## Component Specifications

### 1. Vertical Sidebar Navigation
- Background treatment with subtle transparency or solid fill
- Logo/name at top, navigation items stacked vertically with generous spacing (`space-y-8`)
- Each nav item: hover state with accent color, active state with indicator line
- Footer area: social links (LinkedIn, email icons)
- Smooth animations on hover and active states

### 2. Hero Section
- **Layout:** Full viewport height option (`min-h-screen`), centered content
- **Image:** Professional headshot (uploaded avatar) - either as background with overlay or prominent circular image
- **Content:** Name as large heading, tagline highlighting "UC Berkeley MBA | Founder | Product Leader"
- **CTA buttons:** "View Work" and "Download Resume" with blur backdrop if over image
- Scroll indicator at bottom

### 3. About/Bio Section
- Two-column layout on desktop: text + key highlights/stats
- **Stats callouts:** "140+ volunteers mobilized", "3M students reached", "15+ global forums"
- Paragraph text with generous line-height
- Pull quote or highlighted mission statement

### 4. Work Showcase Section
- **Project cards** in 2-column grid:
  - Featured image or icon
  - Project title (Playfair, bold)
  - Organization/context (Open Sans, metadata style)
  - Brief description (2-3 lines)
  - Tags for technologies/impact areas
  - "Learn more" link
- Featured projects: Uniblox AI internship, CGAP repository platform, WhatsApp learning bot, AI partnerships in government

### 5. Experience Timeline
- **Vertical timeline** design with cards
- Each position card:
  - Date range (metadata style, accent color)
  - Company/organization name (heading)
  - Role title (subheading)
  - Expandable achievements (initially show 2-3, "View milestones" to expand)
- Visual timeline connector line on left side of cards
- Highlight UC Berkeley MBA prominently

### 6. Speaking & Impact Section
- **Image grid** showcasing speaking engagements and CGAP activities
- 3-4 columns on desktop, responsive to 2 then 1
- Hover overlay with event name and location
- Caption below grid mentioning "Featured at UN Women, G20, 15+ global forums"

### 7. Contact Section
- **Simple, centered layout:**
  - Heading "Let's Connect"
  - Email address (clickable mailto)
  - LinkedIn profile link with icon
  - **Resume download button** (styled prominently, triggers PDF download)
  - Optional: Brief call-to-action text

## Images

### Required Images:
1. **Hero Image:** Professional headshot of Akhil (uploaded avatar) - use as either large circular image beside text or as subtle background with gradient overlay
2. **Speaking/Impact Gallery:** Create placeholder grid for 9-12 images representing speaking engagements, CGAP events, and impact work - use aspect ratio 4:3 or 3:2
3. **Work Project Thumbnails:** 4 featured project cards, each needs representative image (can use screenshots, logos, or conceptual graphics)

### Image Treatment:
- Subtle rounded corners (`rounded-lg` or `rounded-xl`)
- Aspect ratios maintained with object-fit cover
- Lazy loading for performance
- Gentle hover scale effect on clickable images

## Interactions & Animations

- **Smooth scroll:** Implement scroll behavior for navigation links (CSS `scroll-behavior: smooth` or library)
- **Fade-in on scroll:** Sections animate in as user scrolls (subtle, professional)
- **Card hover states:** Gentle lift effect (`hover:-translate-y-1 transition-transform`)
- **Button states:** Maintain Shadcn default button interactions
- **Timeline expansion:** Smooth height transition when revealing milestones
- Avoid excessive or distracting animations - keep it professional

## Responsive Behavior

**Desktop (lg: 1024px+):**
- Fixed sidebar navigation visible
- Multi-column grids active
- Full typography scale

**Tablet (md: 768px-1023px):**
- Sidebar collapses to hamburger
- 2-column grids where applicable
- Slightly reduced typography scale

**Mobile (< 768px):**
- Hamburger menu navigation
- All content single column
- Reduced spacing and typography
- Maintain readability and touch-friendly targets (min 44px)

## Accessibility
- Semantic HTML structure
- ARIA labels for navigation and interactive elements
- Keyboard navigation support for all interactive components
- Sufficient contrast ratios (WCAG AA minimum)
- Focus states clearly visible
- Alt text for all images