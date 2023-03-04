<template>
    <NuxtLink class="link" :class="{selected}" :to="`/projects/${slugify(name)}?id=${project_id}`">
        <h3 class="text-3xl lg:text-7xl z-20 top-2 lg:top-3 -left-4 relative font-bold z-10 inline-block">{{ project.shortname }}</h3>
        <div class="img z-30">
            <img :src="project.image" />
        </div>
        <!-- <div class="flex flex-col relative px-2">
            <div class="highlight blurry" :class="{selected}"></div>
            <div class="highlight" :class="{selected}"></div>
            <h3 class="text-5xl font-bold z-10 inline-block">{{ project.shortname }}</h3>
        </div> -->
    </NuxtLink>
</template>
<style scoped>
.img {
    @apply rounded-md overflow-hidden;
}
.mdash {
    @apply w-4 h-0.5;
    @apply bg-gray-600;
    transition: all 0.5s ease;
}
.link {
    @apply flex flex-col gap-x-4 items-start;
    @apply cursor-pointer;
    @apply text-white;
    transition: all 0.5s ease;
}

.selected.link {
    transition: all 0.5s ease;
}

.highlight {
    @apply absolute left-0 top-4 block z-0;
    @apply h-8 w-2 rounded-sm;
    @apply bg-gradient-to-r from-orange-400 to-rose-400;
    @apply opacity-0;
    transition: all 0.5s ease;
}
.blurry {
    @apply top-6 left-2 h-4;
    filter: blur(20px);
}
.highlight.selected {
    @apply w-full opacity-100;
    transition: all 0.5s ease;
}

.selected .mdash {
    @apply w-12;
    @apply bg-gradient-to-r from-rose-400 via-purple-400 to-cyan-500;
    transition: all 0.5s ease;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  height: 0px;
}
</style>
<script>
export default {
    props: ['name', 'excerpt', 'project_id', 'selected', 'project'],
    computed: {
        image() {
            return this.project.cover ? this.project.cover.file.url : ''
        }
    },
    methods: {
        slugify(text) {
            return text
                .toString()
                .toLowerCase()
                .replace(/\s+/g, '-') // Replace spaces with -
                .replace(/[^\w\-]+/g, '') // Remove all non-word chars
                .replace(/\-\-+/g, '-') // Replace multiple - with single -
                .replace(/^-+/, '') // Trim - from start of text
                .replace(/-+$/, '') // Trim - from end of text

        }
    }
}
</script>