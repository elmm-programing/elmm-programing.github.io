## Why

The portfolio's hero section currently has a gap where the image used to be — the headline sits alone with no professional identity line beneath it, making the first impression weak for a senior engineer. Beyond the hero, the rest of the UI is functional but flat: skills render as plain bullet lists, certifications as identical cards, project case studies as undifferentiated text blocks, and the About section repeats "Security First / Real Scalability" cards that don't reflect the actual CV (Go, microservices, federal-audit-grade reliability). The site reads as a 2022 template rather than the senior full-stack / financial-systems engineer the CV shows. We want the portfolio to match the caliber of the work it describes.

## What Changes

- **Hero tagline**: Add the professional tagline `Senior Full-Stack Developer | React · Vue · Next.js · Nuxt.js · Node.js · Go | Remote LATAM` directly beneath the H1 in `Introduction.vue`, styled as a prominent eyebrow/sub-headline that fills the visual gap left by the removed image.
- **Hero tech strip refinement**: Replace the current 5-icon grayscale strip (Vue.js, Nuxt 3, TypeScript, Tailwind CSS, Go) with a cleaner, more deliberate "stack signature" — a horizontally scrollable row of pill badges showing the core stack, matching the tagline.
- **Skills section redesign**: Replace the 3-column bullet-list cards with a denser, more scannable layout — category header with an accent bar, skills as pill chips (not bullets), and icons/colors that cover all 8 categories from `skills.json` (currently only Frontend/Backend/Databases-DevOps have icons; State Management, Mobile, AI Tooling, Security, Workflow fall back to a generic `Code` icon).
- **Certifications section redesign**: Replace the identical 3-up card grid with a more compact, scannable list/timeline layout that distinguishes HackerRank (skill validations) from Zero To Mastery (course completions) via a provider badge or grouping, and surfaces the achievement text more prominently.
- **Projects section polish**: Add visual hierarchy to the case-study cards — a numbered index, a subtle accent border per project, and a clearer separation between the description and the Challenge/Solution/Impact triad. The current grid stacks the three blocks flatly; add a left accent rail and tighter typography.
- **About section rewrite**: Replace the generic "Security First / Real Scalability" cards with content grounded in the actual CV — "Federal Audit-Grade Reliability" (99.9% uptime on SIGEF 2), "Backend-First Full-Stack" (Go + Node.js microservices), and "Mentor & Code-Review Lead". Update the body copy to match the CV summary (Go, Node.js, SIGEF 2, Ministerio de Hacienda).
- **NavBar polish**: Add a subtle scroll-aware background transition (currently the glass-nav is static) and an active-section indicator that highlights the current section as the user scrolls.
- **Footer polish**: Add a direct email link (`elmm.programing@gmail.com`) and phone (`+1 849 442 4113`) alongside the existing GitHub/LinkedIn icons, and update the year to be dynamic (currently hardcoded 2023).
- **Dark mode as default**: The site has dark-mode classes throughout but no toggle and defaults to light. Make dark mode the default (it suits a developer portfolio) and add a theme toggle in the NavBar.

## Capabilities

### New Capabilities
- `portfolio-ui`: The visual design system, layout, and interaction patterns for the portfolio's sections (hero, skills, certifications, projects, about, nav, footer), including the hero tagline, section redesigns, dark-mode default, and scroll-aware navigation.

### Modified Capabilities
<!-- None — portfolio-data spec exists but its requirements (data shapes, no-Notion) are unchanged by this UI work. -->

## Impact

- **Code modified**: All 7 components (`Introduction.vue`, `NavBar.vue`, `Skills.vue`, `Cert.vue`, `Projects.vue`, `About.vue`, `Footer.vue`), plus `src/style.css` for any new design tokens and the dark-mode default.
- **No data changes**: `public/data/*.json` and `PortfolioService.ts` are untouched — this is purely presentation.
- **No new dependencies**: Uses existing Tailwind v4 + lucide-vue-next. No new packages.
- **Tests**: Existing tests assert specific CSS classes that will change; those assertions need updating (out of scope of the pre-existing broken tests, but new class names must be reflected where tests do run).
- **Accessibility**: Any new interactive elements (theme toggle, active-nav) must be keyboard-accessible and announced; color changes must preserve WCAG AA contrast.