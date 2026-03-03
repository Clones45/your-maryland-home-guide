import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PropertyCard, Property } from '../components/PropertyCard';
import { sanityClient } from '../lib/sanityClient';

const PropertiesPage = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const query = '*[_type == "property"] | order(price desc)';
                const data = await sanityClient.fetch(query);
                setProperties(data);
            } catch (error) {
                console.error("Failed to fetch properties from Sanity:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col pt-24">
            <Helmet>
                <title>Featured Properties | Gayane Gevorgyan Realtor</title>
                <meta name="description" content="View our featured real estate listings and communities in Maryland." />
            </Helmet>

            <Navbar />

            <main className="flex-grow flex flex-col">
                <section className="py-20 bg-charcoal text-white relative flex-shrink-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                    <div className="container mx-auto px-6 relative z-10">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-6 text-center">
                            Featured <span className="text-gold italic">Properties</span>
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto text-center font-body font-light">
                            Explore our curated selection of beautiful homes across Maryland.
                        </p>
                    </div>
                </section>

                <section className="py-20 flex-grow relative">
                    <div className="container mx-auto px-6 max-w-7xl">
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
                            </div>
                        ) : properties.length === 0 ? (
                            <div className="text-center py-20">
                                <h3 className="text-2xl font-heading text-neutral-900 mb-4">No properties listed yet.</h3>
                                <p className="text-neutral-500">Check back soon for new real estate listings!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {properties.map((property) => (
                                    <PropertyCard key={property._id} property={property} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default PropertiesPage;
