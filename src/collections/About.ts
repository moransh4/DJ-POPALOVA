import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const About: CollectionConfig = {
    slug: 'about',
    admin: {
    },
    fields: [
        {
          name: 'content',
          type: 'richText',
          // Pass the Lexical editor here and override base settings as necessary
          editor: lexicalEditor({}),
        },
    ],
}