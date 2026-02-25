import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: () => '🏠',
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
              type: 'reference',
              to: [{type: 'exhibition'}, {type: 'artist'}],
              options: {
                disableNew: true,
              },
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
        title: 'Homepage',
      }
    },
  },
})
