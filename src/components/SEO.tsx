import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    description: string;
    canonicalUrl?: string;
    ogType?: string;
    ogImage?: string;
    schemaType?: string;
    keywords?: string;
}

const SITE_NAME = "Gayane Gevorgyan | Maryland Realtor";
const BASE_URL = "https://gayanesellsmaryland.com";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

const SEO = ({
    title,
    description,
    canonicalUrl,
    ogType = "website",
    ogImage = DEFAULT_IMAGE,
    keywords,
}: SEOProps) => {
    const fullTitle = title === SITE_NAME ? title : `${title} | Gayane Gevorgyan`;
    const canonical = canonicalUrl ? `${BASE_URL}${canonicalUrl}` : BASE_URL;

    return (
        <Helmet>
            {/* Primary */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={canonical} />
            <meta name="robots" content="index, follow" />
            <meta name="author" content="Gayane Gevorgyan" />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content="Gayane Gevorgyan Real Estate" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:site" content="@GayaneGevorgyanRealtor" />

            {/* Geo */}
            <meta name="geo.region" content="US-MD" />
            <meta name="geo.placename" content="Ellicott City, Maryland" />
            <meta name="geo.position" content="39.2693;-76.7981" />
            <meta name="ICBM" content="39.2693, -76.7981" />
        </Helmet>
    );
};

export default SEO;
