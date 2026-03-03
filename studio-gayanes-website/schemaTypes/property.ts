import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'property',
    title: 'Property Listing',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title / Catchphrase',
            type: 'string',
            validation: (rule) => rule.required().max(100),
            description: 'A catchy title for the listing, e.g. "Beautiful Family Home in Towson"',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
            description: 'The URL path for this listing (generated from the title).',
        }),
        defineField({
            name: 'address',
            title: 'Property Address',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Price ($)',
            type: 'number',
            validation: (rule) => rule.required().min(0),
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'For Sale', value: 'for-sale' },
                    { title: 'Pending', value: 'pending' },
                    { title: 'Sold', value: 'sold' },
                    { title: 'Off Market', value: 'off-market' }
                ],
                layout: 'radio',
            },
            initialValue: 'for-sale',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'propertyType',
            title: 'Property Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Single Family', value: 'single-family' },
                    { title: 'Townhouse', value: 'townhouse' },
                    { title: 'Condo/Apartment', value: 'condo' },
                    { title: 'Multi-Family', value: 'multi-family' },
                    { title: 'Land', value: 'land' }
                ],
            },
        }),
        defineField({
            name: 'bedrooms',
            title: 'Bedrooms',
            type: 'number',
            validation: (rule) => rule.min(0),
        }),
        defineField({
            name: 'bathrooms',
            title: 'Bathrooms',
            type: 'number',
            validation: (rule) => rule.min(0),
        }),
        defineField({
            name: 'squareFootage',
            title: 'Square Footage (sqft)',
            type: 'number',
            validation: (rule) => rule.min(0),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'A detailed description of the property features.',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Featured Image',
            type: 'image',
            options: {
                hotspot: true, // Allows user to crop photos inside Sanity
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'gallery',
            title: 'Image Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            description: 'Upload additional photos of the property here.',
        }),
        defineField({
            name: 'features',
            title: 'Key Features / Highlights',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of features e.g., "Hardwood Floors", "Finished Basement", "Pool"',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'price',
            media: 'mainImage',
        },
        prepare(selection) {
            const { title, subtitle, media } = selection
            return {
                title,
                subtitle: subtitle ? `$${subtitle.toLocaleString()}` : 'No price set',
                media,
            }
        },
    },
})
