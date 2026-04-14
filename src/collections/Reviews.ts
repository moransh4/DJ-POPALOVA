import type { CollectionConfig } from 'payload'

  export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'reviewerName', // Fixed typo here
    defaultColumns: ['reviewerName', 'rating', 'date', 'approved'],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true

      return {
        approved: {
          equals: true,
        },
      }
    },
    create: () => true,
  },
  fields: [
    {
      name: 'reviewerName',
      type: 'text',
      required: true,
    },
    {
      name: 'reviewAvatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Reviewer Avatar',
    },
    {
      name: 'reviewText',
      type: 'textarea',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date:
        {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 0,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'reviewerPicture',
      type: 'upload',
      relationTo: 'media', // Assuming you have a 'media' collection for uploads
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  defaultSort: 'approved',
};

