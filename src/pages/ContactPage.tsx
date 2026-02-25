import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const ContactPage = () => {
    return (
        <div className="min-h-screen">
            <SEO
                title="Contact Gayane Gevorgyan | Maryland Real Estate"
                description="Contact Maryland Realtor Gayane Gevorgyan for a free consultation. Call (443) 922-8458 or email to buy, sell, or rent a home in Ellicott City, Columbia, Laurel, or anywhere in Central Maryland."
                canonicalUrl="/contact"
                keywords="contact Maryland realtor, free consultation real estate Maryland, Gayane Gevorgyan phone number, book realtor appointment Maryland, real estate agent Ellicott City contact"
            />
            <Navbar />
            <div className="pt-24">
                <Contact />
            </div>
            <Footer />
        </div>
    );
};

export default ContactPage;
