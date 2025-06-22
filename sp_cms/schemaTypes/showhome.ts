import { defineField, defineType } from "sanity";
export const showHome = defineType({
  name: 'showHome',
  title: 'Show Home',
  type: 'document',
  fields: [
    defineField({
      name: 'houseModel',
      title: 'House Model',
      type: 'string',
      description: 'The Name of The House Model.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'houseType',
      title: 'House Type',
      type: 'string',
      description: 'Select the type of the house (e.g., Front-Drive Home, Landed Home).',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Front-Drive Home', value: 'front-drive'},
          {title: 'Landed Home', value: 'landed'},
          {title: 'Townhome', value: 'townhome'},
          {title: 'Duplex', value: 'duplex'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'streetAddress',
      title: 'Street Address',
      type: 'string',
      description: 'The street address of the home.',
      validation: (Rule) => Rule.required().min(5).max(200),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'reference',
      to: [{type: 'city'}],
      description: 'The city where the show home is located.',
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
      name: 'province',
      title: 'Province',
      type: 'string',
      description: 'The province or state where the home is located.',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'propertySize',
      title: 'Property Size',
      type: 'number',
      description: 'The size of the property in square feet.',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'numOfBeds',
      title: 'Number of Beds',
      type: 'number',
      description: 'The number of bedrooms in the house.',
      validation: (Rule) => Rule.required().min(1).max(20),
    }),
    defineField({
      name: 'numOfBaths',
      title: 'Number of Baths',
      type: 'number',
      description: 'The number of bathrooms in the house.',
      validation: (Rule) => Rule.required().min(1).max(20),
    }),
    defineField({
      name: 'videoTour',
      title: 'Video Tour',
      type: 'text',
      description: 'Paste the YouTube embed code here.',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Featured image of the house.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'A unique identifier for the show home, used in URLs. It is auto-generated from the name.',
      options: {
        source: 'houseModel',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})