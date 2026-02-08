import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'exhibition',
  title: 'Exhibition',
  type: 'document',
  icon: () => '🏛️',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
      type: 'string',
    }),
    defineField({
      name: 'exhibitionImage',
      title: 'Exhibition Thumbnail',
      validation: (Rule) => Rule.required(),
      type: 'image',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'For SEO, use the slug from the old website if it exists.',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'artist'}]}],
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'venue',
      title: 'Venue + Address',
      type: 'string',
      description: 'As short as possible',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'extraLinks',
      title: 'Extra links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
            {
              name: 'file',
              title: 'File',
              type: 'file',
            },
          ],
          validation: (Rule) =>
            Rule.custom((fields) =>
              fields.url || fields.file ? true : 'Must have either a URL or a file',
            ),
        },
      ],
    }),
    defineField({
      name: 'writeup',
      title: 'Writeup',
      type: 'blockContent',
      description: 'Works and exhibition titles in italics.',
      validation: (Rule) => Rule.required(),
    }),
    // array of images
    defineField({
      name: 'content',
      title: 'Exhibition images',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'works',
      title: 'Works',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'artwork'}]}],
    }),
    defineField({
      name: 'press',
      title: 'Press',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'press'}]}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'content.0.asset',
    },
    prepare({title, media}: {title: string; media: any}) {
      return {
        title: title || 'Untitled Project',
        media,
      }
    },
  },
})
