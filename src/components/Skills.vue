<template>
  <section class="py-20 bg-bg-light dark:bg-bg-dark border-y border-border-light dark:border-border-dark relative z-10" id="skills">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-12">
        <h2 class="text-3xl font-bold tracking-tight dark:text-white flex items-center gap-3">
          <span class="w-2 h-8 bg-primary rounded-full"></span>
          {{ $t('skills.title') }}
        </h2>
      </div>

      <div v-if="pending" class="grid gap-6" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
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
              :style="{ borderColor: getCategoryColor(category.name) }">
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { PortfolioService } from '../utils/PortfolioService';
import { Monitor, Server, Cloud, Boxes, Smartphone, Sparkles, ShieldCheck, Users, Code } from 'lucide-vue-next';

const { locale } = useI18n();
const skills = ref<any[]>([]);
const pending = ref(true);

async function load() {
  pending.value = true;
  try {
    const portfolioService = new PortfolioService(locale.value);
    skills.value = await portfolioService.getSkills();
  } catch (e) {
    console.error(e);
  } finally {
    pending.value = false;
  }
}

onMounted(load);
watch(locale, load);

// Map both EN and ES category names to the same icon/color
const iconMap: Record<string, any> = {
  'Frontend': Monitor,
  'Backend': Server,
  'Databases / DevOps': Cloud,
  'Bases de Datos / DevOps': Cloud,
  'State Management & Data Fetching': Boxes,
  'Gestión de Estado y Data Fetching': Boxes,
  'Mobile': Smartphone,
  'Móvil': Smartphone,
  'AI Tooling': Sparkles,
  'Herramientas IA': Sparkles,
  'Security': ShieldCheck,
  'Seguridad': ShieldCheck,
  'Workflow & Collaboration': Users,
  'Flujo de Trabajo y Colaboración': Users,
};

const colorMap: Record<string, string> = {
  'Frontend': 'var(--color-cat-frontend)',
  'Backend': 'var(--color-cat-backend)',
  'Databases / DevOps': 'var(--color-cat-dbdevops)',
  'Bases de Datos / DevOps': 'var(--color-cat-dbdevops)',
  'State Management & Data Fetching': 'var(--color-cat-state)',
  'Gestión de Estado y Data Fetching': 'var(--color-cat-state)',
  'Mobile': 'var(--color-cat-mobile)',
  'Móvil': 'var(--color-cat-mobile)',
  'AI Tooling': 'var(--color-cat-ai)',
  'Herramientas IA': 'var(--color-cat-ai)',
  'Security': 'var(--color-cat-security)',
  'Seguridad': 'var(--color-cat-security)',
  'Workflow & Collaboration': 'var(--color-cat-workflow)',
  'Flujo de Trabajo y Colaboración': 'var(--color-cat-workflow)',
};

function getCategoryIcon(name: string) {
  return iconMap[name] || Code;
}

function getCategoryColor(name: string) {
  return colorMap[name] || 'var(--color-ink-muted)';
}
</script>