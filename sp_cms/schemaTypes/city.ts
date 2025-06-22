import { defineField, defineType } from "sanity";

export const city = defineType({
  name: 'city',
  title: 'City',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The name of the city.',
      validation: (Rule) => Rule.required().min(4).max(100),
}),
  ],
})

