import {defineField, defineType} from 'sanity'

export const imageGallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            },
            {
              name: 'altText',
              title: 'Alternative Text',
              type: 'string',
              description: 'The alternative text for the image.',
              validation: (Rule) => Rule.required().min(4).max(100),
            },
          ],
          preview: {
            select: {
              title: 'altText',
              media: 'image',
            },
            prepare(selection) {
              return {
                title: selection.title,
                media: selection.media,
              }
            }
          },
        },
      ],
      options: {
        layout: 'grid'
      }
    }),
  ],
  preview: {
    select: {
      images: 'images'
    },
    prepare(selection) {
      const images = selection.images || []
      return {
        title: `Gallery (${images.length} image${images.length === 1 ? '' : 's'})`,
        subtitle: images.map((img: any) => img.altText).filter(Boolean).join(', '),
        media: images[0]?.image
      }
    }
  }
})
