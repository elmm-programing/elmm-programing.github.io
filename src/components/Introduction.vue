<template>
  <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="font-mono text-sm sm:text-base text-primary mb-6 break-all">
        <span class="text-ink-muted">&gt; elmm@portfolio:~$</span> status <span class="text-ink-muted">—</span> Senior Full-Stack Developer <span class="text-ink-muted">|</span> React <span class="text-ink-muted">·</span> Vue <span class="text-ink-muted">·</span> Next.js <span class="text-ink-muted">·</span> Nuxt.js <span class="text-ink-muted">·</span> Node.js <span class="text-ink-muted">·</span> Go <span class="text-ink-muted">|</span> Remote LATAM<span class="cursor-blink text-primary">█</span>
      </div>

      <h1 class="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-4 dark:text-white text-balance">
        I build scalable architectures and <span class="text-primary">high-security financial systems</span>
      </h1>

      <p class="mt-4 text-xl text-ink-muted dark:text-ink-muted max-w-2xl mx-auto font-light leading-relaxed">
        Go and Node.js backend specialist. 4+ years operating SIGEF 2 — the Dominican Republic's national financial-management platform — at 99.9% uptime under federal audit cadence.
      </p>

      <div class="mt-10 flex flex-wrap justify-center gap-4">
        <a class="inline-flex items-center px-6 py-3 border-2 border-primary text-base font-mono font-medium text-primary hover:bg-primary hover:text-bg-dark transition-all"
          href="#work">
          $ view --case-studies
        </a>
        <a class="inline-flex items-center px-6 py-3 border-2 border-border-light dark:border-border-dark text-base font-mono font-medium text-ink-dark dark:text-ink-muted hover:border-primary hover:text-primary dark:hover:text-primary transition-all"
          href="#contact">
          $ contact --me
        </a>
      </div>

      <div class="mt-12 flex flex-wrap justify-center gap-2 overflow-x-auto no-scrollbar">
        <span v-for="tech in stack" :key="tech"
          class="font-mono text-xs px-3 py-1 border border-primary/40 text-primary whitespace-nowrap">
          {{ tech }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stack = ['React', 'Vue', 'Next.js', 'Nuxt.js', 'Node.js', 'Go'];
</script>