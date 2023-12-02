import Head from "next/head";
import { useContext } from "react";
import { GlobalContext } from "../../pages/_app";
import { getStrapiMedia } from "../../lib/media";

const Seo = ({ seo, customTitle, canonical }) => {
  const { global } = useContext(GlobalContext);
  const { defaultSeo, siteName } = global.attributes;
  const seoWithDefaults = {
    ...defaultSeo,
    ...seo,
  };
  const fullSeo = {
    ...seoWithDefaults,
    // Add title suffix
    metaTitle: siteName !== seoWithDefaults.metaTitle ? `${siteName} - ${seoWithDefaults.metaTitle}` : customTitle ? `${customTitle} - ${siteName}` : siteName,
    // Get full image URL
    shareImage: getStrapiMedia(seoWithDefaults.shareImage),
  };

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta property="og:site_name" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      {fullSeo.article && <meta property="og:type" content="article" />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="author" content="Piotr Jaworski" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta http-equiv="Content-Language" content="en" />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default Seo;
