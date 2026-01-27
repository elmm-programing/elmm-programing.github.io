<template>
  <nav class="fixed top-0 w-full z-50 glass-nav border-b border-gray-200 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center gap-2">
          <div class="w-8 h-8 rounded bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
            E
          </div>
          <span class="font-bold text-xl tracking-tight dark:text-white">Edwin Levinson</span>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#work" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Casos de Estudio</a>
          <a href="#skills" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Habilidades</a>
          <a href="#certifications" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Certificaciones</a>
          <a href="#about" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Sobre mí</a>
          <a href="#contact" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Contacto</a>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button @click="isMenuOpen = !isMenuOpen" type="button" class="text-gray-300 hover:text-white">
            <Menu class="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div v-show="isMenuOpen" class="md:hidden glass-nav border-b border-gray-800">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
        <a href="#work" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Casos de Estudio</a>
        <a href="#skills" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Habilidades</a>
        <a href="#certifications" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Certificaciones</a>
        <a href="#about" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Sobre mí</a>
        <a href="#contact" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Contacto</a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Menu } from 'lucide-vue-next';

const isMenuOpen = ref(false);
</script>
