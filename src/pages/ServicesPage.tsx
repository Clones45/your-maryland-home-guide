import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const ServicesPage = () => {
    return (
        <div className="min-h-screen">
            <SEO
                title="Real Estate Services | Buyers & Sellers in Maryland"
                description="Explore Gayane Gevorgyan's real estate services in Central Maryland — buyer representation, seller marketing, relocation assistance, and expired listing rescue. Serving Ellicott City, Columbia, Laurel, and beyond."
                canonicalUrl="/services"
                keywords="Maryland real estate services, buyer agent Maryland, seller agent Ellicott City, home buying services Maryland, home selling services Howard County, relocation realtor Maryland"
            />
            <Navbar />
            <div className="pt-24">
                <Services />
            </div>
            <Footer />
        </div>
    );
};

export default ServicesPage;
