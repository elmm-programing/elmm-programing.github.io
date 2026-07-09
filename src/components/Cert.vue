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