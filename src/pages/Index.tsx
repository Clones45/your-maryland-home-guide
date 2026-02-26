import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCTA from "@/components/FeaturedCTA";
import Stats from "@/components/Stats";
import WhyGayane from "@/components/WhyGayane";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const schemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Gayane Gevorgyan",
  description:
    "Licensed Maryland REALTOR® with Lucido Global. Serving Howard County and the surrounding Central Maryland region — Columbia, Ellicott City, Laurel, Bowie, Catonsville, Severn, Hanover, Clarksville, Towson, and beyond. Fluent in English, Armenian, and Russian.",
  url: "https://gayanegevorgyanrealtor.com",
  telephone: "(443) 922-8458",
  email: "gayanegevorgyan@boblucidoteam.com",
  image: "https://gayanegevorgyanrealtor.com/og-image.jpg",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ellicott City",
    addressRegion: "MD",
    postalCode: "21042",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "39.2693",
    longitude: "-76.7981",
  },
  areaServed: [
    "Howard County, MD",
    "Columbia, MD",
    "Ellicott City, MD",
    "Laurel, MD",
    "Bowie, MD",
    "Catonsville, MD",
    "Severn, MD",
    "Hanover, MD",
    "Clarksville, MD",
    "Gaithersburg, MD",
    "Rockville, MD",
    "Silver Spring, MD",
    "Bethesda, MD",
    "Towson, MD",
    "College Park, MD",
    "Hyattsville, MD",
    "Nottingham, MD",
    "Baltimore, MD",
  ],
  knowsLanguage: ["English", "Armenian", "Russian"],
  memberOf: {
    "@type": "Organization",
    name: "National Association of Realtors",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "47",
  },
});

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Gayane Gevorgyan | Maryland Realtor Serving Howard County & Central Maryland"
        description="Gayane Gevorgyan is a licensed Maryland Realtor with Lucido Global, serving Howard County and surrounding areas — Columbia, Ellicott City, Laurel, Bowie, Catonsville, and more. Fluent in English, Armenian & Russian. Call (443) 922-8458."
        canonicalUrl="/"
        keywords="Maryland Realtor, Gayane Gevorgyan, Howard County real estate agent, Howard County MD Realtor, Columbia MD Realtor, Central Maryland homes for sale, buy sell home Maryland, multilingual Realtor Maryland, Lucido Global agent, Armenian Realtor Maryland, Gayane Gevorgyan Realtor, Bowie MD realtor, Catonsville realtor"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <Navbar />
      <Hero />
      <FeaturedCTA />
      <Stats />
      <WhyGayane />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
