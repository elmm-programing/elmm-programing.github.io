## 1. Install vue-i18n + wire plugin

- [ ] 1.1 `pnpm add vue-i18n`
- [ ] 1.2 Create `src/locales/en.ts` with an empty default export (`export default {}`) — strings added per-component in later tasks
- [ ] 1.3 Create `src/locales/es.ts` with an empty default export
- [ ] 1.4 Create `src/i18n/index.ts` that imports `en` and `es`, reads `localStorage.getItem('locale')` (fallback to `navigator.language.startsWith('es') ? 'es' : 'en'`), and exports a vue-i18n instance with `legacy: false`, `locale`, `fallbackLocale: 'en'`, `messages: { en, es }`
- [ ] 1.5 Register the i18n plugin in `src/main.ts` (`app.use(i18n)`) before `app.mount('#app')`
- [ ] 1.6 Run `pnpm build` and confirm it succeeds

## 2. Move data JSON to per-locale directories

- [ ] 2.1 Create `public/data/en/` and `public/data/es/` directories
- [ ] 2.2 Move `public/data/projects.json` → `public/data/en/projects.json` (content unchanged — this is the English source)
- [ ] 2.3 Move `public/data/skills.json` → `public/data/en/skills.json`
- [ ] 2.4 Move `public/data/certs.json` → `public/data/en/certs.json`
- [ ] 2.5 Create `public/data/es/projects.json` with Spanish translations of title/description/challenge/solution/impact (keep image URLs and tags verbatim — tags are tech names)
- [ ] 2.6 Create `public/data/es/skills.json` — skills are tech names (Vue 3, Go, etc.), keep verbatim; translate only the category names (Frontend→Frontend, Backend→Backend, "Databases / DevOps"→"Bases de Datos / DevOps", "State Management & Data Fetching"→"Gestión de Estado y Data Fetching", Mobile→Móvil, "AI Tooling"→"Herramientas IA", Security→Seguridad, "Workflow & Collaboration"→"Flujo de Trabajo y Colaboración")
- [ ] 2.7 Create `public/data/es/certs.json` — keep cert `name` verbatim (official cert names), translate `achievement` descriptions, keep `provider` and `url` verbatim
- [ ] 2.8 Delete the old root-level `public/data/projects.json`, `public/data/skills.json`, `public/data/certs.json`

## 3. Update PortfolioService for locale

- [ ] 3.1 Add a `locale` constructor parameter to `PortfolioService` (default `'en'`)
- [ ] 3.2 Change the three fetch URLs from `/data/${file}.json` to `/data/${this.locale}/${file}.json`
- [ ] 3.3 Verify the returned shapes are unchanged (the spec requires identical shapes)

## 4. Extract UI strings — NavBar (incl. language toggle)

- [ ] 4.1 Add the language toggle (`EN | ES` mono switcher) to the NavBar template, left of the theme toggle, with `text-primary` on active and `text-ink-muted` on inactive
- [ ] 4.2 In NavBar `<script setup>`, use `useI18n()` to get `locale`, and a `setLocale(l)` function that sets `locale.value = l`, persists to `localStorage.setItem('locale', l)`, and updates `document.documentElement.lang = l`
- [ ] 4.3 Replace the hardcoded nav link labels (`case-studies`, `skills`, `certs`, `about`, `contact`) with `$t('nav.caseStudies')` etc. — add the EN + ES strings to `src/locales/en.ts` and `src/locales/es.ts`
- [ ] 4.4 Add a `watch(locale)` that sets `document.documentElement.lang` and `document.title = t('meta.title')`
- [ ] 4.5 Add `meta.title` to both locale files (EN: "Edwin Levinson — Senior Full-Stack Developer", ES: "Edwin Levinson — Desarrollador Full-Stack Senior")

## 5. Extract UI strings — Introduction (hero)

- [ ] 5.1 Replace the hardcoded status-line tagline with `$t('hero.tagline')` — the prompt prefix `> elmm@portfolio:~$ status — ` stays verbatim (language-neutral), the tagline body is translated
- [ ] 5.2 Replace the H1 headline with `$t('hero.headline')` (keep the `<span class="text-primary">` wrapper around the translated keyword)
- [ ] 5.3 Replace the subtitle with `$t('hero.subtitle')`
- [ ] 5.4 Replace the two CTA labels (`$ view --case-studies`, `$ contact --me`) with `$t('hero.ctaCaseStudies')` and `$t('hero.ctaContact')` — translate the verb (`ver`, `contactar`) per the design open-question default
- [ ] 5.5 Add all hero strings (EN + ES) to the locale files
- [ ] 5.6 The stack pills array (`['React', 'Vue', ...]`) stays hardcoded — tech names are language-neutral

## 6. Extract UI strings — Projects

- [ ] 6.1 Replace "Selected Case Studies" with `$t('projects.title')`, the subtitle with `$t('projects.subtitle')`
- [ ] 6.2 Replace the `[case-study NN]` header — the `NN` stays, the prefix becomes `$t('projects.caseStudyPrefix')` + index (EN: "case-study", ES: "caso-de-estudio")
- [ ] 6.3 Replace the `> challenge`, `> solution`, `> impact` labels with `$t('projects.challenge')`, `$t('projects.solution')`, `$t('projects.impact')` (EN: "challenge/solution/impact", ES: "desafío/solución/impacto")
- [ ] 6.4 In `<script setup>`, use `useI18n()` to get `locale`; construct `PortfolioService` with `locale.value`; add a `watch(locale)` that re-fetches projects and re-assigns `projects.value`
- [ ] 6.5 Add all projects strings (EN + ES) to the locale files

## 7. Extract UI strings — Skills

- [ ] 7.1 Replace "Technical Skills" with `$t('skills.title')`
- [ ] 7.2 The `[category.name.toLowerCase()]` header uses the category name from the JSON — since `es/skills.json` has Spanish category names, this auto-translates (no `$t` needed)
- [ ] 7.3 In `<script setup>`, use `useI18n()` to get `locale`; construct `PortfolioService` with `locale.value`; add a `watch(locale)` that re-fetches skills
- [ ] 7.4 Add the skills title (EN + ES) to the locale files
- [ ] 7.5 Verify the `getCategoryIcon` and `getCategoryColor` maps still match the Spanish category names — update the maps to include both EN and ES keys (e.g., `'Databases / DevOps'` AND `'Bases de Datos / DevOps'` map to the same icon/color)

## 8. Extract UI strings — Cert

- [ ] 8.1 Replace "Certifications & Achievements" with `$t('certs.title')`
- [ ] 8.2 Replace the `[skill-validations]` and `[course-completions]` group headers with `$t('certs.skillValidations')` and `$t('certs.courseCompletions')` (EN: "skill-validations"/"course-completions", ES: "validaciones-de-habilidades"/"finalizacion-de-cursos")
- [ ] 8.3 Replace `→ view` with `$t('certs.view')` (EN: "→ view", ES: "→ ver")
- [ ] 8.4 In `<script setup>`, use `useI18n()` to get `locale`; construct `PortfolioService` with `locale.value`; add a `watch(locale)` that re-fetches certs
- [ ] 8.5 The `grouped` computed's provider-matching (`provider.includes('hackerrank')`) is language-neutral (provider names are proper nouns) — no change needed
- [ ] 8.6 Add all certs strings (EN + ES) to the locale files

## 9. Extract UI strings — About

- [ ] 9.1 Replace the headline ("More than code — I operate high-reliability systems.") with `$t('about.headline')`
- [ ] 9.2 Replace the two body paragraphs with `$t('about.body1')` and `$t('about.body2')` — translate the SIGEF 2 / Ministerio de Hacienda / Go / 99.9% uptime / UTC−4 / LATAM content to Spanish
- [ ] 9.3 Replace the three keyed-block headers (`[reliability]`, `[stack]`, `[mentorship]`) with `$t('about.reliability')` etc. (EN: "reliability"/"stack"/"mentorship", ES: "confiabilidad"/"stack"/"mentoría")
- [ ] 9.4 Replace the three block titles and descriptions with `$t('about.reliabilityTitle')`, `$t('about.reliabilityDesc')`, etc.
- [ ] 9.5 Add all about strings (EN + ES) to the locale files

## 10. Extract UI strings — Footer

- [ ] 10.1 Replace "Ready to scale your product?" with `$t('footer.headline')`
- [ ] 10.2 Replace the body paragraph with `$t('footer.body')`
- [ ] 10.3 Replace "All rights reserved." with `$t('footer.rights')` (EN: "All rights reserved.", ES: "Todos los derechos reservados.")
- [ ] 10.4 The email, phone, and copyright year stay verbatim (not translated)
- [ ] 10.5 Add all footer strings (EN + ES) to the locale files

## 11. Verify + smoke

- [ ] 11.1 Run `pnpm build` and confirm it succeeds
- [ ] 11.2 Grep all 7 components for hardcoded English prose — confirm no user-facing strings remain (only `$t` calls, tech names, and structural markup)
- [ ] 11.3 Run `pnpm dev` and smoke both locales:
  - Default to browser language on first visit (clear localStorage)
  - Toggle EN → ES → EN; verify all UI strings and all content (projects/skills/certs) translate
  - Verify `<html lang>` and `<title>` update on toggle
  - Verify locale persists across reload
  - Verify the language toggle is keyboard accessible (Tab to it, Enter/Space switches)
- [ ] 11.4 Verify the terminal-native aesthetic is preserved (mono labels, green/amber accents, no visual regression from the i18n swap)
- [ ] 11.5 Verify no new contrast issues (the toggle uses existing `text-primary` / `text-ink-muted` tokens — already WCAG-verified)