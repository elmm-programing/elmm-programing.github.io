<template>
  <section class="py-20 bg-background-light dark:bg-background-dark relative z-10" id="certifications">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-12">
        <h2 class="text-3xl font-bold tracking-tight dark:text-white flex items-center gap-3">
          <span class="w-2 h-8 bg-purple-600 rounded-full"></span>
          Certificaciones y Logros
        </h2>
      </div>

      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="i in 3" :key="i" class="bg-white dark:bg-surface-dark rounded-xl p-8 border border-gray-100 dark:border-gray-800 animate-pulse">
          <div class="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800 mb-6 mx-auto"></div>
          <div class="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-4 mx-auto"></div>
          <div class="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
          <div class="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto"></div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article v-for="cert in certifications" :key="cert.name"
          class="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-all hover:shadow-lg h-full flex flex-col items-center text-center group">
          <div class="w-20 h-20 rounded-full bg-purple-600/10 text-purple-600 dark:text-purple-500 flex items-center justify-center mb-6 group-hover:bg-purple-600/20 transition-colors shadow-sm">
            <BadgeCheck class="w-10 h-10" />
          </div>
          <h4 class="font-bold text-gray-900 dark:text-white text-lg mb-2">{{ cert.name }}</h4>
          <p class="text-text-secondary text-sm mb-6">{{ cert.achievement }}</p>
          
          <div class="mt-auto flex flex-col items-center gap-4">
            <span class="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-text-secondary rounded-full">{{ cert.provider }}</span>
            <a v-if="cert.url" :href="cert.url" target="_blank" 
               class="text-sm font-bold text-primary hover:text-primary-hover transition-colors flex items-center gap-1 group/link">
              Ver Certificado
              <ExternalLink class="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { NotionService } from '../utils/NotionService';
import { BadgeCheck, ExternalLink } from 'lucide-vue-next';

const certifications = ref<any[]>([]);
const pending = ref(true);

onMounted(async () => {
    try {
        const notionService = new NotionService();
        certifications.value = await notionService.getCertifications();
    } catch (e) {
        console.error(e);
    } finally {
        pending.value = false;
    }
});
</script>
