## Context

The portfolio is a Vue 3 + Vite + Tailwind v4 SSG with 7 components (`Introduction`, `NavBar`, `Skills`, `Cert`, `Projects`, `About`, `Footer`) reading hardcoded JSON via `PortfolioService`. The hero image was just removed, leaving a visual gap. The current design is a 2022-era template: flat bullet lists for skills, identical cards for certs, undifferentiated text blocks for projects, and generic "Security First / Real Scalability" About cards that don't match the CV (Go microservices, SIGEF 2, 99.9% federal-audit uptime). The site has dark-mode classes everywhere but defaults to light with no toggle.

The owner's CV establishes the real identity: Senior Full-Stack Developer, Go + Node.js backend specialist, SIGEF 2 at Ministerio de Hacienda, React/Vue/Next/Nuxt frontend, Remote LATAM. The tagline `Senior Full-Stack Developer | React · Vue · Next.js · Nuxt.js · Node.js · Go | Remote LATAM` is the canonical professional line.

## Goals / Non-Goals

**Goals:**
- Fill the hero gap with the professional tagline as a prominent identity line.
- Make the portfolio visually match the senior-engineer caliber of the CV.
- Cover all 8 skill categories with proper icons/colors (currently only 3 covered).
- Distinguish HackerRank skill validations from Zero To Mastery course completions in certs.
- Add visual hierarchy and accent to project case studies without reintroducing images.
- Ground the About section in real CV facts (SIGEF 2, 99.9% uptime, Go, mentorship).
- Make dark mode the default with a toggle, since the dark palette is already wired.
- Add scroll-aware nav with active-section indication.
- Add direct email + phone to the footer; dynamic copyright year.

**Non-Goals:**
- Changing data shapes, `PortfolioService`, or `public/data/*.json`.
- Adding new runtime dependencies.
- Reintroducing images to project cards or the hero.
- Redesigning the overall page structure (section order stays: Hero → Projects → Skills → Certs → About → Footer).
- Fixing the pre-existing broken test assertions (separate concern; new class names will be reflected where tests actually run).
- Building a blog, contact form backend, or analytics.

## Decisions

### Decision 1: Hero tagline as an eyebrow above the H1, not a sub-headline below
**Choice:** Place the tagline `Senior Full-Stack Developer | React · Vue · Next.js · Nuxt.js · Node.js · Go | Remote LATAM` as a small-caps uppercase eyebrow *above* the H1, and keep the existing subtitle below. The H1 stays the visual anchor.
**Rationale:** The gap left by the image is vertical space, not hierarchy. An eyebrow above the H1 is the standard senior-portfolio pattern (establishes identity before the value-proposition headline). Putting it below the H1 would compete with the existing subtitle.
**Alternatives considered:**
- Tagline below H1, above subtitle — rejected (crowds the H1; two text lines stack awkwardly).
- Tagline replacing the subtitle — rejected (the subtitle "Vue.js, Nuxt 3 and TypeScript specialist..." carries different info; both are useful).

### Decision 2: Replace the 5-icon grayscale strip with a pill-badge "stack signature"
**Choice:** Replace the current `grayscale opacity-60 hover:grayscale-0` icon row (Vue.js, Nuxt 3, TypeScript, Tailwind CSS, Go) with a row of pill badges showing the 6 stack pillars from the tagline (React, Vue, Next.js, Nuxt.js, Node.js, Go), always in color, horizontally scrollable on mobile.
**Rationale:** The grayscale strip reads as an afterthought and the 5 items don't match the tagline's 6 pillars. Pills are denser, match the tagline, and work on mobile via overflow-x. Always-color signals confidence vs. the current "shy" grayscale.
**Alternatives considered:**
- Keep grayscale strip, just update items — rejected (doesn't solve the visual weakness).
- Logo wall with brand SVGs — rejected (logo licensing/weight; pills are lighter and on-brand).

### Decision 3: Skills as pill chips with per-category accent, 8 categories
**Choice:** Each skill category gets a header with an accent bar (color per category), an icon (extend the icon map to all 8 categories), and skills rendered as pill chips instead of bullet lists. Layout stays 3-column on desktop but cards are denser.
**Rationale:** Bullets are low-information-density. Pills are scannable and modern. The current icon map only covers 3 of 8 categories — the other 5 fall back to a generic `Code` icon, which looks broken. Extending the map to all 8 (State Management → `Boxes`, Mobile → `Smartphone`, AI Tooling → `Sparkles`, Security → `ShieldCheck`, Workflow → `Users`) makes every card feel intentional.
**Alternatives considered:**
- Single-column accordion — rejected (too much scrolling for 64 skills).
- Tag cloud with size by frequency — rejected (no frequency data; would be fake).

### Decision 4: Certifications as a two-group list, not a 3-up card grid
**Choice:** Group certifications by provider type: "Skill Validations" (HackerRank) and "Course Completions" (Zero To Mastery). Within each group, render a compact horizontal row per cert: icon + name + achievement + provider badge + "View" link. Two groups, not 8 identical cards.
**Rationale:** 8 identical cards in a 3-up grid wastes space and obscures the difference between a proctored skill test (HackerRank) and a course completion (ZTM). Grouping makes the distinction visible and is denser.
**Alternatives considered:**
- Timeline by date — rejected (no reliable date data in the hardcoded JSON).
- Keep 3-up grid, just add provider badge — rejected (doesn't solve the density problem).

### Decision 5: Project case studies with numbered index + left accent rail
**Choice:** Each project card gets a large faded index number (01, 02, 03) in the top-left corner, a left accent rail (primary color), and the Challenge/Solution/Impact triad gets a subtle 3-column grid on desktop (instead of stacked) to use horizontal space.
**Rationale:** Without images, the cards need a visual anchor. The numbered index + accent rail gives each card identity without imagery. The triad currently stacks vertically even on wide screens — a 3-col grid on `md+` uses the space and reads as a structured argument (problem → solution → result).
**Alternatives considered:**
- Reintroduce images — rejected (owner removed them deliberately).
- Tabs for Challenge/Solution/Impact — rejected (hides content; bad for SEO and skim-reading).

### Decision 6: About section grounded in CV facts
**Choice:** Replace "Security First" / "Real Scalability" with three cards grounded in the CV: "Federal Audit-Grade Reliability" (99.9% uptime on SIGEF 2), "Backend-First Full-Stack" (Go + Node.js microservices, React/Vue frontend), "Mentor & Code-Review Lead" (mentoring mid/junior engineers, PR standards). Body copy updated to reference SIGEF 2, Ministerio de Hacienda, Go, and the async-first remote LATAM detail.
**Rationale:** The current cards are generic buzzwords. The CV has concrete, impressive facts (99.9% federal-audit uptime, Go microservices, mentorship). Grounding the About section in those facts makes the portfolio honest and distinctive.
**Alternatives considered:**
- Keep generic cards, just restyle — rejected (the content is the problem, not the styling).
- Add a timeline of experience — rejected (the CV has one job; a timeline would be thin).

### Decision 7: Dark mode default + toggle in NavBar
**Choice:** Default to dark mode (set `class="dark"` on `<html>` via a small inline script in `index.html` to avoid FOUC, persisted to `localStorage`). Add a sun/moon toggle button in the NavBar (desktop + mobile).
**Rationale:** Developer portfolios suit dark mode; the dark palette is already fully wired. A toggle respects user preference. The inline script prevents a flash of light mode on load.
**Alternatives considered:**
- Light mode default, no toggle — rejected (current state; doesn't match senior-portfolio norms).
- Respect only `prefers-color-scheme` — rejected (no user control; toggle is expected).

### Decision 8: Scroll-aware NavBar with active-section indicator
**Choice:** NavBar background intensifies on scroll (currently the glass-nav is static). Add an `IntersectionObserver` that sets `activeSection` based on which section is in view; highlight the matching nav link with the primary color and an underline.
**Rationale:** The static nav feels unfinished. Active-section indication is standard UX and helps orientation on a single-page portfolio.
**Alternatives considered:**
- Scrollspy via scroll event — rejected (IntersectionObserver is more performant and simpler).

### Decision 9: Footer with direct contact + dynamic year
**Choice:** Add email (`elmm.programing@gmail.com`) and phone (`+1 849 442 4113`) as clickable links alongside GitHub/LinkedIn. Replace `© 2023` with `© {{ year }}` computed from `new Date().getFullYear()`.
**Rationale:** The CV lists direct contact; the footer should too. Hardcoded 2023 looks stale in 2026.
**Alternatives considered:**
- Contact form — rejected (no backend; mailto/email link is simpler and works on a static site).

## Risks / Trade-offs

- **[Risk] Dark-mode FOUC on first load** → Inline script in `index.html` `<head>` reads `localStorage` and sets `class="dark"` before Vue mounts. No flash.
- **[Risk] Active-nav IntersectionObserver edge cases** (short sections, footer) → Use `rootMargin` with a small top offset and threshold tuning; fall back gracefully (no active link is better than a wrong one).
- **[Risk] Pill chips overflow on narrow mobile** → `flex-wrap` on skills chips (wrap, don't scroll); horizontal scroll only on the hero stack-signature row (6 items, deliberate).
- **[Risk] 8 skill categories break the 3-column grid** (8 isn't divisible by 3) → Use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` and let the last row be uneven; acceptable, better than forcing a 9th placeholder.
- **[Trade-off] Numbered project indexes look editorial but may feel "bloggy"** → Accepted; the editorial tone matches a senior-engineer case-study presentation.
- **[Risk] Changing class names breaks the already-broken tests further** → Tests are pre-existing broken; this change doesn't make them more broken. New class names will be reflected in any test that actually runs.
- **[Trade-off] Dark-mode default may surprise users who expected light** → The toggle is prominent in the NavBar; preference persists via localStorage.

## Migration Plan

1. Add the inline dark-mode script to `index.html` (no visual change yet for light users).
2. Update `Introduction.vue` (eyebrow tagline + stack pills) — smallest, highest-impact change.
3. Update `NavBar.vue` (theme toggle + scroll-aware + active-section).
4. Update `Skills.vue` (pill chips + 8-category icon/color map).
5. Update `Cert.vue` (two-group layout).
6. Update `Projects.vue` (numbered index + accent rail + 3-col triad).
7. Update `About.vue` (CV-grounded cards + body copy).
8. Update `Footer.vue` (email/phone + dynamic year).
9. Add any new design tokens to `src/style.css`.
10. Build + manual smoke at 320px, 768px, 1280px in both light and dark.

**Rollback:** Each component is independent; revert any single component if it regresses. The dark-mode default is the only cross-cutting change — revert `index.html` + the toggle to restore light-default.

## Open Questions

1. **Tagline exact punctuation** — the owner wrote `Senior Full-Stack Developer | React · Vue · Next.js · Nuxt.js · Node.js · Go | Remote LATAM` with pipe separators and middle dots. Confirm this is the exact string (vs. commas or slashes). Default: use it verbatim.
2. **Phone link format** — `+1 849 442 4113` as `tel:+18494424113`? Default: yes, with the human-readable format as the visible text.
3. **Active-nav indicator style** — underline vs. background pill vs. color-only? Default: primary-color text + 2px underline, matches the existing section-header accent bar.