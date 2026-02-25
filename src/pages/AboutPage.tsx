import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const AboutPage = () => {
    return (
        <div className="min-h-screen">
            <SEO
                title="About Gayane Gevorgyan | Maryland Realtor"
                description="Meet Gayane Gevorgyan — a licensed Maryland REALTOR® with Lucido Global based in Ellicott City. Fluent in English, Armenian, and Russian. Serving Central Maryland with empathy, strategy, and heart-led expertise."
                canonicalUrl="/about"
                keywords="about Gayane Gevorgyan, Maryland realtor biography, multilingual real estate agent Maryland, Armenian realtor Ellicott City, Lucido Global Maryland agent"
            />
            <Navbar />
            <div className="pt-24">
                <About />
            </div>
            <Footer />
        </div>
    );
};

export default AboutPage;
