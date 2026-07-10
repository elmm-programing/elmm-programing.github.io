## ADDED Requirements

### Requirement: Hero professional tagline
The hero section SHALL display the professional tagline `Senior Full-Stack Developer | React · Vue · Next.js · Nuxt.js · Node.js · Go | Remote LATAM` as a small-caps uppercase eyebrow immediately above the H1 headline.

#### Scenario: Tagline renders above the headline
- **WHEN** the hero section loads
- **THEN** the tagline SHALL appear as a visually distinct eyebrow (uppercase, tracking-wider, smaller font) directly above the H1, filling the vertical gap left by the removed image

#### Scenario: Tagline is responsive
- **WHEN** the viewport is 320px wide
- **THEN** the tagline SHALL wrap gracefully without horizontal overflow, using a smaller font size than on desktop

### Requirement: Hero stack-signature pills
The hero section SHALL display a row of 6 pill badges — React, Vue, Next.js, Nuxt.js, Node.js, Go — matching the stack pillars named in the tagline, replacing the former 5-icon grayscale strip.

#### Scenario: Pills render in color
- **WHEN** the hero section loads
- **THEN** the 6 stack pills SHALL be rendered in full color (not grayscale), with the primary accent, as horizontally-laid badges

#### Scenario: Pills scroll on mobile
- **WHEN** the viewport is too narrow to fit all 6 pills in one row
- **THEN** the pill row SHALL scroll horizontally with no visible scrollbar, and the pills SHALL not wrap

### Requirement: Skills section with pill chips and full category coverage
The skills section SHALL render each skill as a pill chip (not a bullet) and SHALL provide a distinct icon and accent color for every category present in `skills.json`, covering at minimum Frontend, Backend, Databases / DevOps, State Management & Data Fetching, Mobile, AI Tooling, Security, and Workflow & Collaboration.

#### Scenario: Skills render as pills
- **WHEN** the skills section loads with data
- **THEN** each skill SHALL render as a pill chip with adequate padding, not as a bullet-prefixed text item

#### Scenario: Every category has a dedicated icon
- **WHEN** a category from `skills.json` is rendered
- **THEN** the category header SHALL display an icon specific to that category (no generic fallback `Code` icon for the 8 known categories)

#### Scenario: Category accent color
- **WHEN** a category card renders
- **THEN** the category SHALL have a consistent accent color applied to its header bar and icon background, distinct from adjacent categories

### Requirement: Certifications grouped by provider type
The certifications section SHALL group certifications into two labeled groups — "Skill Validations" (HackerRank) and "Course Completions" (Zero To Mastery Academy) — each rendered as a compact list, not a uniform 3-up card grid.

#### Scenario: HackerRank certs grouped under Skill Validations
- **WHEN** the certifications section loads
- **THEN** all certifications with `provider` matching "HackerRank" SHALL appear under a "Skill Validations" group header

#### Scenario: Zero To Mastery certs grouped under Course Completions
- **WHEN** the certifications section loads
- **THEN** all certifications with `provider` containing "Zero To Mastery" SHALL appear under a "Course Completions" group header

#### Scenario: Unknown provider falls back to a third group
- **WHEN** a certification's provider matches neither HackerRank nor Zero To Mastery
- **THEN** it SHALL render under an "Other" group header

#### Scenario: Achievement text is prominent
- **WHEN** a certification row renders
- **THEN** the `achievement` text SHALL be visible at the same visual weight as the certification name, not hidden in a small secondary line

### Requirement: Project case studies with numbered index and accent rail
Each project case-study card SHALL display a large faded index number (01, 02, 03...) and a left accent rail, and the Challenge/Solution/Impact triad SHALL render as a 3-column grid on desktop (md+ breakpoints) instead of stacking vertically.

#### Scenario: Numbered index per card
- **WHEN** a project card renders
- **THEN** a large, low-opacity index number SHALL appear in the card, reflecting the project's position in the list (1-based, zero-padded to 2 digits)

#### Scenario: Left accent rail
- **WHEN** a project card renders
- **THEN** a vertical accent rail (primary color) SHALL appear on the left edge of the card

#### Scenario: Triad is 3-column on desktop
- **WHEN** the viewport is md (768px) or wider
- **THEN** the Challenge, Solution, and Impact blocks SHALL render side-by-side in a 3-column grid

#### Scenario: Triad stacks on mobile
- **WHEN** the viewport is narrower than md (768px)
- **THEN** the Challenge, Solution, and Impact blocks SHALL stack vertically in a single column

### Requirement: About section grounded in CV facts
The About section SHALL display three value-prop cards grounded in the owner's actual CV: "Federal Audit-Grade Reliability" (99.9% uptime on SIGEF 2), "Backend-First Full-Stack" (Go + Node.js microservices with React/Vue frontend), and "Mentor & Code-Review Lead" (mentoring mid/junior engineers, PR review standards).

#### Scenario: Reliability card references SIGEF 2
- **WHEN** the About section renders
- **THEN** one card SHALL mention 99.9% uptime and SIGEF 2 / federal audit context

#### Scenario: Backend-first card references Go and Node.js
- **WHEN** the About section renders
- **THEN** one card SHALL mention Go and Node.js microservices as the primary backend, with React/Vue as the frontend

#### Scenario: Mentor card references code review and mentorship
- **WHEN** the About section renders
- **THEN** one card SHALL mention mentoring mid/junior engineers and leading code reviews / PR standards

#### Scenario: Body copy references SIGEF 2 and Ministerio de Hacienda
- **WHEN** the About section body copy renders
- **THEN** it SHALL reference SIGEF 2, the Ministerio de Hacienda, and the async-first remote LATAM working style

### Requirement: Dark mode default with toggle
The site SHALL default to dark mode on first visit (no stored preference), persist the user's choice to `localStorage`, and provide a sun/moon toggle button in the NavBar accessible from both desktop and mobile layouts.

#### Scenario: First visit defaults to dark
- **WHEN** a user visits with no `localStorage` theme preference
- **THEN** the site SHALL render in dark mode (the `dark` class on `<html>`)

#### Scenario: No flash of light mode on load
- **WHEN** the page loads with a stored dark preference
- **THEN** an inline script in `index.html` SHALL set the `dark` class before Vue mounts, preventing a flash of light mode

#### Scenario: Toggle switches and persists
- **WHEN** the user clicks the theme toggle
- **THEN** the theme SHALL switch between dark and light, and the choice SHALL be saved to `localStorage` under a `theme` key

#### Scenario: Toggle is keyboard accessible
- **WHEN** the toggle is focused and the user presses Enter or Space
- **THEN** the theme SHALL toggle

### Requirement: Scroll-aware NavBar with active-section indicator
The NavBar SHALL intensify its background on scroll and SHALL highlight the navigation link matching the section currently in view, using an IntersectionObserver.

#### Scenario: Background intensifies on scroll
- **WHEN** the user scrolls down past the hero
- **THEN** the NavBar background SHALL become more opaque (stronger glass effect) than at the top of the page

#### Scenario: Active link reflects current section
- **WHEN** a section is in the viewport center
- **THEN** its corresponding NavBar link SHALL be styled with the primary color and an underline indicator

#### Scenario: No false active link
- **WHEN** no section is clearly in view (e.g., at the very bottom in the footer)
- **THEN** no NavBar link SHALL be marked active (graceful fallback rather than a wrong highlight)

### Requirement: Footer with direct contact links and dynamic year
The Footer SHALL include clickable email (`elmm.programing@gmail.com`) and phone (`+1 849 442 4113`) links alongside the existing GitHub and LinkedIn icons, and SHALL display a dynamic copyright year computed from the current date.

#### Scenario: Email link is clickable
- **WHEN** the footer renders
- **THEN** the email SHALL be an `mailto:` link that opens the user's email client

#### Scenario: Phone link is clickable
- **WHEN** the footer renders
- **THEN** the phone number SHALL be a `tel:` link with the visible text in human-readable format (`+1 849 442 4113`)

#### Scenario: Copyright year is dynamic
- **WHEN** the footer renders in year N
- **THEN** the copyright line SHALL display `© N Edwin Levinson. All rights reserved.` with N computed from `new Date().getFullYear()`

### Requirement: No new runtime dependencies
The UI improvements SHALL be implemented using only existing dependencies (Vue 3, Tailwind v4, lucide-vue-next). No new packages SHALL be added to `package.json`.

#### Scenario: package.json dependencies unchanged
- **WHEN** the change is merged
- **THEN** the `dependencies` and `devDependencies` keys in `package.json` SHALL contain no entries that were not present before this change