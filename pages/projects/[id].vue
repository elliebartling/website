<template>
    <div>
        <div v-if="page && page.properties['Featured Image'].files && page.properties['Featured Image']" class="notion-featured-image">
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
<script setup>
import { NotionRenderer } from "vue3-notion"

const route = useRoute()
const visible = ref(false)
const passwordNeeded = ref(false)
const password = ref('')
const blocks = ref('')
const page = ref()

await $fetch('/api/pageBlocks', {
    query: {
        id: route.query.id
    }
})
.then(res => {
    console.log('res', res)
    const b = res.blocks
    const p = res.page
    blocks.value = b
    page.value = p
    passwordNeeded.value = false
    setTimeout(() => applyHighlighters(), 1000)
    setTimeout(() => findQuickFacts(), 1000)
    setTimeout(() => hideHiddenBlocks(), 1000)
    return res
}, error => {
    console.log('error', error.message)
    passwordNeeded.value = true
})



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
    if (windowWidth > 768) {
        widthModifier = 80
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
            top: ${titleFontSizeNumber * i}px;
            z-index: -1;
            width: ${lines[i] + widthModifier}px;
            height: ${titleFontSizeNumber}px;
        `
        // Append the image to the title element
        title.appendChild(image)
    }

    visible.value = true
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

onMounted(() => {
    // Add event listener to window resize & debounce
    window.addEventListener("resize", applyHighlightersDebounced)
})

async function handleButton(){
    await $fetch('/api/pageBlocks', {
        query: {
            id: route.query.id,
            password: password.value
        }
    })
    .then(res => {
        console.log('res', res)
        const b = res.blocks
        const p = res.page
        blocks.value = b
        page.value = p
        passwordNeeded.value = false
        setTimeout(() => applyHighlighters(), 1000)
        setTimeout(() => findQuickFacts(), 1000)
        setTimeout(() => hideHiddenBlocks(), 1000)
        return res
    }, error => {
        console.log('error', error.message)
        passwordNeeded.value = true
    })
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