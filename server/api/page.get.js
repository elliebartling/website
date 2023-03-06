import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default eventHandler(async (event) => {

  const query = getQuery(event)
  const id = query.id

  // Get page data from notion
  const page = await notion.pages.retrieve({ page_id: id })

  page.protected = true

  // Remove Password field from page
  delete page.properties.Password

  return page
})