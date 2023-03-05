<template>
    <NotionRenderer 
        class="wrap" 
        :class="{ 'visible' : visible }"
        v-if="page" 
        :blockMap="page" 
        fullPage 
    />
</template>
<script setup>
import { NotionRenderer, getPageBlocks, useGetPageBlocks } from "vue3-notion"
import { debounce } from "lodash";
// const { $notion } = useNuxtApp()
const route = useRoute()

const { data: page } = await useGetPageBlocks(route.query.id)

const visible = ref(false)

// const { data: page } = await useAsyncData("notion", () => {
//     return $notion.getPageBlocks(route.query.id)
// })

// const { data: page } = await useFetch('/api/page', {
//     query: {
//         id: route.query.id
//     }
// })
console.log('pageother',page)

// const doSomething = function() {
//     console.log('updated')
// }

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

    console.log('lines widths', lines)
    
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
            top: ${titleFontSizeNumber * i + 10}px;
            z-index: -1;
            width: ${lines[i] + 80}px;
            height: ${titleFontSizeNumber}px;
        `
        // Append the image to the title element
        title.appendChild(image)
    }

    visible.value = true
}

// Debounce applyHighlighters
const applyHighlightersDebounced = debounce(applyHighlighters, 100)


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
    window.addEventListener("resize", applyHighlightersDebounced);
    // Wait until NotionRenderer is mounted
    setTimeout(() => applyHighlighters(), 1000)
    setTimeout(() => findQuickFacts(), 1000)
})

</script>
<style scoped>
.wrap.visible {
    opacity: 1;
    transition: opacity 1s;
}

.wrap {
    opacity: 0;
    transition: opacity 1s;
}
</style>