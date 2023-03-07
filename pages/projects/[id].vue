<template>
    <div>
        <div :class="{ 'show': showProgress, 'hide': !showProgress }" class="w-full fixed h-3 z-50">
            <div ref="loader" class="loader h-1" :style="`width: ${progress}%`"></div>
        </div>
        <div v-if="visible && page && page.properties['Featured Image'].files && page.properties['Featured Image']" class="notion-featured-image">
            <img :src="page.properties['Featured Image'].files[0].file.url" alt="" />
        </div>
        <NotionRenderer 
            class="wrap" 
            :class="{ 'visible' : visible }"
            v-if="blocks" 
            :blockMap="blocks" 
            fullPage 
        />
        <div class="password" v-if="passwordNeeded">
            <h1>This case study is protected. Please enter the password to view.</h1>
            <input v-model="password" type="email" name="email" id="email" class="" placeholder="Enter a password" />
            <button class="btn" @click="handleButton()">Submit 🚀 </button>
        </div>
    </div>
</template>
<script>
import { NotionRenderer } from "vue3-notion"
import { useRoute } from "vue-router"

const applyFormatting = function() {
    applyHighlighters()
    findQuickFacts()
    hideHiddenBlocks()
    fixAspectRatio()
}

const fixAspectRatio = function() {
    const images = document.querySelectorAll('.notion-image-inset')
    images.forEach(image => {
        const imageWidth = image.offsetWidth
        const imageHeight = image.offsetHeight
        const imageAspectRatio = imageWidth / imageHeight
        // get parent div
        const imageContainer = image.parentNode
        imageContainer.style['aspect-ratio'] = imageAspectRatio
    })
}


const applyHighlighters = function() {
    // Get the page title element
    const title = document.querySelector('.notion-title')

    // Get the page title text
    const titleText = title.innerText

    // Get the page title height
    const titleHeight = title.offsetHeight

    // Get the text size of the title from computed style
    const titleFontSize = window.getComputedStyle(title).fontSize

    // Remove 'px' from the end of the string
    const titleFontSizeNumber = Number(titleFontSize.slice(0, -2))

    // Figure out how many lines of text there are
    const titleLines = Math.round(titleHeight / titleFontSizeNumber)

    // Get the rendered width of each line ------------------
    // For each character in the title text, add a span
    title.innerHTML = titleText.split('').map(char => `<span>${char}</span>`).join('')

    let lines = {}

    // For each span, check the offsetLeft and offsetTop
    title.querySelectorAll('span').forEach(span => {
        // If the offsetTop is not in the lines object, add it
        if (!lines[span.offsetTop]) {
            lines[span.offsetTop] = 0
        }
        // Get the width of the span
        const spanWidth = span.offsetWidth

        // Add each span to the lines object by offsettop, getting the total width
        lines[span.offsetTop] += spanWidth
    })

    // Convert lines to an array in order by offsetTop
    lines = Object.entries(lines).sort((a, b) => a[0] - b[0]).map(line => line[1])
    
    const windowWidth = window.innerWidth
    let widthModifier = 0
    let heightModifier = 6
    if (windowWidth > 768) {
        widthModifier = 80
        heightModifier = 0
    }
    
    // For each line of text, append an image
    for (let i = 0; i < titleLines; i++) {
        // Create a new image element
        const image = document.createElement('img')
        
        // Select a random number between 1 and 9
        const random = Math.floor(Math.random() * 8) + 1
        
        // Set the image source
        image.src = `/highlighter_0${random}.png`
        
        // Add class highlighter
        image.classList.add('highlighter')
        
        // Add style to the image
        image.style = `
            top: ${titleFontSizeNumber * i + heightModifier}px;
            z-index: -1;
            width: ${lines[i] + widthModifier}px;
            height: ${titleFontSizeNumber}px;
        `
        // Append the image to the title element
        title.appendChild(image)
    }
}

// Debounce applyHighlighters
const applyHighlightersDebounced = useDebounce(applyHighlighters, 100)

const hideHiddenBlocks = function() {
    // Get all the hidden blocks
    const hiddenBlocks = document.querySelectorAll('.notion-toggle')
    // Loop through each section
    for (let i = 0; i < hiddenBlocks.length; i++) {
        const title = hiddenBlocks[i].querySelector('summary')
        if (title && title.innerText === 'Hide') {
                console.log('found hidden', hiddenBlocks[i])
                // Add class 'quick-facts'
                hiddenBlocks[i].classList.add('hidden')
        }
    }
}

// A function to find the "quick facts" section
const findQuickFacts = function() {
    console.log('finding quick facts')

    // Get all the sections
    const sections = document.querySelectorAll('.notion-toggle')

    console.log('sections', sections)

    // Loop through each section
    for (let i = 0; i < sections.length; i++) {
        // Get the section title
        const title = sections[i].querySelector('summary')

        // If the title is "Quick Facts", return the section
        if (title && title.innerText === 'Quick Facts') {
            console.log('found quick facts', sections[i])
            // Add class 'quick-facts'
            sections[i].classList.add('quick-facts')

            // Get the li items and split the text into groups by the colon
            const items = sections[i].querySelectorAll('li')
            items.forEach(item => {
                const text = item.innerText.split(':')
                // Remove trailing whitespace at the beginning of second item
                text[1] = text[1].trim()
                item.innerHTML = `<span class="label">${text[0]}:</span><span class="value">${text[1]}</span>`
            })
            
            // Add open attribute
            sections[i].setAttribute('open', '')
            
            return sections[i]
        }
    }
}
// const nuxtApp = useNuxtApp()
// console.log(nuxtApp, nuxtApp.vueApp)

export default {
    props: ['projects'],
    data() {
        return {
            blocks: [],
            page: null,
            password: 'scroll',
            passwordNeeded: false,
            visible: false,
            project: null,
            progress: 10,
            showProgress: false
        }
    },
    methods: {
        applyFormatting,
        applyHighlighters,
        hideHiddenBlocks,
        findQuickFacts,
        handleButton() {
            this.showProgress = true
            this.$nextTick(() => {
                this.progress = 10
                this.getBlocks()
            })
        },
        getBlocks() {
            const app = this
            this.progress = 100
            $fetch('/api/pageBlocks', {
                query: {
                    id: this.route.query.id,
                    password: this.password
                }
            })
            .then(res => {
                this.blocks = res.blocks
                this.page = res.page
                this.passwordNeeded = false
                setTimeout(() => this.applyFormatting(), 1000)
                setTimeout(() => this.showProgress = false, 2000)
                this.visible = true
            }, error => {
                console.log(error)
            })
        }
    },
    setup(props) {
        const route = useRoute()
        const project = props.projects.find(p => p.id === route.query.id)
        return { project, route }
    },
    mounted() {
        // Add event listener to window resize & debounce
        window.addEventListener("resize", applyHighlightersDebounced)
        const app = this
        console.log(app.$loading, app.$nuxt, app.$nuxt.$refs)
        if (this.project.passwordProtected) {
            console.log('password needed')
            this.passwordNeeded = true
        } else {
            console.log('no password needed, getting blocks')
            this.getBlocks()
        }
    }
}
</script>
<style scoped>
.notion-featured-image {
    @apply h-auto lg:h-[80vh] object-cover overflow-hidden;
}
.wrap.visible {
    opacity: 1;
    transition: opacity 1s;
}

.wrap {
    opacity: 0;
    transition: opacity 1s;
}

.password {
    @apply w-1/2 mx-auto text-center h-screen flex flex-col justify-center items-center;
    @apply text-white font-bold;
}

.password input {
    @apply block w-full px-3 rounded-md border-0 py-1.5 mt-8;
    @apply bg-zinc-800  text-gray-200 font-normal shadow-sm ring-1 ring-inset ring-violet-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-violet-400 sm:text-sm sm:leading-6;
}

.password .btn {
    @apply block px-4 py-2 rounded-md mt-5 text-sm relative;
    @apply bg-gradient-to-tr from-violet-500 via-purple-500 to-cyan-500;
    &:hover {
        /* @apply bg-gradient-to-tr from-purple-500 via-cyan-500 to-rose-400; */
        animation: gradient 10s ease infinite;
        @apply transition-all;
        @apply shadow-lg shadow-violet-500/50;
    }
}

.loader {
    @apply bg-gradient-to-r from-violet-400 via-purple-500 to-cyan-500;
    transition: all 2s linear;
}

.show { @apply opacity-100; }

.hide { @apply opacity-0; }

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>