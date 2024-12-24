import Head from "next/head";

export async function getServerSideProps({ req }) {
  const host = req.headers.host || ""; // Extract the host
  const subdomain = host.split(".")[0]; // Extract subdomain
  const siteName = subdomain !== "www" ? subdomain : "Gift2.Click";

  return {
    props: { siteName, hostname: host }, // Pass to component as props
  };
}

const SEOHead = ({ siteName, hostname }) => {
  return (
    <Head>
      <title>{siteName} - The Perfect Gifts for Every Occasion</title>
      <meta
        name="description"
        content={`Discover unique and personalized gifts for all your special moments. ${siteName} makes every occasion memorable!`}
      />
      <meta property="og:title" content={`${siteName} - The Perfect Gifts for Every Occasion`} />
      <meta property="og:description" content={`Discover unique and personalized gifts for all your special moments. ${siteName} makes every occasion memorable!`} />
      <meta property="og:url" content={`https://${hostname}`} />
      <meta property="og:image" content={`https://${hostname}/assets/og-image.jpg`} />
      <meta name="twitter:title" content={`${siteName} - The Perfect Gifts for Every Occasion`} />
      <meta name="twitter:description" content={`Discover unique and personalized gifts for all your special moments. ${siteName} makes every occasion memorable!`} />
      <meta name="twitter:image" content={`https://${hostname}/assets/twitter-image.jpg`} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};


export default SEOHead;
