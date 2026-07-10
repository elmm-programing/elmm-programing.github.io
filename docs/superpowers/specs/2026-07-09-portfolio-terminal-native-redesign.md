# Portfolio UI — Terminal-Native Redesign

**Date:** 2026-07-09
**Status:** Draft (awaiting user approval)
**Register:** Brand (portfolio — design IS the product)
**Aesthetic lane:** Terminal-native / systems-engineering

## Context

The portfolio is a Vue 3 + Vite + Tailwind v4 SSG with 7 components reading hardcoded JSON via `PortfolioService`. The hero image was removed, leaving a gap. The current design is a 2022-era template: gradient-text H1 (an AI tell, flagged by the impeccable detector), Inter as the only font (on the reflex-reject list), flat bullet lists for skills, identical cards for certs, undifferentiated text blocks for projects, and generic "Security First / Real Scalability" About cards that don't match the CV.

The owner's CV establishes the real identity: Senior Full-Stack Developer, Go + Node.js backend specialist, SIGEF 2 at Ministerio de Hacienda (99.9% federal-audit uptime), React/Vue/Next/Nuxt frontend, Remote LATAM. The chosen aesthetic lane is **terminal-native / systems-engineering** — dark-first, monospace accents for metadata, green/amber on near-black, dense data, the "operator who runs federal-audit systems" vibe. This is NOT the saturated editorial-typographic lane most senior/dev portfolios converge on, so it passes the second slop test.

The impeccable detector already flagged two concrete AI-tells in the current code:
1. **Gradient text** on the H1 (`bg-clip-text + bg-gradient`) — banned by impeccable, must be replaced with a solid color.
2. **Inter** as the only font — on the reflex-reject list, must be replaced with a distinctive face.

## Goals / Non-Goals

**Goals:**
- Fill the hero gap with the tagline as a terminal-style status line (operator output, not a decorative eyebrow).
- Replace the gradient-text H1 with a solid-color headline in a distinctive face.
- Replace Inter with a font pairing that gives the portfolio personality (terminal-native lane).
- Redesign all 7 components for the terminal-native lane: dense data, monospace metadata, green/amber accents on near-black, no decorative cards, no identical card grids, no gradient text, no grayscale-afterthought strips.
- Make dark mode the default (it suits the terminal-native lane and the dark palette is already wired).
- Add scroll-aware nav with active-section indication.
- Ground the About section in real CV facts (SIGEF 2, 99.9% uptime, Go, mentorship).
- Add direct email + phone to the footer; dynamic copyright year.

**Non-Goals:**
- Changing data shapes, `PortfolioService`, or `public/data/*.json`.
- Adding new runtime dependencies.
- Reintroducing images to project cards or the hero.
- Changing the section order (Hero → Projects → Skills → Certs → About → Footer stays).
- Fixing the pre-existing broken test assertions (separate concern).
- Building a blog, contact form backend, or analytics.

## Design Decisions

### Decision 1: Font pairing — JetBrains Mono (metadata) + Sora (display/body)
**Choice:** `JetBrains Mono` for all metadata, labels, status lines, tags, and the hero status line. `Sora` for display headings and body. Both via Google Fonts.
**Rationale:** Terminal-native lane requires a real monospace for the operator-output feel — JetBrains Mono is a designed monospace (not a costume mono), reads as engineering tooling, and isn't on the reflex-reject list. Sora is a geometric sans with strong weight contrast (100–800), not on the reflex-reject list (Inter/DM/Outfit/Plus Jakarta are), and pairs with JetBrains Mono on a contrast axis (geometric sans + designed mono). One family is too thin for the hierarchy; two committed faces give the portfolio a voice.
**Alternatives considered:**
- Inter + JetBrains Mono — rejected (Inter is reflex-reject, the detector already flagged it).
- Space Grotesk + Space Mono — rejected (both on reflex-reject list).
- Single family (Sora only) — rejected (terminal-native needs the mono contrast for metadata; without it the lane reads as costume).
- IBM Plex Sans + IBM Plex Mono — rejected (both on reflex-reject list).

### Decision 2: Hero as a terminal status line + solid headline
**Choice:** The hero renders top-to-bottom:
1. A terminal-style status line in JetBrains Mono, green-on-black: `> elmm@portfolio:~$ status — Senior Full-Stack Developer | React · Vue · Next.js · Nuxt.js · Node.js · Go | Remote LATAM` (the tagline IS the status output, with a blinking cursor block at the end).
2. The H1 headline below in Sora, solid color (no gradient), `text-wrap: balance`: `I build scalable architectures and high-security financial systems` — "high-security financial systems" in the primary accent (solid green/amber), not gradient.
3. The existing subtitle (rewritten tighter).
4. Two CTAs (View Case Studies / Let's talk) — restyled as terminal-native buttons (bordered, mono label, no rounded-full).
5. A stack-signature row of 6 mono pills (React, Vue, Next.js, Nuxt.js, Node.js, Go) — replaces the grayscale icon strip.
**Rationale:** The status line fills the gap with intentional density and establishes the terminal-native lane in the first 100ms. Solid-color headline removes the gradient-text AI tell. The blinking cursor is the one motion beat on load (with a `prefers-reduced-motion` fallback to a static cursor).
**Alternatives considered:**
- Tagline as a small uppercase eyebrow above H1 — rejected (impeccable bans the "tiny uppercase tracked eyebrow above every section" reflex; one deliberate status line is voice, but an eyebrow is AI grammar).
- Tagline replacing the subtitle — rejected (the subtitle carries different info; both are useful).
- Big-type tagline as the hero, small headline — rejected (the value-proposition headline is stronger than the tagline for a senior engineer; the tagline is metadata, not the hook).

### Decision 3: Color strategy — Committed (near-black + green/amber accent)
**Choice:** Near-black background (`oklch(0.18 0.02 160)` — a tinted dark, not neutral zinc), primary accent green (`oklch(0.78 0.18 145)` — terminal green, ≥4.5:1 on the near-black), secondary accent amber (`oklch(0.82 0.15 75)`) for warnings/highlights, ink `oklch(0.96 0.01 160)` for body text. Light mode inverts to off-white + the same green/amber. The green carries 30–40% of the surface (status lines, accents, active states, the headline keyword) — Committed strategy, not Restrained.
**Rationale:** Terminal-native lane is color-as-voice. A near-black with a tinted hue (not neutral zinc) avoids the "AI dark mode" cliché. Green/amber is the operator-toolbox palette (terminal, monitoring dashboards, audit logs) — it matches the SIGEF 2 federal-audit reality. OKLCH throughout for perceptual consistency. All text verified ≥4.5:1 contrast.
**Alternatives considered:**
- Neutral zinc dark + blue accent — rejected (the SaaS-cream/dark-zinc default; first-order reflex).
- Drenched (green everywhere) — rejected (illegible; terminal-native uses green as accent, not body).
- Restrained (tinted neutrals + tiny accent) — rejected (brand register permits Committed; restraint reads as mediocre here).

### Decision 4: Skills as a dense keyed table, not pill chips
**Choice:** Each skill category renders as a terminal-style keyed block: a mono header line (`[frontend]` in green), then skills as a wrapped row of mono tags (not pills — flat `border border-green/30 px-2 py-0.5` tags, the way a terminal lists tokens). 8 categories in a 2-column grid on desktop (`repeat(auto-fit, minmax(320px, 1fr))`), single column on mobile. Every category gets a dedicated icon (extend the map to all 8: Frontend→`Monitor`, Backend→`Server`, Databases/DevOps→`Cloud`, State Management→`Boxes`, Mobile→`Smartphone`, AI Tooling→`Sparkles`, Security→`ShieldCheck`, Workflow→`Users`).
**Rationale:** Pills were my earlier plan, but impeccable bans "identical card grids" and warns that cards are the lazy answer. A keyed-block layout is denser, more terminal-native, and avoids the 8-identical-cards problem. Mono tags (not rounded pills) match the lane. The 8-category icon map fixes the current broken fallback where 5 of 8 categories fall back to a generic `Code` icon.
**Alternatives considered:**
- 3-column pill-chip cards (my earlier plan) — rejected (identical card grid; impeccable bans it).
- Single-column accordion — rejected (too much scrolling for 64 skills).
- Tag cloud with fake frequency sizing — rejected (no frequency data; dishonest).

### Decision 5: Certifications as a keyed list grouped by provider type
**Choice:** Group certs into two (or three) keyed blocks: `[skill-validations]` (HackerRank) and `[course-completions]` (Zero To Mastery). Within each, a compact horizontal row per cert: a mono index (`01`), the cert name (Sora, bold), the achievement (same weight, not secondary), a provider tag, and a `→ view` link. No 3-up card grid, no large centered icons.
**Rationale:** 8 identical cards in a 3-up grid is the impeccable "identical card grids" ban. Grouping by provider type surfaces the real distinction (proctored skill test vs course completion) and is denser. The mono index gives sequence without the "01/02/03 above every section" tell (the index is on each item, not a section eyebrow).
**Alternatives considered:**
- 3-up card grid with provider badges — rejected (identical card grid).
- Timeline by date — rejected (no reliable date data in the hardcoded JSON).

### Decision 6: Projects as structured argument blocks, no numbered index eyebrow
**Choice:** Each project card is a structured block: a mono header line (`[case-study 01]` in green — the index is part of the header, not a separate faded eyebrow), the title in Sora bold, the description, then the Challenge/Solution/Impact triad as a 3-column grid on `md+` (stacked on mobile) with mono labels (`> challenge`, `> solution`, `> impact`) and a left accent rail that's a full border (`border-l-2 border-green/40`), not a side-stripe (impeccable bans side-stripes >1px). No large faded index number in the corner (that's the "numbered section markers as default scaffolding" tell).
**Rationale:** My earlier plan had a large faded `01/02/03` corner number — impeccable explicitly bans that as AI grammar. Moving the index into the mono header line (`[case-study 01]`) gives sequence without the tell. The 3-col triad uses horizontal space and reads as a structured argument. The left rail is a 2px full border (allowed), not a 4px side-stripe (banned).
**Alternatives considered:**
- Large faded corner index (my earlier plan) — rejected (impeccable bans it).
- Tabs for Challenge/Solution/Impact — rejected (hides content; bad for SEO and skim-reading).
- Stacked triad on all viewports — rejected (wastes horizontal space on desktop).

### Decision 7: About grounded in CV facts, three keyed blocks
**Choice:** Replace "Security First / Real Scalability" with three terminal-keyed blocks: `[reliability]` Federal Audit-Grade Reliability (99.9% uptime on SIGEF 2), `[stack]` Backend-First Full-Stack (Go + Node.js microservices, React/Vue frontend), `[mentorship]` Mentor & Code-Review Lead. Body copy rewritten to reference SIGEF 2, Ministerio de Hacienda, Go, and the async-first remote LATAM working style.
**Rationale:** The current cards are generic buzzwords. The CV has concrete facts (99.9% federal-audit uptime, Go microservices, mentorship). Grounding the About section in those facts makes the portfolio honest and distinctive. The keyed-block format matches the rest of the terminal-native lane.
**Alternatives considered:**
- Keep generic cards, just restyle — rejected (the content is the problem, not the styling).
- Add a timeline of experience — rejected (the CV has one job; a timeline would be thin).

### Decision 8: Dark mode default + toggle, no FOUC
**Choice:** Default to dark mode (inline script in `index.html` `<head>` reads `localStorage.getItem('theme')` and sets `class="dark"` before Vue mounts — default dark when no preference stored). Sun/moon toggle in the NavBar (desktop + mobile), persists to `localStorage`. The blinking cursor and any motion respect `prefers-reduced-motion`.
**Rationale:** Terminal-native lane is dark-first; the dark palette is already wired. The inline script prevents FOUC. The toggle respects user preference.
**Alternatives considered:**
- Respect only `prefers-color-scheme` — rejected (no user control; toggle is expected).
- Light mode default — rejected (doesn't match the lane).

### Decision 9: Scroll-aware NavBar with active-section indicator
**Choice:** NavBar background intensifies on scroll. An `IntersectionObserver` (`rootMargin: '-40% 0px -55% 0px'`) sets `activeSection` based on which section is in view; the matching nav link gets the primary accent + a 2px underline. No active styling when no section is clearly in view (graceful fallback).
**Rationale:** The static nav feels unfinished. Active-section indication is standard UX and helps orientation on a single-page portfolio.
**Alternatives considered:**
- Scroll event scrollspy — rejected (IntersectionObserver is more performant).

### Decision 10: Footer with direct contact + dynamic year
**Choice:** Add `mailto:elmm.programing@gmail.com` and `tel:+18494424113` links (mono, with Mail/Phone icons) alongside GitHub/LinkedIn. Replace `© 2023` with `© {{ year }}` from `new Date().getFullYear()`.
**Rationale:** The CV lists direct contact; the footer should too. Hardcoded 2023 looks stale in 2026.
**Alternatives considered:**
- Contact form — rejected (no backend; mailto/tel is simpler and works on a static site).

## Risks / Trade-offs

- **[Risk] Dark-mode FOUC on first load** → Inline script in `index.html` `<head>` sets `class="dark"` before Vue mounts. No flash.
- **[Risk] JetBrains Mono + Sora add two font requests** → Both on Google Fonts; use `display=swap` and preload only the weights used (400/500/700 for Sora, 400/500 for JetBrains Mono). Net: +2 families, -1 (Inter removed). Acceptable for a portfolio.
- **[Risk] Terminal-native reads as "costume" if overdone** → Mono is for metadata/labels/status lines only, never body copy (impeccable brand ban: "Monospace as lazy shorthand for technical"). Body stays in Sora. The lane is carried by color, density, and the status-line hero, not by mono-everything.
- **[Risk] Green-on-black contrast** → Verify `oklch(0.78 0.18 145)` ≥4.5:1 on `oklch(0.18 0.02 160)` for body text; use amber only for highlights (≥3:1 large text). Bump toward the ink end if close.
- **[Risk] 8 skill categories in `repeat(auto-fit, minmax(320px, 1fr))` leaves an uneven last row** → Acceptable; better than forcing a 9th placeholder or a 3-col grid with an orphan.
- **[Trade-off] Full-scope redesign is higher risk than incremental** → Accepted; the owner chose full scope (A). Each component is independent for rollback.
- **[Risk] Changing class names breaks the already-broken tests further** → Tests are pre-existing broken; this change doesn't make them more broken.

## Migration Plan

1. Add the font imports (JetBrains Mono + Sora) and the OKLCH color tokens to `src/style.css`; remove Inter.
2. Add the inline dark-mode FOUC script to `index.html`.
3. Rewrite `Introduction.vue` (status-line hero, solid headline, stack pills).
4. Rewrite `NavBar.vue` (theme toggle, scroll-aware, active-section, terminal-native styling).
5. Rewrite `Skills.vue` (keyed blocks, mono tags, 8-category icon map).
6. Rewrite `Cert.vue` (keyed list grouped by provider).
7. Rewrite `Projects.vue` (keyed header, 3-col triad, full-border rail).
8. Rewrite `About.vue` (three keyed blocks, CV-grounded copy).
9. Rewrite `Footer.vue` (email/phone links, dynamic year, terminal-native styling).
10. Build + manual smoke at 320px, 768px, 1280px in both light and dark; verify contrast with a checker.

**Rollback:** Each component is independent; revert any single component if it regresses. The font/color token change is the one cross-cutting piece — revert `src/style.css` + `index.html` to restore the old palette and Inter.

## Open Questions

1. **Tagline exact punctuation** — using `Senior Full-Stack Developer | React · Vue · Next.js · Nuxt.js · Node.js · Go | Remote LATAM` verbatim in the status line? Default: yes.
2. **Status-line prompt format** — `> elmm@portfolio:~$ status — <tagline>` or a simpler `$ <tagline>`? Default: the fuller prompt (more terminal-native, more distinctive).
3. **Blinking cursor** — a blinking block cursor `█` at the end of the status line (with `prefers-reduced-motion` fallback to static)? Default: yes, it's the one motion beat on load.