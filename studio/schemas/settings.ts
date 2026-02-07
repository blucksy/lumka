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
      name: 'homepage',
      title: 'Homepage Projects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}],
    }),
    defineField({
      name: 'highlight',
      description: 'Highlight color for links',
      title: 'Highlight Color',
      type: 'color',
    }),
    defineField({
      name: 'thumbnailLabel',
      description: 'Verbiage for product page (previously known as thumbnail label)',
      title: 'Thumbnail Label',
      type: 'string',
    }),
    defineField({
      name: 'biography',
      title: 'Biography',
      type: 'blockContent',
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'blockContent',
    }),
    defineField({
      name: 'fellowshipHonorsAwards',
      title: 'Fellowship, Honors & Awards',
      type: 'blockContent',
    }),
    defineField({
      name: 'selectedPublicationsClients',
      title: 'Selected Publications & Clients',
      type: 'blockContent',
    }),
    defineField({
      name: 'selectedPress',
      title: 'Selected Press',
      type: 'blockContent',
    }),
    defineField({
      name: 'exhibitions',
      title: 'Exhibitions',
      type: 'blockContent',
    }),
    // create object mobilesettings that has fields (contact string with url, manager rich text, prints/inquiries string, social media rich text)
    defineField({
      name: 'mobileSettings',
      title: 'Mobile Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'contactLink',
          title: 'Contact Link',
          type: 'blockContent',
        }),
        defineField({
          name: 'manager',
          title: 'Manager',
          type: 'blockContent',
        }),
        defineField({
          name: 'printsInquiries',
          title: 'Prints/Inquiries',
          type: 'blockContent',
        }),
        defineField({
          name: 'socialMedia',
          title: 'Social Media',
          type: 'blockContent',
        }),
      ],
      // drop down
      options: {
        collapsible: true,
        collapsed: true,
      },
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
