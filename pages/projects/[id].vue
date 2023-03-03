<template>
    <h1></h1>
    <NotionRenderer v-if="page" :blockMap="page" fullPage />
</template>
<script setup>
import { NotionRenderer, getPageBlocks, useGetPageBlocks } from "vue3-notion"
import { ref, onMounted } from "vue"

const route = useRoute()
const { data: page } = await useGetPageBlocks(route.query.id)
console.log(page)

</script>
<style>
* { @apply text-white; }
</style>