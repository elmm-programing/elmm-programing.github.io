<template>
  <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10">
    </div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <h1 class="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 dark:text-white">
        Construyo arquitecturas escalables y <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">sistemas financieros</span>
        de alta seguridad
      </h1>
      <p class="mt-4 text-xl text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
        Especialista en Vue.js, Nuxt 3 y TypeScript con experiencia liderando migraciones en entornos de misión crítica.
      </p>
      <div class="mt-10 flex justify-center gap-4">
        <a class="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-bold rounded-md text-white bg-primary hover:bg-primary-hover hover:-translate-y-0.5 transition-all shadow-glow"
          href="#work">
          Ver Casos de Estudio
        </a>
        <a class="inline-flex items-center px-8 py-3.5 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-50 dark:hover:bg-surface-dark transition-all"
          href="#contact">
          Hablemos
        </a>
      </div>
      <div
        class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800/50 flex flex-wrap justify-center gap-x-8 gap-y-4 text-text-secondary grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
        <div class="flex items-center gap-2"><Code class="w-5 h-5" /> Vue.js</div>
        <div class="flex items-center gap-2"><Layers class="w-5 h-5" /> Nuxt 3</div>
        <div class="flex items-center gap-2"><Share2 class="w-5 h-5" /> TypeScript</div>
        <div class="flex items-center gap-2"><Palette class="w-5 h-5" /> Tailwind CSS</div>
        <div class="flex items-center gap-2"><Terminal class="w-5 h-5" /> Go</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Code, Layers, Share2, Palette, Terminal } from 'lucide-vue-next';
</script>
