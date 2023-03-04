<template>
    <NotionRenderer class="wrap" v-if="page" :blockMap="page" fullPage />
</template>
<script setup>
import { NotionRenderer, useGetPageBlocks } from "vue3-notion"

const route = useRoute()
const { data: page } = await useGetPageBlocks(route.query.id)
console.log('page',page)

</script>
<style>
.notion-text {
    @apply text-2xl text-gray-300 font-light leading-9;
}

.notion { 
    @apply text-white pt-28; 
}

.notion-asset-wrapper {
    @apply w-screen !important;
    @apply px-6;
}
.notion-asset-wrapper img {
    @apply w-screen h-auto;
    max-width: 100%;
}

.notion-asset-wrapper div {
    @apply h-auto w-screen;
    max-width: 95vw;
}
</style>