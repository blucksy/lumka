import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {colorInput} from '@sanity/color-input'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {muxInput} from 'sanity-plugin-mux-input'

import {schemaTypes} from './schemas'

const projectId = 'gx8jk9ov'
const dataset = 'production'

export default defineConfig({
  name: 'sanity-template-sveltekit-clean',
  title: 'LUmkA',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Minimum required configuration
            orderableDocumentListDeskItem({type: 'tag', S, context}),
            orderableDocumentListDeskItem({type: 'project', S, context}),

            // singleton settings document
            S.listItem().title('Settings').id('settings').child(
              // Instead of rendering a list of documents, we render a single
              // document, specifying the `documentId` manually to ensure
              // that we're editing the single instance of the document
              S.document()
                .schemaType('settings')
                .documentId('a82ec31e-8431-4635-8ca5-d50a80a5297a'),
            ),

            // filter tag and settings from default list
            ...S.documentTypeListItems().filter(
              (listItem) => !['tag', 'settings', 'project'].includes(listItem.getId()),
            ),
          ])
      },
    }),
    presentationTool({
      previewUrl: {
        origin: 'https://amir-hamja-app.vercel.app/',
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
    muxInput(),

    visionTool(),
    colorInput(),
  ],
  schema: {
    types: schemaTypes,
  },
})
