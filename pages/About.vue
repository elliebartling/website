<template>
    <NotionRenderer v-if="page" :blockMap="page" fullPage />
</template>
<script setup>
import { NotionRenderer, getPageBlocks, useGetPageBlocks } from "vue3-notion"

const route = useRoute()

// https://ellenbartling.notion.site/About-me-8d2402846c9047bb81da03b92ee13846
const { data: page } = await useGetPageBlocks('8d2402846c9047bb81da03b92ee13846')

</script>
<style scoped>
.page .notion-page.notion .notion-title { @apply text-red-500; }
.notion-column, .notion-row { @apply overflow-visible; }
.notion-page {
    @apply mt-24;
}
.notion-asset-wrapper { 
    @apply rounded-3xl relative; 
}
.notion-asset-wrapper img { @apply rounded-2xl -rotate-2; }
.notion-asset-wrapper::after {
    content: "";
    @apply absolute -z-10;
    @apply w-full h-full;
    @apply bg-gradient-to-tr from-orange-300 to-violet-500;
    @apply blur-xl inset-5 scale-90;
}

.notion-callout {
    @apply aspect-square w-80 block relative;
    @apply bg-purple-300;
}
</style>