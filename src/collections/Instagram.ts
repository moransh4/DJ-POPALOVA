import type { CollectionConfig } from 'payload'

export const Instagram: CollectionConfig = {
  slug: 'instagram',
  admin: {
    useAsTitle: 'link',
    defaultColumns: ['link', 'sortOrder', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  defaultSort: 'sortOrder',
  fields: [
    {
      name: 'link',
      label: 'Instagram Link',
      type: 'text',
      required: true,
      validate: (value: string | null | undefined) => {
        if (!value) {
          return 'Instagram link is required'
        }

        try {
          const url = new URL(value)
          const hostname = url.hostname.replace(/^www\./, '')

          if (hostname !== 'instagram.com') {
            return 'Enter a valid instagram.com link'
          }

          return true
        } catch {
          return 'Enter a valid Instagram URL'
        }
      },
    },
    {
      name: 'sortOrder',
      label: 'Sort Order',
      type: 'number',
      defaultValue: 0,
      admin: {
        step: 1,
      },
    },
  ],
}