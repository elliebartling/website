import { Client } from "@notionhq/client";
import _ from 'nuxt-lodash';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const projects_id = process.env.NOTION_PROJECTS_ID;


export default defineEventHandler(async() => {
  let payload = [];

  const data = await notion.databases.query({ 
      database_id: projects_id,
      page_size: 100,
      // "sorts": [
      //     {
      //         "property": "Name",
      //         "direction": "ascending"
      //     }
      // ]
  })
  .then(async (data) => {
      const projects = data.results
        .filter((n) => n.properties['Published'] && n.properties['Published'].select.name === 'Published')
        .map((n) => {
          // Prevent pass
          let passwordProtected = n.properties.Password && n.properties.Password.rich_text.length > 0
          delete n.properties.Password
  
          const name = n.properties['Name'].title.length > 0 ? n.properties['Name'].title[0].plain_text : ''
          const shortname = n.properties['Short Name'].rich_text.length > 0 ? n.properties['Short Name'].rich_text[0].plain_text : ''
          const excerpt = n.properties['Excerpt'].rich_text.length > 0 ? n.properties['Excerpt'].rich_text[0].plain_text : ''
          const image = n.properties['Featured Image'].files.length > 0 ? n.properties['Featured Image'].files[0].file.url : ''
          let project = {
              id: n.id,
              cover: n.cover,
              image,
              name,
              excerpt,
              shortname,
              full: n,
              passwordProtected
          }
  
          return project
      })
      payload = projects
  });
  return payload
});