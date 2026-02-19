import {colorInput} from '@sanity/color-input'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
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
            S.listItem()
              .title('Homepage')
              .id('homepage')
              .child(S.document().schemaType('homepage').documentId('homepage'))
              .icon(() => '🏠'),

            S.documentTypeListItem('exhibition').title('Exhibitions'),
            S.documentTypeListItem('artist').title('Artists'),
            S.documentTypeListItem('artwork').title('Artworks'),
            S.documentTypeListItem('press').title('Press'),
            S.documentTypeListItem('legal').title('Legal'),

            S.listItem()
              .title('Settings')
              .id('settings')
              .child(S.document().schemaType('settings').documentId('siteSettings'))
              .icon(() => '⚙️'),
          ])
      },
    }),
    presentationTool({
      previewUrl: {
        origin: 'https://lumka-app.vercel.app',
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
    visionTool(),
    colorInput(),
  ],
  schema: {
    types: schemaTypes,
  },
})
