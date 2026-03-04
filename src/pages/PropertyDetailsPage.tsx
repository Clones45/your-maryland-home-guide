import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, X, ChevronRight, Images } from 'lucide-react';
import gayanePhoto from '../assets/about1.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { sanityClient, urlFor } from '../lib/sanityClient';

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({
    images,
    startIndex,
    onClose,
}: {
    images: any[];
    startIndex: number;
    onClose: () => void;
}) {
    const [current, setCurrent] = useState(startIndex);

    const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);
    const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        document.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [onClose, prev, next]);

    return (
        <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 shrink-0">
                <span className="text-white/60 text-sm font-medium tracking-widest uppercase">
                    {current + 1} / {images.length}
                </span>
                <button
                    onClick={onClose}
                    className="text-white/70 hover:text-white transition-colors rounded-full p-2 hover:bg-white/10"
                    aria-label="Close gallery"
                >
                    <X size={28} />
                </button>
            </div>

            {/* Main image */}
            <div className="flex-grow flex items-center justify-center relative px-16 min-h-0">
                <button
                    onClick={prev}
                    className="absolute left-4 text-white/70 hover:text-white transition-colors rounded-full p-3 hover:bg-white/10 z-10"
                    aria-label="Previous photo"
                >
                    <ChevronLeft size={32} />
                </button>

                <img
                    key={current}
                    src={urlFor(images[current]).width(1600).url()}
                    alt={`Photo ${current + 1}`}
                    className="max-h-full max-w-full object-contain rounded-xl shadow-2xl animate-fade-in"
                />

                <button
                    onClick={next}
                    className="absolute right-4 text-white/70 hover:text-white transition-colors rounded-full p-3 hover:bg-white/10 z-10"
                    aria-label="Next photo"
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Thumbnail strip */}
            <div className="shrink-0 px-6 py-4 overflow-x-auto">
                <div className="flex gap-3 w-max mx-auto">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${idx === current ? 'border-gold scale-105' : 'border-transparent opacity-50 hover:opacity-80'
                                }`}
                        >
                            <img
                                src={urlFor(img).width(200).url()}
                                alt={`Thumbnail ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Hero Photo Grid (Zillow-style) ──────────────────────────────────────────
function HeroPhotoGrid({
    mainImage,
    gallery,
    onOpenLightbox,
}: {
    mainImage: any;
    gallery: any[];
    onOpenLightbox: (index: number) => void;
}) {
    // Combine main image + gallery into one array for lightbox indexing
    const allImages = [mainImage, ...(gallery || [])].filter(Boolean);
    const totalCount = allImages.length;

    // Show up to 5 preview slots (1 large + 4 small)
    const previewImages = allImages.slice(0, 5);

    return (
        <div className="relative w-full h-[55vh] min-h-[420px] grid grid-cols-4 grid-rows-2 gap-1.5 overflow-hidden rounded-none md:rounded-2xl">
            {/* Large main photo */}
            <div
                className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group"
                onClick={() => onOpenLightbox(0)}
            >
                {mainImage && (
                    <img
                        src={urlFor(mainImage).width(1200).url()}
                        alt="Main property photo"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                )}
            </div>

            {/* 4 smaller photos */}
            {[1, 2, 3, 4].map((slot) => {
                const img = previewImages[slot];
                const isLastSlot = slot === 4;
                const remainingCount = totalCount - 5;

                return (
                    <div
                        key={slot}
                        className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer group bg-neutral-800"
                        onClick={() => onOpenLightbox(slot < totalCount ? slot : 0)}
                    >
                        {img ? (
                            <img
                                src={urlFor(img).width(600).url()}
                                alt={`Property photo ${slot + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-neutral-700" />
                        )}

                        {/* "See all photos" overlay on the last slot */}
                        {isLastSlot && totalCount > 5 && (
                            <div
                                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 group-hover:bg-black/70 transition-colors"
                            >
                                <Images size={28} className="text-white" />
                                <span className="text-white font-bold text-lg leading-tight">See all</span>
                                <span className="text-white font-bold text-lg leading-tight">{totalCount} photos</span>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* "See all photos" pill button (bottom right, always visible) */}
            {totalCount > 1 && (
                <button
                    onClick={() => onOpenLightbox(0)}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-neutral-900 font-bold text-sm px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 transition-all hover:shadow-xl z-10"
                >
                    <Images size={16} />
                    See all {totalCount} photos
                </button>
            )}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const PropertyDetailsPage = () => {
    const { slug } = useParams();
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxStart, setLightboxStart] = useState(0);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const query = `*[_type == "property" && slug.current == $slug][0]`;
                const data = await sanityClient.fetch(query, { slug });
                setProperty(data);
            } catch (error) {
                console.error('Failed to fetch property details:', error);
            } finally {
                setLoading(false);
            }
        };
        if (slug) fetchProperty();
    }, [slug]);

    const allImages = property ? [property.mainImage, ...(property.gallery || [])].filter(Boolean) : [];

    const openLightbox = (index: number) => {
        setLightboxStart(index);
        setLightboxOpen(true);
    };

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
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col pt-24">
            <Helmet>
                <title>{property.title} | Gayane Gevorgyan</title>
                <meta name="description" content={property.description?.substring(0, 150) || 'Property listing details.'} />
            </Helmet>

            <Navbar />

            {/* Lightbox */}
            {lightboxOpen && allImages.length > 0 && (
                <Lightbox images={allImages} startIndex={lightboxStart} onClose={() => setLightboxOpen(false)} />
            )}

            <main className="flex-grow">

                {/* Back link */}
                <div className="container mx-auto px-6 pt-6 pb-3 max-w-7xl">
                    <Link to="/properties" className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors">
                        <ChevronLeft size={18} />
                        <span className="text-sm uppercase tracking-widest font-medium">Back to Properties</span>
                    </Link>
                </div>

                {/* Title + Price */}
                <div className="container mx-auto px-6 pb-5 max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gold/10 text-gold font-bold text-xs tracking-wider uppercase mb-3 border border-gold/20">
                                {property.status === 'for-sale' ? 'For Sale' : property.status}
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-neutral-900 mb-2">{property.title}</h1>
                            <p className="text-neutral-500 text-lg">{property.address}</p>
                        </div>
                        <div className="shrink-0 text-right">
                            <div className="text-sm text-neutral-400 uppercase tracking-widest mb-1">Asking Price</div>
                            <div className="text-4xl md:text-5xl font-heading text-neutral-900 font-bold">${property.price?.toLocaleString()}</div>
                        </div>
                    </div>
                </div>

                {/* Zillow-style Hero Photo Grid */}
                <div className="container mx-auto px-0 md:px-6 pb-10 max-w-7xl">
                    <HeroPhotoGrid
                        mainImage={property.mainImage}
                        gallery={property.gallery || []}
                        onOpenLightbox={openLightbox}
                    />
                </div>

                {/* Content */}
                <section className="pb-20">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-12">

                                {/* Key Stats */}
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
                                        {property.description || 'No description provided.'}
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
                            </div>

                            {/* Sidebar */}
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
                                                <img src={gayanePhoto} alt="Gayane Gevorgyan" className="w-full h-full object-cover object-top" />
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
