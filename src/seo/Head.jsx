import Head from "next/head";

const SEOHead = ({ hostname }) => {
  // Extract subdomain as the company/site name
  const subdomain = window.hostname?.split(".")[0];
  const siteName = subdomain !== "www" ? subdomain : "Giftify";

  return (
    <Head>
      {/* Dynamic Title Based on Subdomain */}
      <title>{siteName} - The Perfect Gifts for Every Occasion</title>
      <meta
        name="description"
        content={`Discover unique and personalized gifts for all your special moments. ${siteName} makes every occasion memorable!`}
      />
      <meta
        name="keywords"
        content={`${siteName}, gifts, personalized gifts, gift shop, birthday gifts, anniversary gifts, unique gifts`}
      />
      <meta name="author" content={siteName} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={`${siteName} - The Perfect Gifts for Every Occasion`} />
      <meta
        property="og:description"
        content={`Discover unique and personalized gifts for all your special moments. ${siteName} makes every occasion memorable!`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://${hostname}`} />
      <meta property="og:image" content={`https://${hostname}/assets/og-image.jpg`} />

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${siteName} - The Perfect Gifts for Every Occasion`} />
      <meta
        name="twitter:description"
        content={`Discover unique and personalized gifts for all your special moments. ${siteName} makes every occasion memorable!`}
      />
      <meta name="twitter:image" content={`https://${hostname}/assets/twitter-image.jpg`} />

      {/* Additional Metadata */}
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="canonical" href={`https://${hostname}`} />

      {/* Font and Theme */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <meta name="theme-color" content="#6C63FF" />
    </Head>
  );
};

export default SEOHead;
