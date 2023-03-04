<template>
    <div class="fixed bg-black w-full h-4 top-0 z-10"></div>
    <div class="hello h-full">
      <Background class="z-0" /> 
      <h1 class="title w-1/2">
        <span>👋</span>
        <span>Hi, I'm Ellen.</span>
        <span>I'm a senior UX designer</span>
        <span>& front-end engineer</span>
        <span class="text-gray-800">— in Seattle, WA ☕ </span>
      </h1>
      <CaseStudyList 
        v-if="projects.length > 0"  
        :projects="projects" 
        />
    </div>
  </template>
  <script setup>
  import { NotionRenderer, getPageBlocks, useGetPageBlocks } from "vue3-notion"
  import Background from "../components/Background.vue";
  import CaseStudyList from "../components/CaseStudyList.vue";
  import { ref, onMounted } from "vue"
  
  const { data: projects } = await useFetch('/api/projects')

  onMounted(async () => {
    console.log('gettingdata...')
    useFetch('/api/projects')
    // const { data: page } = await useGetPageBlocks("8d2402846c9047bb81da03b92ee13846")
  })
  
  </script>
  <style>
    .title { 
      @apply flex flex-col z-10;
      @apply text-7xl font-sans text-white font-bold;
    }

    .hello {
      @apply z-40 relative;
      @apply w-screen h-full flex flex-col justify-between items-start;
      @apply px-40 pt-60 pb-16;
    }
  
    .mdash {
      @apply relative block;
    }
  
    .mdash.color {
      @apply bg-gradient-to-r from-rose-400 via-purple-400 to-cyan-500;
    }
  </style>