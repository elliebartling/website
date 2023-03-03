<template>
  <nav class="fixed top-0 w-full flex flex-row justify-end z-50 px-8 py-6 gap-x-6">
    <NuxtLink to="/#projects" class="text-white font-sans font-bold cursor-pointer">projects</NuxtLink>
    <NuxtLink to="/about" class="text-white font-sans font-bold cursor-pointer">about</NuxtLink>
  </nav>
  <NuxtPage />
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>