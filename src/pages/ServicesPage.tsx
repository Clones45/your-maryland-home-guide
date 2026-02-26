import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const ServicesPage = () => {
    return (
        <div className="min-h-screen">
            <SEO
                title="Real Estate Services | Howard County & Central Maryland Realtor"
                description="Explore Gayane Gevorgyan's real estate services across Howard County and Central Maryland — buyer representation, seller marketing, relocation assistance, and more. Serving Columbia, Ellicott City, Laurel, Bowie, Catonsville, and surrounding areas."
                canonicalUrl="/services"
                keywords="Maryland real estate services, Howard County buyer agent, Howard County seller agent, Columbia MD real estate, buy home Howard County Maryland, sell home Central Maryland, relocation realtor Maryland, Bowie MD homes for sale, Catonsville real estate"
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
