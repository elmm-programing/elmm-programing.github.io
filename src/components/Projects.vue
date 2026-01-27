<template>
  <section class="py-20 bg-gray-50 dark:bg-surface-darker/50" id="work">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-16">
        <h2 class="text-3xl font-bold tracking-tight dark:text-white flex items-center gap-3">
          <span class="w-2 h-8 bg-primary rounded-full"></span>
          Casos de Estudio Seleccionados
        </h2>
        <p class="mt-4 text-lg text-text-secondary max-w-2xl">
          Profundizando en los desafíos técnicos y el impacto estratégico de cada proyecto.
        </p>
      </div>

      <div v-if="pending" class="space-y-12">
        <div v-for="i in 2" :key="i" class="bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 animate-pulse">
          <div class="flex flex-col lg:flex-row h-[400px]">
            <div class="lg:w-2/5 h-full bg-gray-200 dark:bg-gray-800"></div>
            <div class="lg:w-3/5 p-10 flex flex-col justify-center space-y-4">
              <div class="flex gap-2"><div class="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div></div>
              <div class="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div class="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div class="grid grid-cols-3 gap-6 pt-6">
                <div v-for="j in 3" :key="j" class="h-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="space-y-12">
        <article v-for="project in projects" :key="project.title"
          class="bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-colors group">
          <div class="flex flex-col lg:flex-row h-full">
            <div class="lg:w-2/5 h-64 lg:h-auto bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
              <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                :style="{ backgroundImage: `url('${project.image}')` }">
                <div class="absolute inset-0 bg-gradient-to-t from-surface-dark/90 to-transparent lg:bg-gradient-to-r">
                </div>
              </div>
            </div>
            <div class="lg:w-3/5 p-8 lg:p-10 flex flex-col justify-center">
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="tag in project.tags" :key="tag"
                  class="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">{{ tag }}</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ project.title }}</h3>
              <p class="text-text-secondary mb-8">{{ project.description }}</p>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                <div>
                  <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-1">
                    <TriangleAlert class="w-4 h-4 text-red-400" /> El Desafío
                  </h4>
                  <p class="text-sm text-text-secondary leading-relaxed">{{ project.challenge }}</p>
                </div>
                <div>
                  <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-1">
                    <Lightbulb class="w-4 h-4 text-blue-400" /> La Solución
                  </h4>
                  <p class="text-sm text-text-secondary leading-relaxed">{{ project.solution }}</p>
                </div>
                <div class="relative pl-4 md:border-l border-gray-700">
                  <div class="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-full md:hidden"></div>
                  <h4 class="text-sm font-semibold text-green-500 mb-1 flex items-center gap-1">
                    <TrendingUp class="w-4 h-4" /> El Impacto
                  </h4>
                  <p class="text-sm text-text-secondary leading-relaxed font-medium">{{ project.impact }}</p>
                </div>
              </div>
              
              <div class="mt-auto">
                <button
                  class="inline-flex items-center text-sm font-bold text-primary hover:text-primary-hover transition-colors group/btn">
                  Leer análisis completo
                  <ArrowRight class="w-5 h-5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { NotionService } from '../utils/NotionService';
import { TriangleAlert, Lightbulb, TrendingUp, ArrowRight } from 'lucide-vue-next';

const projects = ref<any[]>([]);
const pending = ref(true);

onMounted(async () => {
    try {
        const notionService = new NotionService();
        projects.value = await notionService.getProjects();
    } catch (e) {
        console.error(e);
    } finally {
        pending.value = false;
    }
});
</script>
