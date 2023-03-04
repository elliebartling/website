<template>
    <Background />
    <div class="hello">
      <h1 class="title">
        <span>👋</span>
        <span>Hi, I'm Ellen.</span>
        <span>I'm a senior UX designer</span>
        <span>& front-end engineer</span>
        <span class="text-gray-800">— in Seattle, WA ☕ </span>
        <!-- <div class="flex flex-row text-base font-mono font-medium mt-8 gap-x-8">
          <span class="">About me</span>
          <span class="">Projects</span>
        </div> -->
      </h1>
      <div class="flex flex-col text-white text-sm font-mono font-medium mt-8 gap-x-8">
          <div class="line"></div>
          <span class="">Wanna see something neat? 👀 👇</span>
        </div>
    </div>
    <div id="projects" v-if="projects" class="bg-gray-900 px-20 py-40 text-white">
      <div class="container">
        <h2 class="text-sm font-mono uppercase text-gray-500 mb-8 flex flex-row items-center gap-x-4">
            Some things I've worked on
            <span class="mdash color w-64 h-[1px]"></span>
        </h2>
        <CaseStudyList 
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
//   const projects = ref(0)

  onMounted(async () => {
    console.log('gettingdata...')
    useFetch('/api/projects')
    // const { data: page } = await useGetPageBlocks("8d2402846c9047bb81da03b92ee13846")
  })
  
  </script>
  <style>
    body::-webkit-scrollbar{
      display: none;
    }
    body {
      @apply bg-gray-900;
    }
    .title { 
      @apply flex flex-col;
      @apply text-7xl font-sans text-white font-bold;
      mix-blend-mode: overlay;
    }
    .hello {
      @apply z-40 relative;
      @apply w-screen h-[100vh] flex flex-col justify-between items-start;
      @apply px-40 pt-60 pb-16;
    }
  
    .mdash {
      @apply relative block;
    }
  
    .mdash.color {
      @apply bg-gradient-to-r from-rose-400 via-purple-400 to-cyan-500;
    }
  </style>