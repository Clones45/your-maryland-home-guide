import { Link } from 'react-router-dom';
import { urlFor } from '../lib/sanityClient';

export interface Property {
    _id: string;
    title: string;
    slug: { current: string };
    price: number;
    bedrooms: number;
    bathrooms: number;
    squareFootage: number;
    address: string;
    status: string;
    mainImage: any;
}

export function PropertyCard({ property }: { property: Property }) {
    const imageUrl = property.mainImage ? urlFor(property.mainImage).width(800).url() : '/placeholder-property.jpg';

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200">
            <Link to={`/properties/${property.slug.current}`} className="block relative aspect-[4/3] overflow-hidden">
                <img
                    src={imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-neutral-900 border border-white/20">
                    {property.status === 'for-sale' ? 'For Sale' : property.status}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-lg text-white font-bold tracking-tight">
                    ${property.price?.toLocaleString()}
                </div>
            </Link>

            <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-2 font-outfit line-clamp-1 group-hover:text-primary transition-colors">
                    {property.title}
                </h3>
                <p className="text-neutral-500 mb-4 line-clamp-1">{property.address}</p>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <div className="flex gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Beds</span>
                            <span className="font-semibold text-neutral-900">{property.bedrooms || '-'}</span>
                        </div>
                        <div className="w-px h-8 bg-neutral-200" />
                        <div className="flex flex-col">
                            <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Baths</span>
                            <span className="font-semibold text-neutral-900">{property.bathrooms || '-'}</span>
                        </div>
                        <div className="w-px h-8 bg-neutral-200" />
                        <div className="flex flex-col">
                            <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Sq Ft</span>
                            <span className="font-semibold text-neutral-900">{property.squareFootage?.toLocaleString() || '-'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
