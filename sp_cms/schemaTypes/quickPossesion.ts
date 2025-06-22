import {defineField, defineType} from 'sanity'

export const quickPossession = defineType({
  name: 'quickPossession',
  title: 'Quick Possession',
  type: 'document',
  fields: [
    defineField({
      name: 'houseModel',
      title: 'House Model',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .min(4)
          .max(100)
          .error('House model is required and must be between 4 and 100 characters.'),
      description: 'The name of the house model.',
    }),
    defineField({
      name: 'houseType',
      title: 'House Type',
      type: 'string',
      description: 'Select the type of the house (e.g., Front-Drive Home, Landed Home).',
      validation: (Rule) =>
        Rule.required(),
      options: {
        list: [
          { title: 'Front-Drive Home', value: 'front-drive' },
          { title: 'Landed Home', value: 'landed' },
          { title: 'Townhome', value: 'townhome' },
          { title: 'Duplex', value: 'duplex' },
        ],
        layout: 'dropdown', 
      },
    }),    
    defineField({
      name: 'city',
      title: 'City',
      type: 'reference',
      to: [{type: 'city'}],
      description: 'The city where the property is located.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'community',
      title: 'Community',
      type: 'reference',
      to: [{type: 'community'}],
      description: 'The community where the property is located.',
      validation: (Rule) => Rule.required(),
      options: {
        filter: ({document}) => {
          const doc = document as {city?: {_ref?: string}}
          return {
            filter: 'city._ref == $cityRef',
            params: {cityRef: doc?.city?._ref},
          }
        },
      },
    }),
    defineField({
      name: 'sqft',
      title: 'Sqft',
      type: 'number',
      validation: (Rule) =>
        Rule.required()
          .min(100)
          .max(10000)
          .error('Square footage must be between 100 and 10,000 sqft.'),
      description: 'The total square footage of the property.',
    }),
    defineField({
      name: 'beds',
      title: 'Beds',
      type: 'number',
      validation: (Rule) =>
        Rule.required().min(1).max(10).error('Number of beds must be between 1 and 10.'),
      description: 'The number of bedrooms in the property.',
    }),
    defineField({
      name: 'baths',
      title: 'Baths',
      type: 'number',
      validation: (Rule) =>
        Rule.required().min(1).max(10).error('Number of baths must be between 1 and 10.'),
      description: 'The number of bathrooms in the property.',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Featured image of the property.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Ready', value: 'ready'},
          {title: 'Pending', value: 'pending'},
          {title: 'Sold', value: 'sold'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
      description: 'The current status of the property.',
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          {title: '30 Days', value: '30'},
          {title: '60 Days', value: '60'},
          {title: '90 Days', value: '90'},
        ],
        layout: 'dropdown',
      },
      hidden: ({parent}) => parent?.status !== 'ready',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = (context as {parent?: {status?: string}}).parent
          if (parent?.status === 'ready' && !value) {
            return 'Availability is required when status is Ready.'
          }
          return true
        }),
      description: "Only visible when status is 'Ready'.",
    }),

    defineField({
      name: 'oldPrice',
      title: 'Old Price',
      type: 'number',
    }),
    defineField({
      name: 'newPrice',
      title: 'New Price',
      type: 'number',
      validation: (Rule) =>
        Rule.required().min(0).error('New price is required and must be a positive number.'),
      description: 'The new price of the property.',
    }),
    defineField({
      name: 'houseGallery',
      title: 'House Gallery',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        layout: 'grid',
      },
      validation: (Rule) =>
        Rule.required().min(1).max(20).error('Gallery must have between 1 and 20 images.'),
      description:
        'List of images for the house gallery. You can drag and drop multiple images at once.',
    }),
    defineField({
      name: 'creativeTitle',
      title: 'Creative Title',
      type: 'string',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      validation: (Rule) =>
        Rule.required()
          .max(200)
          .error('Short description is required and must be 200 characters or less.'),
      description: 'A brief description of the property, up to 200 characters.',
    }),
    defineField({
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(10)
          .error('At least one key feature is required, with a maximum of 10.'),
      description: 'List of sentences that describe the key features of the property.',
    }),
    defineField({
      name: 'floorPlans',
      title: 'Floor Plans',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'floor',
              title: 'Floor',
              type: 'string',
              options: {
                list: [
                  {title: 'Main Floor', value: 'main'},
                  {title: 'Second Floor', value: 'second'},
                  {title: 'Third Floor', value: 'third'},
                ],
                layout: 'dropdown',
              },
              description: 'Select the floor (Main, Second, or Third).',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Images for this floor plan.',
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .error('You must provide images for at least two floor, up to three floors.'),
      description: 'Add floor plans for up to 3 floors, each with its own images.',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'houseModel',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required and must be unique.'),
      description: 'A unique identifier for the quick possession, used in URLs.',
    }),
  ],
})
