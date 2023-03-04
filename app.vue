<template>
  <div>
    <div class="peek top"></div>
    <nav class="fixed top-0 w-full flex flex-row justify-end z-50 px-8 py-6 gap-x-6">
      <NuxtLink to="/" class="text-white font-sans font-bold cursor-pointer">home</NuxtLink>
      <NuxtLink to="/#projects" class="text-white font-sans font-bold cursor-pointer">projects</NuxtLink>
      <NuxtLink to="/about" class="text-white font-sans font-bold cursor-pointer">about</NuxtLink>
    </nav>
    <div class="page">
      <NuxtPage />
    </div>
    <div class="peek bottom">
      <p class="fixed bottom-2">oh hi there :)</p>
    </div>
  </div>
</template>
<script setup>
const route = useRoute()
console.log('route', route.name)
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
  @apply bg-violet-400;
  /* position: static; */
}

.peek {
  @apply h-80 w-screen;
  @apply fixed left-0;
  @apply bg-gradient-to-b from-transparent to-rose-400;
  z-index: 1;
}

.top { 
  top: -18rem;
  /* top: 0px; */
}

.bottom { 
  bottom: -18rem;
  @apply text-white font-mono text-xs flex flex-row items-end justify-center; 
}
</style>