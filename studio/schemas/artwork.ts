import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'artist',
      title: 'Artwork Creator',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      to: [{type: 'artist'}],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      validation: (Rule) => Rule.required(),
      type: 'blockContent',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      validation: (Rule) => Rule.required(),
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'content.0.asset',
    },
    prepare({title, media}: {title: string; media: any}) {
      return {
        title: title || 'Untitled Artwork',
        media,
      }
    },
  },
})
