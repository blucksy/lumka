import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'press',
  title: 'Press',
  type: 'document',
  icon: () => '📰',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'blockContent',
      description:
        "IMPORTANT: Italicize the title of works and exhibitions. Don't use quotation marks",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publication',
      title: 'Publication',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link to article',
      type: 'url',
    }),
    defineField({
      name: 'pdf',
      title: 'PDF of article',
      type: 'file',
    }),
    defineField({
      name: 'pressPage',
      title: 'Show in "Press" page?',
      type: 'boolean',
      description: 'Uncheck to hide this item from the "Press" page.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publication',
    },
  },
})
