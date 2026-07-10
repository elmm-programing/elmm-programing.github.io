<template>
  <section class="py-24 bg-bg-light dark:bg-bg-dark relative overflow-hidden" id="about">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-black text-ink dark:text-white mb-6 leading-tight">
          <i18n-t keypath="about.headline" tag="span" scope="global">
            <template #break><br class="hidden lg:block" /></template>
          </i18n-t>
        </h2>
      </div>

      <div class="space-y-6 text-lg text-ink-muted dark:text-ink-muted text-center mb-16">
        <p>
          <i18n-t keypath="about.body1" tag="span" scope="global">
            <template #strong><strong class="text-ink dark:text-white">SIGEF 2</strong></template>
            <template #primary><strong class="text-primary">{{ $t('about.uptime') }}</strong></template>
          </i18n-t>
        </p>
        <p>{{ $t('about.body2') }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="border border-border-light dark:border-border-dark p-6">
          <div class="flex items-center gap-2 mb-3">
            <Shield class="w-5 h-5 text-primary" />
            <h3 class="font-mono text-sm text-primary">[{{ $t('about.reliability') }}]</h3>
          </div>
          <h4 class="font-bold text-ink dark:text-white mb-2">{{ $t('about.reliabilityTitle') }}</h4>
          <p class="text-sm text-ink-muted dark:text-ink-muted">{{ $t('about.reliabilityDesc') }}</p>
        </div>

        <div class="border border-border-light dark:border-border-dark p-6">
          <div class="flex items-center gap-2 mb-3">
            <Server class="w-5 h-5 text-primary" />
            <h3 class="font-mono text-sm text-primary">[{{ $t('about.stack') }}]</h3>
          </div>
          <h4 class="font-bold text-ink dark:text-white mb-2">{{ $t('about.stackTitle') }}</h4>
          <p class="text-sm text-ink-muted dark:text-ink-muted">{{ $t('about.stackDesc') }}</p>
        </div>

        <div class="border border-border-light dark:border-border-dark p-6 sm:col-span-2 lg:col-span-1">
          <div class="flex items-center gap-2 mb-3">
            <Users class="w-5 h-5 text-primary" />
            <h3 class="font-mono text-sm text-primary">[{{ $t('about.mentorship') }}]</h3>
          </div>
          <h4 class="font-bold text-ink dark:text-white mb-2">{{ $t('about.mentorshipTitle') }}</h4>
          <p class="text-sm text-ink-muted dark:text-ink-muted">{{ $t('about.mentorshipDesc') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Shield, Server, Users } from 'lucide-vue-next';
</script>