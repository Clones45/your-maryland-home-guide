import Navbar from "@/components/Navbar";
import Communities from "@/components/Communities";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const CommunitiesPage = () => {
    return (
        <div className="min-h-screen">
            <SEO
                title="Maryland Communities | Ellicott City, Columbia & More"
                description="Discover the best communities in Central Maryland with Gayane Gevorgyan. Explore Ellicott City, Columbia, Laurel, Severn, Hanover, and Linthicum Heights — neighborhoods, schools, and lifestyle guide."
                canonicalUrl="/communities"
                keywords="Ellicott City neighborhoods, Columbia MD real estate, Laurel MD homes, Severn MD houses for sale, Hanover MD real estate, Central Maryland communities, Howard County neighborhoods, Anne Arundel County homes"
            />
            <Navbar />
            <div className="pt-24">
                <Communities />
            </div>
            <Footer />
        </div>
    );
};

export default CommunitiesPage;
