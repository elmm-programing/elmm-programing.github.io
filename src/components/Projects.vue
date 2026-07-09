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