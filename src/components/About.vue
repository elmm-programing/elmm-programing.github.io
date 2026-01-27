<template>
  <section class="py-24 bg-background-light dark:bg-background-dark relative overflow-hidden" id="about">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <span class="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Mi Enfoque</span>
          <h2 class="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
            Más que código — construyo <br class="hidden lg:block" />sistemas de alta confiabilidad.
          </h2>
        </div>
        
        <div class="space-y-6 text-lg text-text-secondary text-center">
          <p>
            Graduado del <strong>ITLA</strong> con sólida formación técnica. En mi experiencia como Senior Developer, he
            aprendido que en el sector financiero la seguridad no es negociable y el rendimiento es vital.
          </p>
          <p>
            Mi metodología integra principios de <strong class="text-gray-900 dark:text-white font-semibold">Lean
              UX</strong> adaptados a entornos de alta seguridad (ISO). Priorizo la robustez arquitectónica y la mentoría
            técnica para asegurar que cada línea de código cumpla con los estándares más exigentes de la industria.
          </p>
        </div>

        <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div class="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm">
            <div class="w-12 h-12 rounded-lg bg-surface-dark flex items-center justify-center border border-gray-700 mb-4">
              <Shield class="w-6 h-6 text-primary" />
            </div>
            <h4 class="font-bold text-gray-900 dark:text-white text-lg">Seguridad Primero</h4>
            <p class="text-sm text-text-secondary mt-2">Desarrollo seguro en entornos financieros críticos.</p>
          </div>
          
          <div class="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm">
            <div class="w-12 h-12 rounded-lg bg-surface-dark flex items-center justify-center border border-gray-700 mb-4">
              <Send class="w-6 h-6 text-primary" />
            </div>
            <h4 class="font-bold text-gray-900 dark:text-white text-lg">Escalabilidad Real</h4>
            <p class="text-sm text-text-secondary mt-2">Sistemas diseñados para soportar alta transaccionalidad.</p>
          </div>
        </div>
      </div>
  </section>
</template>

<script setup lang="ts">
import { Shield, Send } from 'lucide-vue-next';
</script>
