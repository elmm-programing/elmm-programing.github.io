## Context

The portfolio is a Vue 3 + Vite + Tailwind v4 SSG, single-page, no router. It has a terminal-native aesthetic (mono labels, keyed blocks, green/amber on near-black). Text lives in two layers: (1) UI strings hardcoded across 7 components (`Introduction`, `NavBar`, `Skills`, `Cert`, `Projects`, `About`, `Footer`), (2) content JSON in `public/data/{projects,skills,certs}.json` consumed via `PortfolioService`. The owner is bilingual (Spanish native, English B2+) and targets both US/LATAM recruiters and Dominican/Spanish-speaking contacts. The CV exists in both languages already.

## Goals / Non-Goals

**Goals:**
- Add English and Spanish as full locales — every UI string and every piece of content JSON available in both languages.
- Add a visible language toggle (EN | ES) in the NavBar, persisted to `localStorage`, defaulting to `navigator.language` on first visit.
- Keep the terminal-native aesthetic — the toggle is a mono `EN | ES` switcher, not a flag dropdown.
- Update `<html lang>` and `<title>` at runtime for accessibility/SEO.
- Keep the component-consumed data shapes unchanged — only the fetch URL gains a locale segment.
- Zero backend; both locales ship statically.

**Non-Goals:**
- Per-locale HTML files / true SSG per-locale routing (single `index.html` stays; runtime locale switch). A future change could add prerendered per-locale HTML if SEO demands it.
- Auto-translation of the content JSON — the owner hand-authors both languages (the CV already exists in both).
- Lazy-loading locale message files (both are small; shipping inline is simpler and avoids a flash of untranslated text on locale switch).
- Adding more than two locales (EN + ES only; the architecture allows future additions but they're out of scope).
- Changing the data shapes or the terminal-native visual design.

## Decisions

### Decision 1: vue-i18n (not a hand-rolled solution)
**Choice:** Add `vue-i18n` v9+ as the i18n library. Use the Composition API (`useI18n`) in `<script setup>` and `$t()` in templates.
**Rationale:** vue-i18n is the standard, battle-tested Vue i18n library. A hand-rolled reactive `t()` function would work but reinvents message interpolation, pluralization, and fallback. The portfolio's strings are simple (no plurals yet), but vue-i18n future-proofs and is well-documented. ~15KB gzipped is acceptable for a portfolio.
**Alternatives considered:**
- Hand-rolled reactive dictionary — rejected (reinvents the wheel; no interpolation/pluralization; harder to maintain).
- `@formatjs/intl` + custom Vue binding — rejected (heavier, more complex, designed for ICU MessageFormat scale the portfolio doesn't need).

### Decision 2: Both locales ship inline (no lazy loading)
**Choice:** `src/locales/en.ts` and `src/locales/es.ts` are imported synchronously in `src/i18n/index.ts` and both included in the bundle.
**Rationale:** The total UI string count is small (~40 strings). Lazy-loading would add a network request and a flash of untranslated text on locale switch. Shipping both inline means locale switching is instant. The cost (~5-8KB per locale) is negligible.
**Alternatives considered:**
- Lazy-load locale files on demand — rejected (flash of untranslated text; complexity for no real size win at this scale).

### Decision 3: Language toggle as mono `EN | ES` in NavBar
**Choice:** A compact mono switcher in the NavBar: `EN | ES` where the active locale is highlighted with `text-primary` and the inactive is `text-ink-muted`. Clicking the inactive locale switches instantly. Placed left of the theme toggle.
**Rationale:** Matches the terminal-native aesthetic (mono labels, no flag icons, no dropdown). Two locales don't need a dropdown. The `|` separator reads as a terminal prompt option.
**Alternatives considered:**
- Flag icon dropdown — rejected (costume; doesn't match terminal-native; overkill for 2 locales).
- `<select>` dropdown — rejected (native select styling clashes with the custom design; 2 options don't need it).

### Decision 4: Locale persistence + browser default
**Choice:** On first visit (no `localStorage.getItem('locale')`), default to `navigator.language.startsWith('es') ? 'es' : 'en'`. On toggle, persist to `localStorage.setItem('locale', locale)`. On load, read from localStorage first, then browser, then 'en' fallback.
**Rationale:** Respects the user's browser language on first visit (a Spanish-browser user gets Spanish), then respects their explicit choice thereafter. 'en' is the source/fallback locale.
**Alternatives considered:**
- Always default to 'en' — rejected (ignores the Spanish-native audience on first visit).
- Respect only `navigator.language` with no persistence — rejected (no user control; toggle is expected).

### Decision 5: Per-locale data JSON under `public/data/{locale}/`
**Choice:** Move `public/data/projects.json` → `public/data/en/projects.json` + `public/data/es/projects.json` (same for skills, certs). `PortfolioService` gains a `locale` constructor param and fetches `/data/${locale}/${file}.json`. The returned shapes are unchanged.
**Rationale:** The content (project case studies, cert achievements) is real prose that needs human translation, not auto-translation. Per-locale files let the owner hand-author both languages. The shape-preserving service means components need no template changes beyond the `$t` swap for UI strings.
**Alternatives considered:**
- Single JSON with `{en: {...}, es: {...}}` per item — rejected (doubles the file size per fetch; harder to hand-edit; breaks the existing shape).
- Auto-translate via an API — rejected (quality; the CV already has both languages).
- Keep content English-only, translate only UI — rejected (the case-study prose is the main content; UI-only i18n is half a solution).

### Decision 6: Dynamic `<html lang>` and `<title>`
**Choice:** A small `watch` on the active locale sets `document.documentElement.lang = locale` and `document.title = t('meta.title')`. The `<title>` message lives in the locale files.
**Rationale:** Accessibility (screen readers use `lang`) and SEO (search engines index by language). Runtime update is sufficient for a single-`index.html` SSG.
**Alternatives considered:**
- Per-locale prerendered HTML — rejected (non-goal; would need a build-time step and per-locale routes).

### Decision 7: Fallback to English for missing keys
**Choice:** vue-i18n `fallbackLocale: 'en'`. If a Spanish key is missing, the English string renders. No silent empty strings.
**Rationale:** Prevents blank UI during incremental translation. The owner can ship Spanish with a few missing keys and they'll show in English until translated.
**Alternatives considered:**
- Strict mode (warn on missing keys, render empty) — rejected (user-facing blanks are worse than English fallback).

## Risks / Trade-offs

- **[Risk] Flash of wrong locale on first load** → The i18n plugin initializes synchronously in `main.ts` before `App` mounts, reading localStorage/navigator. No flash.
- **[Risk] Content JSON out of sync between locales** → The owner must keep `en/` and `es/` files parallel. A `pnpm check:i18n` script (out of scope but recommended) could diff keys; for now, manual discipline + the fallback locale covers UI strings. Content JSON has no fallback (a missing `es/projects.json` would 404) — the owner must author both.
- **[Risk] vue-i18n adds ~15KB gzipped** → Acceptable for a portfolio; the alternative (hand-rolled) saves little at this string count and loses interpolation/pluralization.
- **[Trade-off] Single `index.html` means search engines see one locale at crawl time** → Accepted; true per-locale indexing is a non-goal. The runtime `<html lang>` + `<title>` update helps users, not crawlers.
- **[Risk] Forgetting to extract a string** → A grep for English prose in `.vue` files after extraction catches leftovers. The task list includes a verification step.
- **[Risk] Data fetch URL change breaks the dev proxy / paths** → There's no dev proxy (removed in the Notion swap). The new path `/data/en/projects.json` is a static file served by Vite; no proxy needed.

## Migration Plan

1. Install `vue-i18n`, create `src/i18n/index.ts` + `src/locales/{en,es}.ts` (start with empty messages, wire the plugin in `main.ts`).
2. Move `public/data/*.json` → `public/data/en/*.json`, then translate to `public/data/es/*.json`.
3. Update `PortfolioService` to accept a locale and fetch `/data/${locale}/*.json`.
4. Extract UI strings one component at a time (NavBar → Introduction → Projects → Skills → Cert → About → Footer), replacing hardcoded text with `$t('...')` and adding both EN + ES messages.
5. Add the language toggle to NavBar.
6. Add the `<html lang>` + `<title>` watcher.
7. Smoke both locales end-to-end; verify persistence; verify `<html lang>` updates.

**Rollback:** Each step is independent. Reverting `main.ts` (unregister the plugin) + restoring the old component strings restores the English-only site. The data files can stay moved (the EN content is identical to the old root-level files).

## Open Questions

1. **Spanish translation of the hero status line** — the terminal prompt `> elmm@portfolio:~$ status —` is language-neutral (it's a shell prompt), but the tagline "Senior Full-Stack Developer | React · Vue · ... | Remote LATAM" — should "Senior Full-Stack Developer" become "Desarrollador Full-Stack Senior" and "Remote LATAM" become "Remoto LATAM" in Spanish? Default: yes, translate the human-readable parts, keep the tech names and the prompt verbatim.
2. **Spanish for the CTA labels** — `$ view --case-studies` → `$ ver --casos-de-estudio`? Or keep the English command (`$ view --case-studies`) since it's a terminal command? Default: translate the command verb (`ver`, `contactar`) to signal the locale, keep the `--kebab-case` flag style.
3. **Certification names** — HackerRank cert names ("SQL (Basic) Certificate") are proper nouns from the issuer. Translate or keep verbatim? Default: keep verbatim (they're official cert names), translate only the `achievement` description field.