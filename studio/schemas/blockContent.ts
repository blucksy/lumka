import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',

      styles: [],
      lists: [],
      marks: {
        decorators: [{title: 'Italics', value: 'em'}],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [],
      },
    }),
  ],
})
