## Why

The portfolio is currently English-only, but the owner is a Remote LATAM engineer whose CV is bilingual (Spanish native, English B2+) and whose audience includes both US/LATAM recruiters and Dominican/Spanish-speaking contacts. A single-language portfolio silently excludes half that audience. Adding Spanish alongside English lets the site serve both markets without maintaining two codebases, and a visible language toggle signals the bilingual capability the CV already claims.

## What Changes

- Add `vue-i18n` (the standard Vue i18n library) as a runtime dependency.
- Add a language toggle (EN | ES) to the NavBar, persisted to `localStorage`, defaulting to the browser's `navigator.language` on first visit.
- Extract all hardcoded UI strings from the 7 components into two locale message files: `src/locales/en.ts` and `src/locales/es.ts` (English the source language, Spanish the translation).
- Replace hardcoded strings in components with `$t('key')` calls (template) / `t('key')` (script setup via `useI18n`).
- Add a `src/i18n/index.ts` plugin that initializes vue-i18n with the two locales, lazy-loads nothing (both locales are small enough to ship inline), and wires the `localStorage` + `navigator.language` default logic.
- Add per-locale content variants for the data JSON: `public/data/en/projects.json`, `public/data/es/projects.json` (and `skills.json`, `certs.json`). The owner hand-authors both languages.
- Update `PortfolioService` to accept a locale and fetch `/data/{locale}/{file}.json`. The component-consumed shapes are unchanged — only the URL path gains a locale segment.
- Update the document `<title>` and `<html lang>` to reflect the active locale (for SEO and accessibility).
- Keep the terminal-native aesthetic: the language toggle renders as a mono `EN | ES` switcher in the NavBar, consistent with the existing mono nav labels.

## Capabilities

### New Capabilities
- `i18n`: Internationalization layer — language toggle, locale persistence, vue-i18n integration, per-locale UI message files, per-locale data JSON, dynamic `<html lang>` and `<title>`.

### Modified Capabilities
- `portfolio-data`: `PortfolioService` gains a locale parameter; data files move from `public/data/*.json` to `public/data/{locale}/*.json`. The returned shapes are unchanged (components need no template changes beyond the i18n `$t` swap).

## Impact

- **Dependencies**: add `vue-i18n` (~15KB gzipped) to `dependencies`.
- **Code added**: `src/i18n/index.ts`, `src/locales/en.ts`, `src/locales/es.ts`, `public/data/en/`, `public/data/es/`.
- **Code modified**: all 7 components (string extraction → `$t`), `PortfolioService.ts` (locale param), `main.ts` (register i18n plugin), `index.html` (dynamic title/lang — handled at runtime), `NavBar.vue` (language toggle).
- **Data restructured**: `public/data/{projects,skills,certs}.json` → `public/data/en/{projects,skills,certs}.json` + `public/data/es/{projects,skills,certs}.json`. The old root-level files are removed.
- **No backend**: both locales ship in the JS bundle (UI strings) and as static JSON (content); no server-side negotiation.
- **SEO**: `<html lang>` and `<title>` update at runtime; for true per-locale indexing the owner would later add per-locale HTML files, but that's a non-goal here (single `index.html` SSG).