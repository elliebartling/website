import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const page_id = process.env.NOTION_PAGE_ID;

let payload = [];

async function getPage() {
  const data = await notion.pages.retrieve({ page_id });
  console.log('logging data', data)
  return data;
}

getPage().then((data) => {
  payload = data;
});

export default defineEventHandler(() => payload);