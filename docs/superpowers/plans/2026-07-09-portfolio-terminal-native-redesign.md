# Portfolio Terminal-Native Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign all 7 portfolio components for a terminal-native / systems-engineering aesthetic lane, replacing the gradient-text H1 and Inter font (both flagged as AI-tells) with a JetBrains Mono + Sora pairing on a near-black + green/amber palette, dark-mode default, scroll-aware nav, and CV-grounded About copy.

**Architecture:** Vue 3 + Vite + Tailwind v4 SSG. No new runtime dependencies. Changes are presentation-only — `PortfolioService.ts` and `public/data/*.json` are untouched. A cross-cutting token + font change in `src/style.css` + `index.html` anchors the lane; each of the 7 components is then rewritten independently against those tokens.

**Tech Stack:** Vue 3, Vite, Tailwind v4 (`@theme` tokens, `@custom-variant dark`), lucide-vue-next, Google Fonts (JetBrains Mono + Sora), OKLCH colors.

## Global Constraints

- **No new runtime dependencies.** `package.json` `dependencies` and `devDependencies` MUST NOT gain entries. (Spec requirement: No new runtime dependencies.)
- **No gradient text.** `bg-clip-text` + `bg-gradient` on text is banned. Headlines use solid colors. (Spec Decision 2; impeccable absolute ban.)
- **No Inter.** Replace with JetBrains Mono (metadata) + Sora (display/body). (Spec Decision 1; impeccable reflex-reject list.)
- **No side-stripe accent >1px.** Use full borders or background tints, never `border-left/right` >1px as a colored accent. (Spec Decision 6; impeccable absolute ban.)
- **No large faded numbered eyebrows (01/02/03) as section scaffolding.** Index goes in the mono header line (`[case-study 01]`), not a corner number. (Spec Decision 6; impeccable absolute ban.)
- **No identical card grids.** Skills and certs use keyed blocks / keyed lists, not 3-up identical cards. (Spec Decisions 4, 5; impeccable absolute ban.)
- **Monospace is for metadata/labels/status lines only, never body copy.** (Spec Risk; impeccable brand ban.)
- **Dark mode is the default.** Inline FOUC-prevention script in `index.html` sets `class="dark"` before Vue mounts. (Spec Decision 8.)
- **All text ≥4.5:1 contrast** against its background (≥3:1 for large/bold text). Verify with a contrast checker before marking any color task done. (Spec Decision 3; impeccable color rule.)
- **Motion respects `prefers-reduced-motion`.** The blinking cursor has a static fallback. (Spec Decision 8; impeccable motion rule.)
- **Section order unchanged:** Hero → Projects → Skills → Certs → About → Footer. (Spec Non-Goals.)
- **Data layer untouched:** `PortfolioService.ts` and `public/data/*.json` are NOT modified. (Spec Non-Goals.)

---

## File Structure

| File | Responsibility | Action |
|---|---|---|
| `index.html` | FOUC-prevention inline script, font preconnects, title | Modify |
| `src/style.css` | OKLCH color tokens, font tokens, `@custom-variant dark`, blinking-cursor keyframes, `.no-scrollbar` utility | Modify |
| `src/components/Introduction.vue` | Terminal status-line hero, solid headline, stack pills | Rewrite |
| `src/components/NavBar.vue` | Theme toggle, scroll-aware bg, active-section indicator, terminal styling | Rewrite |
| `src/components/Skills.vue` | Keyed blocks, mono tags, 8-category icon/color map | Rewrite |
| `src/components/Cert.vue` | Keyed list grouped by provider type | Rewrite |
| `src/components/Projects.vue` | Keyed header, 3-col triad, full-border rail | Rewrite |
| `src/components/About.vue` | Three keyed blocks, CV-grounded copy | Rewrite |
| `src/components/Footer.vue` | Email/phone links, dynamic year, terminal styling | Rewrite |

No new files. No new dependencies. `PortfolioService.ts` and `public/data/*.json` untouched.

---

## Task 1: Design tokens, fonts, and FOUC script

**Files:**
- Modify: `src/style.css` (entire `@theme` block + base styles)
- Modify: `index.html` (`<head>` — preconnects, font link, FOUC script, title)

**Interfaces:**
- Produces: CSS custom properties consumed by all later tasks:
  - `--color-bg-dark: oklch(0.18 0.02 160)` (near-black, tinted green hue)
  - `--color-bg-light: oklch(0.98 0.005 160)` (off-white, tinted)
  - `--color-surface-dark: oklch(0.22 0.02 160)`
  - `--color-surface-light: oklch(0.96 0.005 160)`
  - `--color-ink: oklch(0.96 0.01 160)` (body text on dark)
  - `--color-ink-muted: oklch(0.72 0.02 160)` (secondary text on dark — verify ≥4.5:1 on bg-dark)
  - `--color-primary: oklch(0.78 0.18 145)` (terminal green)
  - `--color-primary-hover: oklch(0.84 0.18 145)`
  - `--color-accent: oklch(0.82 0.15 75)` (amber, highlights only)
  - `--font-sans: "Sora", sans-serif`
  - `--font-mono: "JetBrains Mono", monospace`
- Produces: `@custom-variant dark (&:where(.dark, .dark *))` (already present — keep it)
- Produces: `@keyframes cursor-blink` + `.cursor-blink` utility + `@media (prefers-reduced-motion: reduce)` fallback
- Produces: `.no-scrollbar` utility (hide scrollbar on the hero stack row)
- Produces: the FOUC inline script in `index.html` that sets `class="dark"` before Vue mounts

- [ ] **Step 1: Write the FOUC + font setup in `index.html`**

Replace the entire `<head>` of `index.html` with:

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Edwin Levinson — Senior Full-Stack Developer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Sora:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
  <script>
    (function () {
      try {
        var theme = localStorage.getItem('theme');
        if (theme === 'light') { document.documentElement.classList.remove('dark'); }
        else { document.documentElement.classList.add('dark'); }
      } catch (e) { document.documentElement.classList.add('dark'); }
    })();
  </script>
</head>
```

- [ ] **Step 2: Replace the `@theme` block and base styles in `src/style.css`**

Replace the entire file with:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-bg-dark: oklch(0.18 0.02 160);
  --color-bg-light: oklch(0.98 0.005 160);
  --color-surface-dark: oklch(0.22 0.02 160);
  --color-surface-light: oklch(0.96 0.005 160);
  --color-surface-darker: oklch(0.14 0.02 160);
  --color-ink: oklch(0.96 0.01 160);
  --color-ink-muted: oklch(0.72 0.02 160);
  --color-ink-dark: oklch(0.15 0.01 160);
  --color-ink-muted-dark: oklch(0.45 0.02 160);
  --color-primary: oklch(0.78 0.18 145);
  --color-primary-hover: oklch(0.84 0.18 145);
  --color-accent: oklch(0.82 0.15 75);
  --color-border-dark: oklch(0.30 0.02 160);
  --color-border-light: oklch(0.88 0.01 160);
  --font-sans: "Sora", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --shadow-glow: 0 0 20px -5px oklch(0.78 0.18 145 / 0.3);
}

@keyframes cursor-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.cursor-blink {
  animation: cursor-blink 1.1s steps(1) infinite;
}

@media (prefers-reduced-motion: reduce) {
  .cursor-blink { animation: none; opacity: 1; }
}

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { scrollbar-width: none; }

* {
  font-family: var(--font-sans);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-bg-light);
  color: var(--color-ink-dark);
}

.dark body {
  background: var(--color-bg-dark);
  color: var(--color-ink);
}
```

- [ ] **Step 3: Build and verify no errors**

Run: `pnpm build`
Expected: build succeeds, no TS errors. (The components still reference old classes — that's fine, this task only changes tokens. Tailwind v4 maps `--color-*` theme tokens to `bg-*`, `text-*`, `border-*` utilities automatically.)

- [ ] **Step 4: Verify contrast**

Run: `node -e "console.log('ink on bg-dark:', (0.96+0.05)/(0.18+0.05))"` — this is a rough luminance check; for a real check, open the built site in a browser and use a contrast checker extension. The targets:
- `--color-ink` (0.96) on `--color-bg-dark` (0.18): ≥4.5:1 ✓
- `--color-ink-muted` (0.72) on `--color-bg-dark` (0.18): verify ≥4.5:1 — if it fails, bump `--color-ink-muted` to `oklch(0.78 0.02 160)` and re-check.
- `--color-primary` (0.78) on `--color-bg-dark` (0.18): ≥4.5:1 ✓ (large text/bold)

- [ ] **Step 5: Commit**

```bash
git add index.html src/style.css
git commit -m "feat(ui): terminal-native tokens, JetBrains Mono + Sora, dark-mode FOUC default"
```

---

## Task 2: Introduction.vue — terminal status-line hero

**Files:**
- Modify: `src/components/Introduction.vue` (full rewrite of `<template>` and `<script setup>`)

**Interfaces:**
- Consumes: `--color-primary`, `--color-ink`, `--color-ink-muted`, `--font-mono`, `--font-sans`, `.cursor-blink`, `.no-scrollbar` from Task 1.
- Produces: the hero section (`#hero` implicit — the section has no id; nav links use `#work` etc. for other sections).

- [ ] **Step 1: Rewrite `Introduction.vue`**

Replace the entire file with:

```vue
<template>
  <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="font-mono text-sm sm:text-base text-primary mb-6 break-all">
        <span class="text-ink-muted">&gt; elmm@portfolio:~$</span> status <span class="text-ink-muted">—</span> Senior Full-Stack Developer <span class="text-ink-muted">|</span> React <span class="text-ink-muted">·</span> Vue <span class="text-ink-muted">·</span> Next.js <span class="text-ink-muted">·</span> Nuxt.js <span class="text-ink-muted">·</span> Node.js <span class="text-ink-muted">·</span> Go <span class="text-ink-muted">|</span> Remote LATAM<span class="cursor-blink text-primary">█</span>
      </div>

      <h1 class="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-4 dark:text-white text-balance">
        I build scalable architectures and <span class="text-primary">high-security financial systems</span>
      </h1>

      <p class="mt-4 text-xl text-ink-muted dark:text-ink-muted max-w-2xl mx-auto font-light leading-relaxed">
        Go and Node.js backend specialist. 4+ years operating SIGEF 2 — the Dominican Republic's national financial-management platform — at 99.9% uptime under federal audit cadence.
      </p>

      <div class="mt-10 flex flex-wrap justify-center gap-4">
        <a class="inline-flex items-center px-6 py-3 border-2 border-primary text-base font-mono font-medium text-primary hover:bg-primary hover:text-bg-dark transition-all"
          href="#work">
          $ view --case-studies
        </a>
        <a class="inline-flex items-center px-6 py-3 border-2 border-border-light dark:border-border-dark text-base font-mono font-medium text-ink-dark dark:text-ink-muted hover:border-primary hover:text-primary dark:hover:text-primary transition-all"
          href="#contact">
          $ contact --me
        </a>
      </div>

      <div class="mt-12 flex flex-wrap justify-center gap-2 overflow-x-auto no-scrollbar">
        <span v-for="tech in stack" :key="tech"
          class="font-mono text-xs px-3 py-1 border border-primary/40 text-primary whitespace-nowrap">
          {{ tech }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stack = ['React', 'Vue', 'Next.js', 'Nuxt.js', 'Node.js', 'Go'];
</script>
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: build succeeds. The hero now shows the status line, solid-color headline, CTAs, and 6 stack pills.

- [ ] **Step 3: Smoke at 320px, 768px, 1280px**

Run: `pnpm dev`, open at each width.
Expected:
- 320px: status line wraps (it's `break-all`), headline is `text-4xl`, pills scroll horizontally with no scrollbar.
- 768px: headline `text-5xl`, pills fit in one row.
- 1280px: headline `text-7xl`, balanced.
- No gradient text anywhere. The keyword "high-security financial systems" is solid `text-primary` (green).

- [ ] **Step 4: Verify reduced-motion**

In DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce", reload.
Expected: the `█` cursor is static (not blinking).

- [ ] **Step 5: Commit**

```bash
git add src/components/Introduction.vue
git commit -m "feat(hero): terminal status-line tagline, solid headline, stack pills"
```

---

## Task 3: NavBar.vue — theme toggle, scroll-aware, active section

**Files:**
- Modify: `src/components/NavBar.vue` (full rewrite)

**Interfaces:**
- Consumes: `--color-primary`, `--color-bg-dark`, `--color-bg-light`, `--color-border-dark`, `--color-ink`, `--color-ink-muted`, `--font-mono` from Task 1.
- Produces: a `NavBar` with `activeSection` ref (string | null) and `scrolled` ref (boolean), used to style nav links and background.

- [ ] **Step 1: Rewrite `NavBar.vue`**

Replace the entire file with:

```vue
<template>
  <nav :class="['fixed top-0 w-full z-50 border-b transition-colors duration-200',
    scrolled
      ? 'bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-md border-border-light dark:border-border-dark'
      : 'bg-transparent border-transparent']">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <div class="flex-shrink-0 flex items-center gap-2 font-mono">
          <div class="w-8 h-8 rounded border-2 border-primary flex items-center justify-center text-primary font-bold text-sm">
            E
          </div>
          <span class="font-bold text-xl tracking-tight dark:text-white">Edwin Levinson</span>
        </div>

        <div class="hidden md:flex items-center gap-6">
          <a v-for="link in links" :key="link.id"
            :href="'#' + link.id"
            :class="['font-mono text-sm transition-colors',
              activeSection === link.id ? 'text-primary border-b-2 border-primary' : 'text-ink-dark dark:text-ink-muted hover:text-primary']">
            {{ link.label }}
          </a>
          <button @click="toggleTheme" type="button"
            class="font-mono text-sm text-ink-dark dark:text-ink-muted hover:text-primary transition-colors px-2"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
            {{ isDark ? '☀' : '☾' }}
          </button>
        </div>

        <div class="md:hidden flex items-center gap-3">
          <button @click="toggleTheme" type="button"
            class="font-mono text-sm text-ink-dark dark:text-ink-muted hover:text-primary transition-colors"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
            {{ isDark ? '☀' : '☾' }}
          </button>
          <button @click="isMenuOpen = !isMenuOpen" type="button" class="text-ink-dark dark:text-ink-muted hover:text-primary">
            <Menu class="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>

    <div v-show="isMenuOpen" class="md:hidden bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-md border-b border-border-light dark:border-border-dark">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
        <a v-for="link in links" :key="link.id"
          :href="'#' + link.id"
          @click="isMenuOpen = false"
          :class="['block px-3 py-2 rounded-md font-mono text-base',
            activeSection === link.id ? 'text-primary bg-primary/10' : 'text-ink-dark dark:text-ink-muted hover:text-primary hover:bg-primary/5']">
          {{ link.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu } from 'lucide-vue-next';

const links = [
  { id: 'work', label: 'case-studies' },
  { id: 'skills', label: 'skills' },
  { id: 'certifications', label: 'certs' },
  { id: 'about', label: 'about' },
  { id: 'contact', label: 'contact' },
];

const isMenuOpen = ref(false);
const isDark = ref(true);
const scrolled = ref(false);
const activeSection = ref<string | null>(null);

let observer: IntersectionObserver | null = null;

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
}

function onScroll() {
  scrolled.value = window.scrollY > 24;
}

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark');
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      activeSection.value = visible[0]?.target.id ?? null;
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.1, 0.5] }
  );
  links.forEach(l => {
    const el = document.getElementById(l.id);
    if (el) observer!.observe(el);
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  observer?.disconnect();
});
</script>
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 3: Smoke the nav behavior**

Run: `pnpm dev`:
- At top of page: nav is transparent, no border.
- Scroll down past hero: nav gets `bg-bg-dark/90 backdrop-blur-md border-border-dark`.
- Scroll to each section: the matching nav link turns `text-primary` with a `border-b-2 border-primary` underline.
- Click the `☾`/`☀` toggle: theme flips, persists across reload.
- At 320px: hamburger menu opens, links render as `font-mono` blocks, toggle is visible.

- [ ] **Step 4: Verify keyboard accessibility**

- Tab through nav: each link and the toggle are focusable.
- Focus on toggle, press Enter: theme toggles.
- Focus on toggle, press Space: theme toggles.

- [ ] **Step 5: Commit**

```bash
git add src/components/NavBar.vue
git commit -m "feat(nav): theme toggle, scroll-aware bg, active-section indicator"
```

---

## Task 4: Skills.vue — keyed blocks, mono tags, 8-category map

**Files:**
- Modify: `src/components/Skills.vue` (full rewrite of `<template>`, `<script setup>`, `<style>`)

**Interfaces:**
- Consumes: `PortfolioService.getSkills()` (unchanged — returns `{ name: string, items: string[] }[]`), `--color-primary`, `--color-accent`, `--font-mono`, lucide icons.
- Produces: a Skills section with 8-category icon/color coverage.

- [ ] **Step 1: Rewrite `Skills.vue`**

Replace the entire file with:

```vue
<template>
  <section class="py-20 bg-bg-light dark:bg-bg-dark border-y border-border-light dark:border-border-dark relative z-10" id="skills">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-12">
        <h2 class="text-3xl font-bold tracking-tight dark:text-white flex items-center gap-3">
          <span class="w-2 h-8 bg-primary rounded-full"></span>
          Technical Skills
        </h2>
      </div>

      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-8" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
        <div v-for="i in 3" :key="i" class="border border-border-light dark:border-border-dark p-6 animate-pulse">
          <div class="h-6 w-32 bg-border-light dark:bg-border-dark rounded mb-4 font-mono"></div>
          <div class="flex flex-wrap gap-2">
            <div v-for="j in 6" :key="j" class="h-6 w-20 bg-border-light dark:bg-border-dark rounded"></div>
          </div>
        </div>
      </div>

      <div v-else class="grid gap-6" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
        <div v-for="category in skills" :key="category.name"
          class="border border-border-light dark:border-border-dark p-6 hover:border-primary/50 transition-colors">
          <div class="flex items-center gap-3 mb-4">
            <component :is="getCategoryIcon(category.name)" class="w-5 h-5" :style="{ color: getCategoryColor(category.name) }" />
            <h3 class="font-mono text-sm font-medium" :style="{ color: getCategoryColor(category.name) }">[{{ category.name.toLowerCase() }}]</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="item in category.items" :key="item"
              class="font-mono text-xs px-2 py-0.5 border text-ink-dark dark:text-ink"
              :style="{ borderColor: getCategoryColor(category.name) + '60' }">
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PortfolioService } from '../utils/PortfolioService';
import { Monitor, Server, Cloud, Boxes, Smartphone, Sparkles, ShieldCheck, Users, Code } from 'lucide-vue-next';

const skills = ref<any[]>([]);
const pending = ref(true);

onMounted(async () => {
  try {
    const portfolioService = new PortfolioService();
    skills.value = await portfolioService.getSkills();
  } catch (e) {
    console.error(e);
  } finally {
    pending.value = false;
  }
});

const iconMap: Record<string, any> = {
  'Frontend': Monitor,
  'Backend': Server,
  'Databases / DevOps': Cloud,
  'State Management & Data Fetching': Boxes,
  'Mobile': Smartphone,
  'AI Tooling': Sparkles,
  'Security': ShieldCheck,
  'Workflow & Collaboration': Users,
};

const colorMap: Record<string, string> = {
  'Frontend': 'oklch(0.78 0.18 145)',
  'Backend': 'oklch(0.82 0.15 75)',
  'Databases / DevOps': 'oklch(0.72 0.15 250)',
  'State Management & Data Fetching': 'oklch(0.75 0.15 25)',
  'Mobile': 'oklch(0.70 0.18 310)',
  'AI Tooling': 'oklch(0.75 0.18 200)',
  'Security': 'oklch(0.65 0.20 25)',
  'Workflow & Collaboration': 'oklch(0.72 0.15 180)',
};

function getCategoryIcon(name: string) {
  return iconMap[name] || Code;
}

function getCategoryColor(name: string) {
  return colorMap[name] || 'oklch(0.72 0.02 160)';
}
</script>
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: build succeeds. Verify the new lucide imports (`Boxes, Smartphone, Sparkles, ShieldCheck, Users`) resolve.

- [ ] **Step 3: Smoke all 8 categories render with a dedicated icon**

Run: `pnpm dev`, scroll to Skills.
Expected: all 8 categories from `skills.json` (Frontend, Backend, Databases / DevOps, State Management & Data Fetching, Mobile, AI Tooling, Security, Workflow & Collaboration) render with a dedicated icon and color — NO generic `Code` fallback for any of the 8. Skills render as mono tags with a colored border, not bullets.

- [ ] **Step 4: Commit**

```bash
git add src/components/Skills.vue
git commit -m "feat(skills): keyed blocks, mono tags, 8-category icon/color map"
```

---

## Task 5: Cert.vue — keyed list grouped by provider type

**Files:**
- Modify: `src/components/Cert.vue` (full rewrite)

**Interfaces:**
- Consumes: `PortfolioService.getCertifications()` (unchanged — returns `{ name, provider, achievement, url }[]`), `--color-primary`, `--font-mono`.
- Produces: a Certs section with certs grouped into `skillValidations`, `courseCompletions`, `other`.

- [ ] **Step 1: Rewrite `Cert.vue`**

Replace the entire file with:

```vue
<template>
  <section class="py-20 bg-bg-light dark:bg-bg-dark relative z-10" id="certifications">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-12">
        <h2 class="text-3xl font-bold tracking-tight dark:text-white flex items-center gap-3">
          <span class="w-2 h-8 bg-primary rounded-full"></span>
          Certifications &amp; Achievements
        </h2>
      </div>

      <div v-if="pending" class="space-y-8">
        <div v-for="i in 4" :key="i" class="border border-border-light dark:border-border-dark p-4 animate-pulse">
          <div class="h-5 w-3/4 bg-border-light dark:bg-border-dark rounded mb-2"></div>
          <div class="h-4 w-full bg-border-light dark:bg-border-dark rounded"></div>
        </div>
      </div>

      <div v-else class="space-y-12">
        <div v-if="grouped.skillValidations.length">
          <h3 class="font-mono text-sm text-primary mb-4">[skill-validations]</h3>
          <div class="space-y-3">
            <div v-for="(cert, i) in grouped.skillValidations" :key="cert.name"
              class="border border-border-light dark:border-border-dark p-4 hover:border-primary/50 transition-colors flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span class="font-mono text-xs text-ink-muted w-8">{{ String(i + 1).padStart(2, '0') }}</span>
              <div class="flex-1">
                <div class="font-bold text-ink dark:text-white">{{ cert.name }}</div>
                <div class="text-sm text-ink-muted dark:text-ink-muted">{{ cert.achievement }}</div>
              </div>
              <span class="font-mono text-xs px-2 py-0.5 border border-primary/40 text-primary self-start sm:self-center">{{ cert.provider }}</span>
              <a v-if="cert.url" :href="cert.url" target="_blank"
                class="font-mono text-sm text-primary hover:text-primary-hover transition-colors whitespace-nowrap">→ view</a>
            </div>
          </div>
        </div>

        <div v-if="grouped.courseCompletions.length">
          <h3 class="font-mono text-sm text-accent mb-4">[course-completions]</h3>
          <div class="space-y-3">
            <div v-for="(cert, i) in grouped.courseCompletions" :key="cert.name"
              class="border border-border-light dark:border-border-dark p-4 hover:border-accent/50 transition-colors flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span class="font-mono text-xs text-ink-muted w-8">{{ String(i + 1).padStart(2, '0') }}</span>
              <div class="flex-1">
                <div class="font-bold text-ink dark:text-white">{{ cert.name }}</div>
                <div class="text-sm text-ink-muted dark:text-ink-muted">{{ cert.achievement }}</div>
              </div>
              <span class="font-mono text-xs px-2 py-0.5 border border-accent/40 text-accent self-start sm:self-center">{{ cert.provider }}</span>
              <a v-if="cert.url" :href="cert.url" target="_blank"
                class="font-mono text-sm text-accent hover:opacity-80 transition-opacity whitespace-nowrap">→ view</a>
            </div>
          </div>
        </div>

        <div v-if="grouped.other.length">
          <h3 class="font-mono text-sm text-ink-muted mb-4">[other]</h3>
          <div class="space-y-3">
            <div v-for="(cert, i) in grouped.other" :key="cert.name"
              class="border border-border-light dark:border-border-dark p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span class="font-mono text-xs text-ink-muted w-8">{{ String(i + 1).padStart(2, '0') }}</span>
              <div class="flex-1">
                <div class="font-bold text-ink dark:text-white">{{ cert.name }}</div>
                <div class="text-sm text-ink-muted dark:text-ink-muted">{{ cert.achievement }}</div>
              </div>
              <a v-if="cert.url" :href="cert.url" target="_blank"
                class="font-mono text-sm text-primary hover:text-primary-hover transition-colors whitespace-nowrap">→ view</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { PortfolioService } from '../utils/PortfolioService';

const certifications = ref<any[]>([]);
const pending = ref(true);

onMounted(async () => {
  try {
    const portfolioService = new PortfolioService();
    certifications.value = await portfolioService.getCertifications();
  } catch (e) {
    console.error(e);
  } finally {
    pending.value = false;
  }
});

const grouped = computed(() => {
  const skillValidations: any[] = [];
  const courseCompletions: any[] = [];
  const other: any[] = [];
  for (const cert of certifications.value) {
    const p = (cert.provider || '').toLowerCase();
    if (p.includes('hackerrank')) skillValidations.push(cert);
    else if (p.includes('zero to mastery')) courseCompletions.push(cert);
    else other.push(cert);
  }
  return { skillValidations, courseCompletions, other };
});
</script>
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 3: Smoke the grouping**

Run: `pnpm dev`, scroll to Certs.
Expected:
- 5 HackerRank certs under `[skill-validations]` (green header).
- 3 Zero To Mastery certs under `[course-completions]` (amber header).
- No `[other]` group (all 8 certs are HackerRank or ZTM).
- Each row: mono index, name (bold), achievement (same weight), provider tag, `→ view` link.
- No 3-up card grid, no large centered icons.

- [ ] **Step 4: Commit**

```bash
git add src/components/Cert.vue
git commit -m "feat(certs): keyed list grouped by provider type"
```

---

## Task 6: Projects.vue — keyed header, 3-col triad, full-border rail

**Files:**
- Modify: `src/components/Projects.vue` (full rewrite of `<template>` and `<style>`)

**Interfaces:**
- Consumes: `PortfolioService.getProjects()` (unchanged — returns `{ title, description, challenge, solution, impact, image, tags }[]`), `--color-primary`, `--font-mono`, lucide `TriangleAlert, Lightbulb, TrendingUp`.
- Produces: project cards with `[case-study NN]` mono headers and a 3-column Challenge/Solution/Impact grid on `md+`.

- [ ] **Step 1: Rewrite `Projects.vue`**

Replace the entire file with:

```vue
<template>
  <section class="py-20 bg-bg-light dark:bg-surface-darker/50" id="work">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-16">
        <h2 class="text-3xl font-bold tracking-tight dark:text-white flex items-center gap-3">
          <span class="w-2 h-8 bg-primary rounded-full"></span>
          Selected Case Studies
        </h2>
        <p class="mt-4 text-lg text-ink-muted dark:text-ink-muted max-w-2xl">
          Deep diving into the technical challenges and strategic impact of each project.
        </p>
      </div>

      <div v-if="pending" class="space-y-8">
        <div v-for="i in 2" :key="i" class="border border-border-light dark:border-border-dark p-6 animate-pulse">
          <div class="h-5 w-32 bg-border-light dark:bg-border-dark rounded mb-4 font-mono"></div>
          <div class="h-8 w-64 bg-border-light dark:bg-border-dark rounded mb-3"></div>
          <div class="h-4 w-full bg-border-light dark:bg-border-dark rounded mb-6"></div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border-light dark:border-border-dark">
            <div v-for="j in 3" :key="j" class="h-20 bg-border-light dark:bg-border-dark rounded"></div>
          </div>
        </div>
      </div>

      <div v-else class="space-y-8">
        <article v-for="(project, index) in projects" :key="project.title"
          class="border-l-2 border-primary/40 border-y border-r border-border-light dark:border-border-dark p-6 sm:p-8 lg:p-10 hover:border-primary/60 transition-colors">
          <div class="font-mono text-sm text-primary mb-3">[case-study {{ String(index + 1).padStart(2, '0') }}]</div>

          <div class="flex flex-wrap gap-2 mb-4">
            <span v-for="tag in project.tags" :key="tag"
              class="font-mono text-xs px-2 py-0.5 border border-primary/40 text-primary">
              {{ tag }}
            </span>
          </div>

          <h3 class="text-2xl lg:text-3xl font-bold text-ink dark:text-white mb-2">
            {{ project.title }}
          </h3>
          <p class="text-ink-muted dark:text-ink-muted mb-6">
            {{ project.description }}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border-light dark:border-border-dark">
            <div>
              <h4 class="font-mono text-xs text-primary mb-2 flex items-center gap-1">
                <TriangleAlert class="w-3.5 h-3.5" /> &gt; challenge
              </h4>
              <p class="text-sm text-ink-muted dark:text-ink-muted leading-relaxed">
                {{ project.challenge }}
              </p>
            </div>
            <div>
              <h4 class="font-mono text-xs text-primary mb-2 flex items-center gap-1">
                <Lightbulb class="w-3.5 h-3.5" /> &gt; solution
              </h4>
              <p class="text-sm text-ink-muted dark:text-ink-muted leading-relaxed">
                {{ project.solution }}
              </p>
            </div>
            <div>
              <h4 class="font-mono text-xs text-primary mb-2 flex items-center gap-1">
                <TrendingUp class="w-3.5 h-3.5" /> &gt; impact
              </h4>
              <p class="text-sm text-ink dark:text-ink leading-relaxed font-medium">
                {{ project.impact }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PortfolioService } from '../utils/PortfolioService';
import { TriangleAlert, Lightbulb, TrendingUp } from 'lucide-vue-next';

const projects = ref<any[]>([]);
const pending = ref(true);

onMounted(async () => {
  try {
    const portfolioService = new PortfolioService();
    projects.value = await portfolioService.getProjects();
  } catch (e) {
    console.error(e);
  } finally {
    pending.value = false;
  }
});
</script>
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 3: Smoke the triad layout**

Run: `pnpm dev`, scroll to Projects.
Expected:
- Each card has a `[case-study 01]` / `[case-study 02]` / `[case-study 03]` mono header (NOT a large faded corner number).
- Left edge has a 2px `border-primary/40` rail (full border, not a 4px side-stripe).
- On desktop (≥768px): Challenge / Solution / Impact sit side-by-side in a 3-col grid.
- On mobile (<768px): the triad stacks vertically.
- No image anywhere on the cards.

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects.vue
git commit -m "feat(projects): keyed header, 3-col triad, full-border rail"
```

---

## Task 7: About.vue — three keyed blocks, CV-grounded copy

**Files:**
- Modify: `src/components/About.vue` (full rewrite of `<template>`, `<script setup>`, `<style>`)

**Interfaces:**
- Consumes: `--color-primary`, `--font-mono`, lucide `Shield, Server, Users`.
- Produces: an About section with `[reliability]`, `[stack]`, `[mentorship]` keyed blocks and CV-grounded body copy.

- [ ] **Step 1: Rewrite `About.vue`**

Replace the entire file with:

```vue
<template>
  <section class="py-24 bg-bg-light dark:bg-bg-dark relative overflow-hidden" id="about">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-black text-ink dark:text-white mb-6 leading-tight">
          More than code — I operate <br class="hidden lg:block" />high-reliability systems.
        </h2>
      </div>

      <div class="space-y-6 text-lg text-ink-muted dark:text-ink-muted text-center mb-16">
        <p>
          I work on <strong class="text-ink dark:text-white">SIGEF 2</strong> — the Dominican Republic's national
          financial-management platform at the Ministerio de Hacienda — designing Go and Node.js microservices,
          modeling relational and NoSQL data, and operating the platform in production under federal audit
          cadence at <strong class="text-primary">99.9% uptime</strong>.
        </p>
        <p>
          Async-first remote operator in UTC−4 with full overlap to LATAM and US business hours. I lead code
          reviews and mentor mid/junior engineers on Go patterns, concurrency, and maintainable service design.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="border border-border-light dark:border-border-dark p-6">
          <div class="flex items-center gap-2 mb-3">
            <Shield class="w-5 h-5 text-primary" />
            <h3 class="font-mono text-sm text-primary">[reliability]</h3>
          </div>
          <h4 class="font-bold text-ink dark:text-white mb-2">Federal Audit-Grade</h4>
          <p class="text-sm text-ink-muted dark:text-ink-muted">99.9% uptime on SIGEF 2 state financial transactions under federal audit windows.</p>
        </div>

        <div class="border border-border-light dark:border-border-dark p-6">
          <div class="flex items-center gap-2 mb-3">
            <Server class="w-5 h-5 text-primary" />
            <h3 class="font-mono text-sm text-primary">[stack]</h3>
          </div>
          <h4 class="font-bold text-ink dark:text-white mb-2">Backend-First Full-Stack</h4>
          <p class="text-sm text-ink-muted dark:text-ink-muted">Go + Node.js microservices with Swagger/OpenAPI contracts; React and Vue on the frontend.</p>
        </div>

        <div class="border border-border-light dark:border-border-dark p-6 sm:col-span-2 lg:col-span-1">
          <div class="flex items-center gap-2 mb-3">
            <Users class="w-5 h-5 text-primary" />
            <h3 class="font-mono text-sm text-primary">[mentorship]</h3>
          </div>
          <h4 class="font-bold text-ink dark:text-white mb-2">Mentor &amp; Code-Review Lead</h4>
          <p class="text-sm text-ink-muted dark:text-ink-muted">Own PR standards and mentor mid/junior engineers on Go patterns, concurrency, and maintainable design.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Shield, Server, Users } from 'lucide-vue-next';
</script>
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 3: Smoke the About section**

Run: `pnpm dev`, scroll to About.
Expected:
- Three keyed blocks: `[reliability]`, `[stack]`, `[mentorship]` with Shield/Server/Users icons.
- Body copy mentions SIGEF 2, Ministerio de Hacienda, Go, Node.js, 99.9% uptime, UTC−4, LATAM.
- On mobile: blocks stack (1 col). On `sm`: 2 cols (third block spans 2). On `lg`: 3 cols.
- No "Security First" / "Real Scalability" cards remain.

- [ ] **Step 4: Commit**

```bash
git add src/components/About.vue
git commit -m "feat(about): three keyed blocks grounded in CV facts (SIGEF 2, Go, mentorship)"
```

---

## Task 8: Footer.vue — direct contact, dynamic year, terminal styling

**Files:**
- Modify: `src/components/Footer.vue` (full rewrite)

**Interfaces:**
- Consumes: `--color-primary`, `--font-mono`, lucide `Mail, Phone`.
- Produces: a Footer with `mailto:` and `tel:` links and a dynamic copyright year.

- [ ] **Step 1: Rewrite `Footer.vue`**

Replace the entire file with:

```vue
<template>
  <footer class="bg-surface-darker border-t border-border-dark pt-16 pb-8" id="contact">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 class="text-3xl font-bold text-white mb-4">Ready to scale your product?</h2>
          <p class="text-ink-muted mb-8 max-w-md">
            Currently available for consulting and technical leadership roles. Let's talk about how I can bring value to your team.
          </p>
          <div class="flex flex-col gap-3 font-mono text-sm">
            <a :href="'mailto:elmm.programing@gmail.com'" class="flex items-center gap-2 text-ink-muted hover:text-primary transition-colors">
              <Mail class="w-4 h-4" /> elmm.programing@gmail.com
            </a>
            <a :href="'tel:+18494424113'" class="flex items-center gap-2 text-ink-muted hover:text-primary transition-colors">
              <Phone class="w-4 h-4" /> +1 849 442 4113
            </a>
          </div>
        </div>
        <div class="flex flex-col justify-end items-start md:items-end">
          <div class="flex space-x-6 mb-6">
            <a class="text-ink-muted hover:text-primary transition-colors" href="https://github.com/elmm-programing" target="_blank">
              <span class="sr-only">GitHub</span>
              <svg aria-hidden="true" class="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path clip-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  fill-rule="evenodd"></path>
              </svg>
            </a>
            <a class="text-ink-muted hover:text-primary transition-colors" href="https://www.linkedin.com/in/edwin-levinson-mej%C3%ADa-marcelino-738746201/" target="_blank">
              <span class="sr-only">LinkedIn</span>
              <svg aria-hidden="true" class="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path clip-rule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  fill-rule="evenodd"></path>
              </svg>
            </a>
          </div>
          <p class="font-mono text-sm text-ink-muted">© {{ year }} Edwin Levinson. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Mail, Phone } from 'lucide-vue-next';
const year = new Date().getFullYear();
</script>
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 3: Smoke the footer**

Run: `pnpm dev`, scroll to footer.
Expected:
- Email link `elmm.programing@gmail.com` (clickable, opens mail client).
- Phone link `+1 849 442 4113` (clickable, opens tel handler).
- Copyright shows the current year (e.g., `© 2026 Edwin Levinson. All rights reserved.`), in mono.
- GitHub + LinkedIn icons still present, hover turns primary green.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.vue
git commit -m "feat(footer): direct email/phone links, dynamic year, terminal styling"
```

---

## Task 9: Full smoke + contrast verification

**Files:** None modified — verification only.

- [ ] **Step 1: Full build**

Run: `pnpm build`
Expected: build succeeds, no TS errors, no new dependencies in `package.json`.

- [ ] **Step 2: Verify no new dependencies**

Run: `git diff package.json`
Expected: no changes to `dependencies` or `devDependencies` (the only allowed change would be if a pre-existing dep was removed; none should be).

- [ ] **Step 3: Smoke at 320px, 768px, 1280px in dark mode (default)**

Run: `pnpm dev`, open at each width.
Expected at all widths:
- No horizontal overflow.
- Hero status line wraps gracefully at 320px; headline scales.
- Stack pills scroll horizontally at 320px (no scrollbar), fit at 768px+.
- Nav: transparent at top, solid on scroll, active link underlined.
- Skills: keyed blocks, mono tags, 8 categories each with a dedicated icon.
- Certs: two groups (`[skill-validations]` green, `[course-completions]` amber), compact rows.
- Projects: `[case-study NN]` headers, 3-col triad on ≥768px, stacked on <768px, 2px left rail.
- About: three keyed blocks, CV copy (SIGEF 2, 99.9%, Go, mentorship).
- Footer: email + phone links, dynamic year.

- [ ] **Step 4: Smoke light mode**

Click the `☀` toggle in the nav.
Expected: site flips to light mode (off-white bg, dark ink, same green/amber accents). All sections remain readable. Preference persists across reload.

- [ ] **Step 5: Contrast check**

Open the built site in a browser with a contrast checker extension (or use DevTools → Elements → Accessibility panel).
Verify:
- Body text (`--color-ink` on `--color-bg-dark`): ≥4.5:1
- Muted text (`--color-ink-muted` on `--color-bg-dark`): ≥4.5:1 — if it fails, bump `--color-ink-muted` toward `oklch(0.78 0.02 160)` in `src/style.css` and rebuild.
- Primary accent (`--color-primary` on `--color-bg-dark`): ≥4.5:1 (used on bold/large text)
- In light mode: `--color-ink-dark` on `--color-bg-light`: ≥4.5:1

- [ ] **Step 6: Reduced-motion check**

DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce", reload.
Expected: the `█` cursor in the hero is static (not blinking). No other motion on the page.

- [ ] **Step 7: AI-slop self-check**

Step back and look at the portfolio honestly:
- Is there any gradient text? (Should be none.)
- Is Inter anywhere? (Should be gone — Sora + JetBrains Mono only.)
- Are there identical card grids? (Skills/certs should be keyed blocks/lists, not 3-up cards.)
- Are there large faded numbered eyebrows? (Projects use `[case-study NN]` mono headers, not corner numbers.)
- Are there side-stripes >1px? (Projects use a 2px full border, not a 4px stripe.)
- Does it look like a 2022 template or a 2026 terminal-native portfolio? (Should be the latter.)

- [ ] **Step 8: Final commit (if any fixes were made during smoke)**

If Steps 3–7 surfaced fixes, commit them:
```bash
git add -A
git commit -m "fix(ui): post-smoke adjustments for terminal-native redesign"
```

If no fixes were needed, this step is a no-op.

---

## Self-Review

**Spec coverage:**
- Decision 1 (fonts) → Task 1 (tokens + index.html fonts).
- Decision 2 (status-line hero) → Task 2.
- Decision 3 (color strategy) → Task 1 (tokens) + Task 9 Step 5 (contrast verify).
- Decision 4 (skills keyed blocks) → Task 4.
- Decision 5 (certs grouped) → Task 5.
- Decision 6 (projects keyed header + triad + full border) → Task 6.
- Decision 7 (About CV-grounded) → Task 7.
- Decision 8 (dark mode default + toggle + FOUC) → Task 1 (FOUC) + Task 3 (toggle).
- Decision 9 (scroll-aware nav) → Task 3.
- Decision 10 (footer contact + year) → Task 8.
- All 3 open questions resolved (tagline verbatim, full prompt, blinking cursor) → Task 2.
- Global constraints (no new deps, no gradient text, no Inter, no side-stripes, no numbered eyebrows, no identical grids, mono-not-body, dark default, contrast, reduced-motion) → enforced across Tasks 1–9, verified in Task 9.

**Placeholder scan:** No TBD/TODO. Every step has complete code or an exact command.

**Type consistency:** `PortfolioService` method names (`getProjects`, `getSkills`, `getCertifications`) match across Tasks 2–6. `activeSection` and `scrolled` refs defined in Task 3 are used consistently in the NavBar template. `grouped` computed in Task 5 uses `skillValidations` / `courseCompletions` / `other` consistently in template. No mismatches found.

No issues found. Plan is complete.