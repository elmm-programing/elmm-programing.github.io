## 1. Design tokens, fonts, FOUC script

- [x] 1.1 Add inline FOUC script to `index.html` (defaults to dark mode, reads localStorage theme)
- [x] 1.2 Replace Inter with JetBrains Mono (metadata) + Sora (display/body) via Google Fonts
- [x] 1.3 Add OKLCH color tokens to `src/style.css` @theme (near-black bg, green/amber accents)
- [x] 1.4 Add `@custom-variant dark`, cursor-blink keyframes + reduced-motion fallback, `.no-scrollbar` utility
- [x] 1.5 Add dual primary/accent/ink-muted/category-color tokens with `.dark` overrides for WCAG AA in both modes

## 2. Hero (Introduction.vue) — terminal status-line

- [x] 2.1 Add the tagline as a terminal status line (`> elmm@portfolio:~$ status — <tagline>█`) above the H1
- [x] 2.2 Replace gradient-text H1 with solid `text-primary` keyword ("high-security financial systems")
- [x] 2.3 Replace the 5-icon grayscale strip with 6 mono stack pills (React, Vue, Next.js, Nuxt.js, Node.js, Go)
- [x] 2.4 Remove the old `<picture>`/`<img>` hero image block and lucide icon imports

## 3. NavBar — theme toggle, scroll-aware, active section

- [x] 3.1 Add ☀/☾ theme toggle (desktop + mobile), persists to localStorage
- [x] 3.2 Add scroll-aware background (transparent at top, solid on scroll past 24px)
- [x] 3.3 Add IntersectionObserver (`-40% 0px -55% 0px`) setting `activeSection`; underline matching nav link
- [x] 3.4 Use mono link labels (case-studies, skills, certs, about, contact)
- [x] 3.5 Verify keyboard accessibility (Enter/Space on toggle)

## 4. Skills — keyed blocks, mono tags, 8-category map

- [x] 4.1 Replace 3-up bullet-list card grid with `repeat(auto-fit, minmax(320px, 1fr))` keyed blocks
- [x] 4.2 Render skills as mono tags (flat bordered spans), not bullets
- [x] 4.3 Extend icon map to all 8 categories (Frontend→Monitor, Backend→Server, Databases/DevOps→Cloud, State Mgmt→Boxes, Mobile→Smartphone, AI Tooling→Sparkles, Security→ShieldCheck, Workflow→Users)
- [x] 4.4 Route category colors through `--color-cat-*` CSS tokens with `.dark` overrides (WCAG AA in both modes)
- [x] 4.5 Remove old container-query `<style>` block

## 5. Certifications — keyed list grouped by provider

- [x] 5.1 Group certs into `[skill-validations]` (HackerRank), `[course-completions]` (Zero To Mastery), `[other]`
- [x] 5.2 Render compact horizontal rows (mono index, name, achievement, provider tag, → view link)
- [x] 5.3 Remove the 3-up identical card grid and large centered icons
- [x] 5.4 Remove old container-query `<style>` block and lucide imports

## 6. Projects — keyed header, 3-col triad, full-border rail

- [x] 6.1 Add `[case-study NN]` mono header per card (NOT a large faded corner number — that AI-tell is banned)
- [x] 6.2 Add 2px full left border (`border-l-2 border-primary/40`) as accent rail (not a >1px side-stripe)
- [x] 6.3 Change Challenge/Solution/Impact triad to `grid-cols-1 md:grid-cols-3` (stacked mobile, 3-col desktop)
- [x] 6.4 Remove old `<style>` block and ArrowRight import

## 7. About — three keyed blocks, CV-grounded copy

- [x] 7.1 Replace "Security First / Real Scalability" with `[reliability]`, `[stack]`, `[mentorship]` keyed blocks
- [x] 7.2 Ground copy in CV facts: SIGEF 2, Ministerio de Hacienda, Go, Node.js, 99.9% uptime, UTC−4, LATAM
- [x] 7.3 Use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (third block spans 2 on sm)
- [x] 7.4 Import Shield, Server, Users from lucide

## 8. Footer — direct contact, dynamic year

- [x] 8.1 Add `mailto:elmm.programing@gmail.com` link with Mail icon
- [x] 8.2 Add `tel:+18494424113` link with Phone icon
- [x] 8.3 Dynamic copyright year via `new Date().getFullYear()`
- [x] 8.4 Preserve GitHub/LinkedIn icon links, terminal-native mono styling

## 9. Full smoke + contrast verification

- [x] 9.1 `pnpm build` succeeds, no new dependencies in package.json
- [x] 9.2 AI-slop self-check: no gradient text, no Inter, no corner numbers, no side-stripes >1px, no identical card grids, no NotionService
- [x] 9.3 WCAG contrast verified (proper OKLCH→sRGB→luminance): all text ≥4.5:1 in both light and dark modes
- [x] 9.4 Section ids match nav link ids (work, skills, certifications, about, contact)
- [x] 9.5 Reduced-motion fallback for cursor-blink verified