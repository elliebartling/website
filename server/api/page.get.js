import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
// const page_id = process.env.NOTION_PAGE_ID;



let payload = [];

async function getPage(page_id) {
  const data = await notion.blocks.children.list({ page_id });
//   console.log('logging data', data)
  return data;
}

getPage().then((data) => {
  payload = data;
});

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id
  console.log('logging page_id', id)
  const { results } = await notion.blocks.children.list({ 
    block_id: id,
   });
  return results
});