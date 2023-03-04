<template>
    <div class="flex flex-row">
        <div class="mt-16 collection w-full gap-y-8">
            <div class="blank h-96 mt-32"></div>
            <CaseStudyTile 
                v-for="(project, index) in projects" 
                :key="project.id"
                :project_id="project.id"
                :name="project.name" 
                :excerpt="project.excerpt"
                :project="project"
                :selected="selected === project.id"
                @mouseenter="setNewProject(project.id)"
                class="mb-2 item"
            />
        </div>
        <!-- <div class="wrapper w-1/2 h-screen transition-all transition-ease relative">
            <div class="img w-full relative" :style="`transform: rotate(${rotation}deg);`">
                <div class="shadow z-0"></div>
                <img :src="src" class="rounded-3xl z-10 relative" />
                <div class="backfill z-0"></div>
            </div>
        </div> -->
    </div>
</template>
<script>
import CaseStudyTile from './CaseStudyTile.vue'
export default {
    props: ['projects'],
    data() {
        return {
            selected: '3cac6907-b1a7-4cd4-9e5f-192902cac305',
            rotation: 0
        }
    },
    computed: {
        selectedProject() {
            return this.projects.find((p) => p.id === this.selected)
        },
        src() {
            return this.selectedProject.image
        },
        shortname() {
            return this.selectedProject.shortname
        }
    },
    methods: {
        setNewProject(id) {
            this.selected = id
            this.getRotation() 
        },
        getRotation() {
            const max = 6;
            const min = 3;
            const multiplier = Math.random() < 0.5 ? -1 : 1;
            // this.rotation = Math.floor(Math.random() * (max - min + 1) + min) * multiplier
        }
    }
}
</script>
<style>
.collection {
    @apply w-full gap-32;
    columns: 2;
    counter-reset: grid;
}

.item {
    break-inside: avoid;
}

.item + .item { 
    @apply mt-96;
}
.img {
    @apply transition-all relative;
}

.backfill {
    @apply absolute w-full h-full block top-0 rounded-3xl;
    @apply bg-violet-500;
}
.shadow {
    @apply block absolute w-full h-full;
    @apply top-8 -right-4 bg-gradient-to-r from-rose-400 to-purple-500;
    @apply blur-3xl;
    transform: scale(.95);
}
.project-title {
    @apply text-6xl font-bold absolute w-5/6 block;
    @apply -top-12 -left-6;
    @apply text-white;
}
</style>