<template>
    <NotionRenderer v-if="page" :blockMap="page" fullPage />
</template>
<script setup>
import { NotionRenderer, getPageBlocks, useGetPageBlocks } from "vue3-notion"

const route = useRoute()

// https://ellenbartling.notion.site/About-me-8d2402846c9047bb81da03b92ee13846
const { data: page } = await useGetPageBlocks('8d2402846c9047bb81da03b92ee13846')

</script>
<style>
.page-about {
    .notion-page { 
        @apply py-24 px-8; 

        .notion-row {
            @apply max-w-5xl px-8;
            @media screen and (min-width: 1024px) {
                margin-left: calc(-32rem + 50%);    
            }
        }

        .notion-row .notion-column .notion-asset-wrapper {
            @apply lg:pl-24 -rotate-2 relative;
            @apply w-1/2 lg:w-full mb-6;

            img {
                @apply rounded-2xl z-50;
                @apply w-full;
            }

            &::after {
                content: "";
                @apply absolute block -left-2 top-2;
                @apply w-full lg:w-2/3 mx-auto h-full;
                @apply bg-gradient-to-tr from-violet-500 to-cyan-500;
                @apply blur-xl inset-x-2 inset-y-5 scale-90;
            }
        }

        h1 {
            line-height: 120%;
            @apply mb-4 lg:mt-24;
        }

        h1 [class^="notion-"] {
            @apply block;
        }
    }
}
/* .notion-column, .notion-row { @apply overflow-visible; }
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
} */
</style>