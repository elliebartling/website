<template>
  <div>
    <NuxtLoadingIndicator ref="loader" class="z-80" color="repeating-linear-gradient(to right,#22d3ee 0%,#8b5cf6 50%,#fb7185 100%)" />
    <!-- <div class="peek top"></div> -->
    <nav class="">
      <div class="left text-white font-bold">
        <NuxtLink to="/" class="text-white font-sans font-bold cursor-pointer">ellen marie bartling</NuxtLink>
      </div>
      <div class="right flex flex-row justify-end gap-x-6">
        <!-- <NuxtLink to="/" class="text-white font-sans font-bold cursor-pointer">projects</NuxtLink> -->
        <NuxtLink to="/about" class="text-white font-sans font-bold cursor-pointer">about</NuxtLink>
        <NuxtLink to="https://github.com/elliebartling" class="text-white font-sans font-bold cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
        </NuxtLink>
        <NuxtLink to="https://www.linkedin.com/in/ellenmbartling/" class="text-white font-sans font-bold cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
        </NuxtLink>
      </div>
    </nav>
    <div class="page" :class="`page-${useKebabCase(route.name)}`">
      <NuxtPage :projects="projects" />
    </div>
    <div class="peek bottom">
      <div class="fixed bottom-2 flex flex-row justify-between items-center w-full px-2 lg:px-6">
        <NuxtLink to="/" class="">???? back to home</NuxtLink>
        <p class="">oh hi :)</p>
        <NuxtLink to="/about" class="">about me ????</NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>
const route = useRoute()
const loader = ref(null)
let projects = ref([])
  
await $fetch('/api/projects')
  .then((res) => {
    console.log('res', res)
    projects.value = res
  }, (error) => {
    console.log('error', error.message)
  })

// Start the loader
const startLoader = () => {
  loader.start()
}

const finishLoader = () => {
  loader.finish()
}
</script>
<style>
.page {
  @apply bg-zinc-900 min-h-screen mb-8 relative;
  z-index: 5;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(10rem);
}

html {
  /* @apply bg-zinc-800; */
  /* @apply bg-gradient-to-r from-purple-500 to-rose-400; */
  /* background: linear-gradient(to right, rgb(168, 85, 247), rgb(251, 113, 133)); */
  @apply bg-zinc-800;
}

.peek {
  @apply h-80 w-screen;
  @apply fixed left-0;
  /* @apply bg-gradient-to-b from-purple-500 to-rose-400; */
  @apply flex flex-row;
  z-index: 1;
}

.top { 
  top: -18rem;
  /* top: 0px; */
}

.bottom { 
  bottom: -18rem;
  @apply text-white font-mono text-xs flex flex-row items-end justify-between; 
  a { @apply block px-2; }
  a:hover {@apply bg-purple-500;}
}

nav { 
  @apply flex flex-row justify-between z-50 w-full absolute top-0;
  @apply px-6 py-6 gap-x-6;
}

nav a {
  @apply text-white font-sans font-bold cursor-pointer;
}

nav svg {
  @apply w-6 h-6 fill-white;
}
</style>