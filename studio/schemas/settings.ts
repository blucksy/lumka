/* 
Settings/Homepage section
	Array of Homepage Item(Object/ Reference)
	

Settings/INFO section
Biography: Rich Text
Contact: Rich Text
Fellowship, Honors & Awards: (object) Array of portabletext
Selected Publications & Clients: portabletext
Selected press: portabletext


*/

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'publications',
      title: 'Selected News',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
            },
            {
              name: 'category',
              title: 'Category',
              description: 'ex: offsite, reviewed, announcement',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'blockContent',
            },
            {
              name: 'subtitle',
              title: 'Subtitle',
              type: 'blockContent',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Website Settings',
      }
    },
  },
})
