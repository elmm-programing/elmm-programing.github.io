## ADDED Requirements

### Requirement: vue-i18n integration
The system SHALL use `vue-i18n` as the internationalization library, initialized in `src/i18n/index.ts` and registered as a Vue plugin in `main.ts`. Both `en` and `es` locale message files SHALL ship inline (synchronously imported, no lazy loading).

#### Scenario: i18n plugin registered before App mounts
- **WHEN** the app boots in `main.ts`
- **THEN** the vue-i18n plugin SHALL be registered on the Vue app instance before `App` mounts, so no component renders without a `t` function available

#### Scenario: Both locales available without a network request
- **WHEN** the app loads
- **THEN** both `en` and `es` message objects SHALL be present in the bundle, and switching locales SHALL NOT trigger a network fetch

### Requirement: Language toggle in NavBar
The NavBar SHALL display a mono `EN | ES` switcher where the active locale is styled with `text-primary` and the inactive with `text-ink-muted`. Clicking the inactive locale SHALL switch the active locale instantly.

#### Scenario: Active locale highlighted
- **WHEN** the active locale is `en`
- **THEN** `EN` SHALL render with `text-primary` and `ES` SHALL render with `text-ink-muted`

#### Scenario: Click switches locale
- **WHEN** the user clicks `ES` while active is `en`
- **THEN** the active locale SHALL become `es`, all `$t()` strings SHALL re-render in Spanish, and `ES` SHALL now be highlighted

#### Scenario: Toggle is keyboard accessible
- **WHEN** the toggle is focused and the user presses Enter or Space
- **THEN** the locale SHALL switch to the inactive locale

### Requirement: Locale persistence and browser default
The system SHALL persist the user's locale choice to `localStorage` under a `locale` key. On first visit (no stored preference), the system SHALL default to `es` if `navigator.language` starts with `es`, otherwise `en`.

#### Scenario: First visit with Spanish browser
- **WHEN** a user visits with no `localStorage.getItem('locale')` and `navigator.language` is `'es-DO'` or `'es'`
- **THEN** the active locale SHALL be `es`

#### Scenario: First visit with English browser
- **WHEN** a user visits with no stored preference and `navigator.language` is `'en-US'` or `'en'`
- **THEN** the active locale SHALL be `en`

#### Scenario: Persisted choice wins over browser default
- **WHEN** a user with `localStorage.getItem('locale') === 'en'` and a Spanish browser visits
- **THEN** the active locale SHALL be `en` (the persisted choice)

#### Scenario: Toggle persists
- **WHEN** the user toggles from `en` to `es`
- **THEN** `localStorage.setItem('locale', 'es')` SHALL be called, and a reload SHALL preserve `es`

### Requirement: UI string extraction to locale files
All hardcoded user-facing strings in the 7 components (`Introduction`, `NavBar`, `Skills`, `Cert`, `Projects`, `About`, `Footer`) SHALL be replaced with `$t('key')` (template) or `t('key')` (script setup). The English strings SHALL live in `src/locales/en.ts` and the Spanish translations in `src/locales/es.ts`.

#### Scenario: No hardcoded English prose remains in components
- **WHEN** the 7 component files are grepped for user-facing English prose (headlines, labels, CTAs, body copy)
- **THEN** no hardcoded English strings SHALL remain — all are `$t()` / `t()` calls

#### Scenario: Spanish translations exist for every English key
- **WHEN** the keys of `src/locales/en.ts` and `src/locales/es.ts` are compared
- **THEN** every key in `en.ts` SHALL have a corresponding key in `es.ts` with a Spanish translation

#### Scenario: Missing Spanish key falls back to English
- **WHEN** a Spanish key is missing and the active locale is `es`
- **THEN** the English string SHALL render (vue-i18n `fallbackLocale: 'en'`), and no empty string SHALL be visible

### Requirement: Per-locale data JSON
The system SHALL serve content JSON per locale under `public/data/{locale}/{file}.json` (e.g., `public/data/en/projects.json`, `public/data/es/projects.json`). `PortfolioService` SHALL accept a `locale` constructor parameter and fetch `/data/${locale}/${file}.json`. The returned shapes SHALL be identical to the current shapes.

#### Scenario: English data fetched when locale is en
- **WHEN** `PortfolioService` is constructed with locale `en` and `getProjects()` is called
- **THEN** it SHALL fetch `/data/en/projects.json` and return an array of `{ title, description, challenge, solution, impact, image, tags }` objects

#### Scenario: Spanish data fetched when locale is es
- **WHEN** `PortfolioService` is constructed with locale `es` and `getProjects()` is called
- **THEN** it SHALL fetch `/data/es/projects.json` and return the same shape with Spanish content

#### Scenario: Skills and certs also per-locale
- **WHEN** `getSkills()` or `getCertifications()` is called with any locale
- **THEN** the fetch SHALL target `/data/${locale}/skills.json` or `/data/${locale}/certs.json` respectively

#### Scenario: Old root-level data files removed
- **WHEN** the `public/data/` directory is inspected after migration
- **THEN** `public/data/projects.json`, `public/data/skills.json`, and `public/data/certs.json` (root-level) SHALL NOT exist — only the `en/` and `es/` subdirectories

### Requirement: Components re-fetch data on locale change
When the active locale changes, the three data-driven components (`Projects`, `Skills`, `Cert`) SHALL re-fetch their data from the new locale's JSON and re-render with the translated content.

#### Scenario: Switching locale updates projects
- **WHEN** the user switches from `en` to `es` while on the Projects section
- **THEN** the projects SHALL re-fetch from `/data/es/projects.json` and the cards SHALL re-render with Spanish title/description/challenge/solution/impact

#### Scenario: Switching locale updates skills and certs
- **WHEN** the user switches locale
- **THEN** Skills and Cert sections SHALL also re-fetch and re-render with the new locale's content

### Requirement: Dynamic html lang and title
The system SHALL set `document.documentElement.lang` to the active locale and `document.title` to the localized title from the message files, updating whenever the locale changes.

#### Scenario: html lang reflects locale
- **WHEN** the active locale is `es`
- **THEN** `<html lang="es">` SHALL be set

#### Scenario: title is localized
- **WHEN** the active locale is `en`
- **THEN** `document.title` SHALL be the English title from `en.ts` `meta.title` key

#### Scenario: Switching locale updates both
- **WHEN** the user switches from `en` to `es`
- **THEN** `<html lang>` SHALL become `es` and `document.title` SHALL become the Spanish title

### Requirement: Fallback locale
The system SHALL set vue-i18n's `fallbackLocale` to `en`. Missing Spanish keys SHALL render the English string, not an empty string.

#### Scenario: Missing es key renders English
- **WHEN** the active locale is `es` and a key exists in `en.ts` but not in `es.ts`
- **THEN** the English string SHALL render

## MODIFIED Requirements

### Requirement: Portfolio data service
The `PortfolioService` SHALL expose `getProjects()`, `getSkills()`, and `getCertifications()` returning the same shapes as before, but SHALL accept a `locale` constructor parameter and fetch from `/data/${locale}/*.json` instead of `/data/*.json`.

#### Scenario: Projects shape preserved
- **WHEN** `getProjects()` is called with any locale
- **THEN** it SHALL return an array of objects each with `title` (string), `description` (string), `challenge` (string), `solution` (string), `impact` (string), `image` (string URL), and `tags` (string array)

#### Scenario: Skills shape preserved
- **WHEN** `getSkills()` is called with any locale
- **THEN** it SHALL return an array of `{ name: string, items: string[] }` objects grouped by category

#### Scenario: Certifications shape preserved
- **WHEN** `getCertifications()` is called with any locale
- **THEN** it SHALL return an array of `{ name, provider, achievement, url }` objects

#### Scenario: Locale parameter used in fetch path
- **WHEN** `PortfolioService` is constructed with locale `es`
- **THEN** every fetch SHALL target `/data/es/${file}.json`