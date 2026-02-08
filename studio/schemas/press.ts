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
      validation: (Rule) =>
        Rule.custom((file) => {
          if (file && file.asset && file.asset._ref) {
            const ref = file.asset._ref
            const extension = ref.split('.').pop().toLowerCase()
            if (extension !== 'pdf') {
              return 'Only PDF files are allowed.'
            }
          }
          return true
        }),
    }),
    defineField({
      name: 'pressPage',
      title: 'Show in "Press" page?',
      type: 'boolean',
      description: 'Uncheck to hide this item from the "Press" page.',
      initialValue: true,
    }),
  ],
  validation: (Rule) =>
    Rule.custom((doc) => {
      if (!doc.link && !doc.pdf) {
        return 'You must provide either a link or a PDF.'
      }
      return true
    }),
  preview: {
    select: {
      title: 'title',
      subtitle: 'publication',
    },
  },
})
