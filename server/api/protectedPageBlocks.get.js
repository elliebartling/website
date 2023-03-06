import { Client } from "@notionhq/client";
import { getPageBlocks } from "vue3-notion"

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default eventHandler(async (event) => {

  const query = getQuery(event)
  const id = query.id
  const password = query.password

  // Get page data from notion
  const page = await notion.pages.retrieve({ page_id: id })

  // If password matches page password, get page blocks
  if (page.properties.Password && page.properties.Password.rich_text[0].plain_text === password) {
    // const blocks = await getPageBlocks(id)

    // fetch from api with headers
    const blocks = await $fetch(`https://api.vue-notion.workers.dev/v1/page/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NOTION_V2_TOKEN}`
      }
    })

    return blocks
  } else {
    throw new Error("Incorrect password")
  }


  return page
})

// https://ellenbartling.notion.site/Pok-mon-Tera-Typer-10069a80217c48f0995dced91f72e1b7