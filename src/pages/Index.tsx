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
    "Licensed Maryland REALTOR® with Lucido Global. Expert in residential real estate across Central Maryland — Ellicott City, Columbia, Laurel, Severn, and Hanover. Fluent in English, Armenian, and Russian.",
  url: "https://gayanesellsmaryland.com",
  telephone: "(443) 922-8458",
  email: "gayanegevorgyan@boblucidoteam.com",
  image: "https://gayanesellsmaryland.com/og-image.jpg",
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
    "Ellicott City, MD",
    "Columbia, MD",
    "Laurel, MD",
    "Severn, MD",
    "Hanover, MD",
    "Linthicum Heights, MD",
    "Howard County, MD",
    "Anne Arundel County, MD",
    "Central Maryland",
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
        title="Gayane Gevorgyan | Maryland Realtor - Lucido Global"
        description="Gayane Gevorgyan is a licensed Maryland REALTOR® with Lucido Global serving Ellicott City, Columbia, Laurel, Severn, and Central Maryland. Fluent in English, Armenian & Russian. Call (443) 922-8458 for a free consultation."
        canonicalUrl="/"
        keywords="Maryland realtor, Ellicott City real estate agent, Columbia MD realtor, Central Maryland homes for sale, buy sell home Maryland, multilingual realtor Maryland, Lucido Global agent, Armenian realtor Maryland"
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
