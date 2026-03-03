import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Configuration for the Sanity client
export const sanityClient = createClient({
    projectId: 'zompitpf', // Replace with your actual project ID if different
    dataset: 'production',
    useCdn: true, // `false` if you want to ensure fresh data every request, `true` for faster, cached responses
    apiVersion: '2024-03-03', // Use current date for stable API versioning
})

// Quick helper to generate image URLs from Sanity's image reference objects
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
    return builder.image(source)
}
