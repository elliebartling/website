<template>
    <NotionRenderer class="wrap" v-if="page" :blockMap="page" fullPage />
</template>
<script setup>
import { NotionRenderer, getPageBlocks, useGetPageBlocks } from "vue3-notion"
// const { $notion } = useNuxtApp()
const route = useRoute()

const { data: page } = await useGetPageBlocks(route.query.id)
// const { data: page } = await useAsyncData("notion", () => {
//     return $notion.getPageBlocks(route.query.id)
// })

// const { data: page } = await useFetch('/api/page', {
//     query: {
//         id: route.query.id
//     }
// })
// console.log(page)
</script>