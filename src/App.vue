<template>
  <div class="bg-background-light dark:bg-background-dark text-gray-900 dark:text-white transition-colors duration-200 font-sans antialiased">
     <NavBar />
     <Introduction />
     <Projects />
     <Skills />
     <Cert />
     <About />
     <Footer />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Introduction from './components/Introduction.vue';
import Projects from './components/Projects.vue';
import Skills from './components/Skills.vue';
import Cert from './components/Cert.vue';
import About from './components/About.vue';
import Footer from './components/Footer.vue';
</script>
