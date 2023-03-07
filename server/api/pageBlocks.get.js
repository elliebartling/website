import { getPageBlocks } from "vue3-notion"
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default eventHandler(async (event) => {

        const query = getQuery(event)
        const id = query.id
        const password = query.password

        // Get page data from notion
        const page = await notion.pages.retrieve({ page_id: id })

        // If password field rich text has a value, page is protected
        page.protected = page.properties.Password && page.properties.Password.rich_text.length > 0

        // If page is protected, check if password matches
        if (page.protected) {
            if (!password || password !== page.properties.Password.rich_text[0].plain_text) {
                throw new Error("Incorrect password")
            } else {
                // fetch from api with headers
                const blocks = await $fetch(`https://api.vue-notion.workers.dev/v1/page/${id}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NOTION_V2_TOKEN}`
                    }
                })
                return { blocks, page }
            }
        } else {
            const blocks = await $fetch(`https://api.vue-notion.workers.dev/v1/page/${id}`)
            return { blocks, page }
        }
    }
)


// https://www.notion.so/ellenbartling/Bringing-social-reading-to-Kindle-Vella-8e61627961e949d89439ef56e125e9be?pvs=4