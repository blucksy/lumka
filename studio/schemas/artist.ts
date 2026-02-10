import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  icon: () => '🧑‍🎨',
  fields: [
    defineField({
      name: 'title',
      title: 'Artist Name',
      validation: (Rule) => Rule.required(),
      type: 'string',
    }),

    defineField({
      name: 'represented',
      title: 'Represented Artist',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'schooling',
      title: 'School + General Information',
      validation: (Rule) => Rule.required(),
      type: 'blockContent',
    }),
    defineField({
      name: 'year',
      title: 'Birth Year',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
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

    defineField({
      name: 'press',
      title: 'Press',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'press'}],
        },
      ],
    }),
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
})
