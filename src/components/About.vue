<template>
  <section class="py-24 bg-bg-light dark:bg-bg-dark relative overflow-hidden" id="about">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-black text-ink dark:text-white mb-6 leading-tight">
          More than code — I operate <br class="hidden lg:block" />high-reliability systems.
        </h2>
      </div>

      <div class="space-y-6 text-lg text-ink-muted dark:text-ink-muted text-center mb-16">
        <p>
          I work on <strong class="text-ink dark:text-white">SIGEF 2</strong> — the Dominican Republic's national
          financial-management platform at the Ministerio de Hacienda — designing Go and Node.js microservices,
          modeling relational and NoSQL data, and operating the platform in production under federal audit
          cadence at <strong class="text-primary">99.9% uptime</strong>.
        </p>
        <p>
          Async-first remote operator in UTC−4 with full overlap to LATAM and US business hours. I lead code
          reviews and mentor mid/junior engineers on Go patterns, concurrency, and maintainable service design.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="border border-border-light dark:border-border-dark p-6">
          <div class="flex items-center gap-2 mb-3">
            <Shield class="w-5 h-5 text-primary" />
            <h3 class="font-mono text-sm text-primary">[reliability]</h3>
          </div>
          <h4 class="font-bold text-ink dark:text-white mb-2">Federal Audit-Grade</h4>
          <p class="text-sm text-ink-muted dark:text-ink-muted">99.9% uptime on SIGEF 2 state financial transactions under federal audit windows.</p>
        </div>

        <div class="border border-border-light dark:border-border-dark p-6">
          <div class="flex items-center gap-2 mb-3">
            <Server class="w-5 h-5 text-primary" />
            <h3 class="font-mono text-sm text-primary">[stack]</h3>
          </div>
          <h4 class="font-bold text-ink dark:text-white mb-2">Backend-First Full-Stack</h4>
          <p class="text-sm text-ink-muted dark:text-ink-muted">Go + Node.js microservices with Swagger/OpenAPI contracts; React and Vue on the frontend.</p>
        </div>

        <div class="border border-border-light dark:border-border-dark p-6 sm:col-span-2 lg:col-span-1">
          <div class="flex items-center gap-2 mb-3">
            <Users class="w-5 h-5 text-primary" />
            <h3 class="font-mono text-sm text-primary">[mentorship]</h3>
          </div>
          <h4 class="font-bold text-ink dark:text-white mb-2">Mentor &amp; Code-Review Lead</h4>
          <p class="text-sm text-ink-muted dark:text-ink-muted">Own PR standards and mentor mid/junior engineers on Go patterns, concurrency, and maintainable design.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Shield, Server, Users } from 'lucide-vue-next';
</script>