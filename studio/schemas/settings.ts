import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'about',
      title: 'About',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'announcement',
      title: 'Announcement',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Website Settings',
      }
    },
  },
})
