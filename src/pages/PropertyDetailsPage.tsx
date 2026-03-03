import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { sanityClient, urlFor } from '../lib/sanityClient';

const PropertyDetailsPage = () => {
    const { slug } = useParams();
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const query = `*[_type == "property" && slug.current == $slug][0]`;
                const data = await sanityClient.fetch(query, { slug });
                setProperty(data);
            } catch (error) {
                console.error("Failed to fetch property details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchProperty();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-50 flex flex-col">
                <Navbar />
                <div className="flex-grow flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-neutral-50 flex flex-col pt-24">
                <Navbar />
                <div className="flex-grow text-center py-32">
                    <h1 className="text-4xl font-heading text-neutral-900 mb-4">Property Not Found</h1>
                    <Link to="/properties" className="text-gold hover:underline">Return to Properties</Link>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col pt-24">
            <Helmet>
                <title>{property.title} | Gayane Gevorgyan</title>
                <meta name="description" content={property.description?.substring(0, 150) || "Property listing details."} />
            </Helmet>

            <Navbar />

            <main className="flex-grow">

                {/* Main Image Header */}
                <section className="relative h-[50vh] min-h-[400px] w-full bg-neutral-900">
                    {property.mainImage && (
                        <img
                            src={urlFor(property.mainImage).width(1920).url()}
                            alt={property.title}
                            className="w-full h-full object-cover opacity-80"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white container mx-auto">
                        <Link to="/properties" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                            <ChevronLeft size={20} />
                            <span className="text-sm uppercase tracking-widest font-medium">Back to Properties</span>
                        </Link>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gold/90 text-white font-bold text-sm tracking-wider uppercase mb-4 shadow-lg backdrop-blur-sm">
                                    {property.status === 'for-sale' ? 'For Sale' : property.status}
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-4 drop-shadow-md">{property.title}</h1>
                                <p className="text-xl md:text-2xl text-white/90 font-light flex items-center gap-2">
                                    {property.address}
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl min-w-[200px]">
                                <div className="text-sm text-white/70 uppercase tracking-widest mb-1">Asking Price</div>
                                <div className="text-4xl font-bold tracking-tight">${property.price?.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                            {/* Main Content (Left, spans 2 cols) */}
                            <div className="lg:col-span-2 space-y-12">
                                {/* Key Stats Bar */}
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 flex flex-wrap gap-8 md:gap-16 justify-between md:justify-start">
                                    <div className="flex flex-col">
                                        <span className="text-neutral-400 text-sm uppercase tracking-widest font-semibold mb-1">Bedrooms</span>
                                        <span className="text-4xl font-heading text-neutral-900">{property.bedrooms || '-'}</span>
                                    </div>
                                    <div className="hidden md:block w-px bg-neutral-200"></div>
                                    <div className="flex flex-col">
                                        <span className="text-neutral-400 text-sm uppercase tracking-widest font-semibold mb-1">Bathrooms</span>
                                        <span className="text-4xl font-heading text-neutral-900">{property.bathrooms || '-'}</span>
                                    </div>
                                    <div className="hidden md:block w-px bg-neutral-200"></div>
                                    <div className="flex flex-col">
                                        <span className="text-neutral-400 text-sm uppercase tracking-widest font-semibold mb-1">Square Feet</span>
                                        <span className="text-4xl font-heading text-neutral-900">{property.squareFootage?.toLocaleString() || '-'}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h2 className="text-2xl font-heading text-neutral-900 mb-6 border-b border-neutral-200 pb-4">About this Property</h2>
                                    <div className="prose prose-lg text-neutral-600 font-light leading-relaxed whitespace-pre-line">
                                        {property.description || "No description provided."}
                                    </div>
                                </div>

                                {/* Features */}
                                {property.features && property.features.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-heading text-neutral-900 mb-6 border-b border-neutral-200 pb-4">Features & Highlights</h2>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {property.features.map((feature: string, idx: number) => (
                                                <li key={idx} className="flex items-center gap-3 text-neutral-700">
                                                    <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-0.5"></div>
                                                    <span className="font-medium text-lg">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Gallery */}
                                {property.gallery && property.gallery.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-heading text-neutral-900 mb-6 border-b border-neutral-200 pb-4">Photo Gallery</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {property.gallery.map((img: any, idx: number) => (
                                                <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 shadow-sm border border-neutral-200">
                                                    <img
                                                        src={urlFor(img).width(800).url()}
                                                        alt={`Gallery image ${idx + 1}`}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar (Right, spans 1 col) */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-28 bg-white rounded-2xl p-8 shadow-xl border border-neutral-100">
                                    <h3 className="text-2xl font-heading text-charcoal mb-4">Interested in this property?</h3>
                                    <p className="text-neutral-600 mb-8 font-light">
                                        Contact Gayane today to schedule a private showing or ask questions about this listing.
                                    </p>

                                    <a href="tel:+14439228458" className="w-full block text-center bg-charcoal hover:bg-neutral-800 text-white font-bold py-4 px-6 rounded-xl transition-all mb-4 uppercase tracking-widest text-sm shadow-md">
                                        Call (443) 922-8458
                                    </a>

                                    <Link to="/contact" className="w-full block text-center bg-white border-2 border-charcoal hover:bg-neutral-50 text-charcoal font-bold py-3.5 px-6 rounded-xl transition-all uppercase tracking-widest text-sm">
                                        Message Me
                                    </Link>

                                    <div className="mt-8 pt-8 border-t border-neutral-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-neutral-200 overflow-hidden shrink-0 border border-neutral-300">
                                                <img src="/GayaneG.jpg" alt="Gayane Gevorgyan" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-heading text-xl text-charcoal">Gayane Gevorgyan</div>
                                                <div className="text-gold text-xs uppercase tracking-widest font-bold">Realtor®</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
};

export default PropertyDetailsPage;
