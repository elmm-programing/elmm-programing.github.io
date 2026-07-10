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
            {{ $t(link.labelKey) }}
          </a>
          <span class="font-mono text-sm">
            <button @click="setLocale('en')" type="button"
              :class="['transition-colors', locale === 'en' ? 'text-primary' : 'text-ink-muted hover:text-primary']"
              aria-label="English">EN</button>
            <span class="text-ink-muted"> | </span>
            <button @click="setLocale('es')" type="button"
              :class="['transition-colors', locale === 'es' ? 'text-primary' : 'text-ink-muted hover:text-primary']"
              aria-label="Español">ES</button>
          </span>
          <button @click="toggleTheme" type="button"
            class="font-mono text-sm text-ink-dark dark:text-ink-muted hover:text-primary transition-colors px-2"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
            {{ isDark ? '☀' : '☾' }}
          </button>
        </div>

        <div class="md:hidden flex items-center gap-3">
          <span class="font-mono text-sm">
            <button @click="setLocale('en')" type="button"
              :class="['transition-colors', locale === 'en' ? 'text-primary' : 'text-ink-muted hover:text-primary']"
              aria-label="English">EN</button>
            <span class="text-ink-muted"> | </span>
            <button @click="setLocale('es')" type="button"
              :class="['transition-colors', locale === 'es' ? 'text-primary' : 'text-ink-muted hover:text-primary']"
              aria-label="Español">ES</button>
          </span>
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
          {{ $t(link.labelKey) }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Menu } from 'lucide-vue-next';

const { locale, t } = useI18n();

const links = [
  { id: 'work', labelKey: 'nav.caseStudies' },
  { id: 'skills', labelKey: 'nav.skills' },
  { id: 'certifications', labelKey: 'nav.certs' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'contact', labelKey: 'nav.contact' },
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

function setLocale(l: 'en' | 'es') {
  locale.value = l;
  try { localStorage.setItem('locale', l); } catch {}
  document.documentElement.lang = l;
}

function onScroll() {
  scrolled.value = window.scrollY > 24;
}

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark');
  document.documentElement.lang = locale.value;
  document.title = t('meta.title');
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

watch(locale, (l) => {
  document.documentElement.lang = l;
  document.title = t('meta.title');
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  observer?.disconnect();
});
</script>