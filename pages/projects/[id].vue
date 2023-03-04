<template>
    <NotionRenderer class="wrap" v-if="page" :blockMap="page" fullPage />
</template>
<script setup lang="ts">
const { $notion } = useNuxtApp()
const route = useRoute()

const { data: page } = await useAsyncData("notion", () => {
    const data = $notion.getPageBlocks(route.query.id)
    console.log('log?', $notion, data)
    return $notion.getPageBlocks(route.query.id)
})

// const { data: page } = await useFetch('/api/page', {
//     query: {
//         id: route.query.id
//     }
// })
console.log(page)
</script>
<style scoped>
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