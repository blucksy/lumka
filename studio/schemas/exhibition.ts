import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'exhibition',
  title: 'Exhibition',
  type: 'document',
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

    orderRankField({type: 'exhibition', newItemPosition: 'after'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
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
      name: 'eventDetails',
      title: 'Event Details',
      type: 'blockContent',
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
    // array of object with Title (blockContent), credits text, and link
    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'blockContent',
            },
            {
              name: 'credits',
              title: 'Credits',
              type: 'string',
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
