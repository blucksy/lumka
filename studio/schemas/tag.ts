// create document with tag name
import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    orderRankField({type: 'tag', newItemPosition: 'after'}),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
