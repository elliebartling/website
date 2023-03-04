<template>
    <NuxtLink to="/" class="fixed top-6 left-8 text-white font-bold">⬅️ back</NuxtLink>
    <NotionRenderer v-if="page" :blockMap="page" fullPage />
</template>
<script setup>
import { NotionRenderer, useGetPageBlocks } from "vue3-notion"

const route = useRoute()
const { data: page } = await useGetPageBlocks(route.query.id)
console.log(page)

</script>
<style>
.notion * { 
    @apply text-white; 
}
</style>