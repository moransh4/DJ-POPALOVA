import type { CollectionConfig } from 'payload'

export const WorkWith: CollectionConfig = {
  slug: 'work-with',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'image' , 'sort'], // Explicitly include 'sort' in defaultColumns
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'sort', // Add a sort field
      type: 'number',
      admin: {
        hidden: false, // Make it visible for debugging
      },
    },
  ],
  defaultSort: 'sort',
};
