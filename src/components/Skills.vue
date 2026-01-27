<template>
  <section class="py-20 bg-white dark:bg-surface-dark border-y border-gray-100 dark:border-gray-800 relative z-10" id="skills">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-12">
        <h2 class="text-3xl font-bold tracking-tight dark:text-white flex items-center gap-3">
          <span class="w-2 h-8 bg-primary rounded-full"></span>
          Habilidades Técnicas
        </h2>
      </div>

      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 3" :key="i" class="bg-gray-50 dark:bg-surface-darker/50 rounded-xl p-8 border border-gray-100 dark:border-gray-800 animate-pulse">
          <div class="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
          <div class="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="j in 6" :key="j" class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="category in skills" :key="category.name" 
             class="bg-gray-50 dark:bg-surface-darker/50 rounded-xl p-8 border border-gray-100 dark:border-gray-800 h-full">
          <div class="flex items-center gap-3 mb-6">
            <div :class="[getCategoryColor(category.name).bg, getCategoryColor(category.name).text, 'w-10 h-10 rounded-lg flex items-center justify-center']">
              <component :is="getCategoryIcon(category.name)" class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ category.name }}</h3>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="item in category.items" :key="item" class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>{{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { NotionService } from '../utils/NotionService';
import { Monitor, Server, Cloud, Code } from 'lucide-vue-next';

const skills = ref<any[]>([]);
const pending = ref(true);

onMounted(async () => {
    try {
        const notionService = new NotionService();
        skills.value = await notionService.getSkills();
    } catch (e) {
        console.error(e);
    } finally {
        pending.value = false;
    }
});

const getCategoryIcon = (name: string) => {
  const icons: Record<string, any> = {
    'Frontend': Monitor,
    'Backend': Server,
    'Databases / DevOps': Cloud
  };
  return icons[name] || Code;
};

const getCategoryColor = (name: string) => {
  const colors: Record<string, { bg: string, text: string }> = {
    'Frontend': { bg: 'bg-blue-500/10', text: 'text-primary' },
    'Backend': { bg: 'bg-green-500/10', text: 'text-green-500' },
    'Databases / DevOps': { bg: 'bg-purple-500/10', text: 'text-purple-500' }
  };
  return colors[name] || { bg: 'bg-gray-500/10', text: 'text-gray-500' };
};
</script>
