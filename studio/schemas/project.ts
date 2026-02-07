import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
      type: 'string',
    }),
    orderRankField({type: 'project', newItemPosition: 'after'}),

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
      name: 'content',
      title: 'Content',
      validation: (Rule) => Rule.required(),
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description:
                'Important for SEO and accessibility. Guidelines: https://accessibility.huit.harvard.edu/describe-content-images',
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
        {
          type: 'mux.video',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'color',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Outbound Link',
      type: 'url',
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
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
