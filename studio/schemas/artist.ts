import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Artist Name',
      validation: (Rule) => Rule.required(),
      type: 'string',
    }),
    defineField({
      name: 'schooling',
      title: 'School Information',
      validation: (Rule) => Rule.required(),
      type: 'text',
    }),
    // links (array of url and title)
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Link Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'longBio',
      title: 'Long Biography',
      description: 'Biography to be displayed on artist page',
      type: 'blockContent',
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Biography',
      description: 'Biography to be displayed on other pages',
      type: 'blockContent',
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
