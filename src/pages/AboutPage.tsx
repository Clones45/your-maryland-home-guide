import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const AboutPage = () => {
    return (
        <div className="min-h-screen">
            <SEO
                title="About Gayane Gevorgyan | Maryland Realtor in Howard County & Central MD"
                description="Meet Gayane Gevorgyan — a licensed Maryland REALTOR® with Lucido Global serving Howard County, Columbia, Ellicott City, Laurel, Bowie, Catonsville, and the greater Central Maryland region. Fluent in English, Armenian, and Russian."
                canonicalUrl="/about"
                keywords="about Gayane Gevorgyan, Howard County Maryland realtor, Maryland realtor biography, multilingual real estate agent Maryland, Armenian realtor, Lucido Global Maryland agent, Columbia MD realtor, Catonsville realtor"
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
