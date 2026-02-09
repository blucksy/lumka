import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  icon: () => '🖼️',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      validation: (Rule) => Rule.required(),
      type: 'image',
    }),
    defineField({
      name: 'artist',
      title: 'Artwork Creator',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      to: [{type: 'artist'}],
    }),
    defineField({
      name: 'title',
      title: 'Artwork Title',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Artwork Year',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Include dimensions in a new line.',
      validation: (Rule) => Rule.required(),
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image.asset',
    },
    prepare({title, media}: {title: string; media: any}) {
      return {
        title: title || 'Untitled Artwork',
        media,
      }
    },
  },
})
