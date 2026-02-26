import Navbar from "@/components/Navbar";
import Communities from "@/components/Communities";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const CommunitiesPage = () => {
    return (
        <div className="min-h-screen">
            <SEO
                title="Communities | Howard County & Central Maryland Real Estate"
                description="Discover communities across Howard County and Central Maryland with Gayane Gevorgyan. Explore Columbia, Ellicott City, Clarksville, Bowie, Catonsville, Towson, Laurel, Severn, Hanover, and more — neighborhoods, schools, and lifestyle guides."
                canonicalUrl="/communities"
                keywords="Howard County neighborhoods, Columbia MD real estate, Ellicott City homes for sale, Bowie MD realtor, Catonsville MD homes, Clarksville MD real estate, Towson real estate, Laurel MD homes, Severn MD houses, Central Maryland communities, Gaithersburg realtor, Rockville MD homes, Silver Spring MD real estate"
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
