<template>
  <div class="home">
    <div class="hello h-full">
      <Background class="z-0" /> 
      <h1 class="title">
        <span>👋</span>
        <span>Hi, I'm Ellen.</span>
        <span>I'm a UX designer</span>
        <span>& front-end engineer</span>
        <span class="text-gray-800">— in Seattle, WA ☕ </span>
      </h1>
      <CaseStudyList 
        class="mt-40"
        v-if="projects.length > 0"  
        :projects="projects" 
        />
    </div>
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
    // useFetch('/api/projects')
    // const { data: page } = await useGetPageBlocks("8d2402846c9047bb81da03b92ee13846")
  })
  
  </script>
  <style>
    .title { 
      @apply flex flex-col z-10 font-sans text-white font-bold;
      @apply text-4xl w-full;
      @apply lg:text-7xl lg:w-1/2;
    }

    .hello {
      @apply z-40 relative;
      @apply w-screen h-full flex flex-col justify-between items-start;
      @apply px-8 pt-32;
      @apply lg:px-40 lg:pt-60 pb-16;
    }
  
    .mdash {
      @apply relative block;
    }
  
    .mdash.color {
      @apply bg-gradient-to-r from-rose-400 via-purple-400 to-cyan-500;
    }
  </style>