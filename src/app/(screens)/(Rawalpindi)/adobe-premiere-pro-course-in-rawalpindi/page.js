import Adobepremiere1 from "./Adobepremiererwp";

export default async function Adobepremierepro() {
  const metadata = await fetch('https://www.admin777.pny-trainings.com/api/city/specialpage/adobe-premiere-pro-course-in-rawalpindi', {
    cache: 'no-cache'
  })
    .then((response) => response.json())
    .then((data) => ({
      metatitle: data.special_page.meta_title,
      metadescription: data.special_page.meta_description,
      canonicalUrl: data.special_page.full_url // Assuming this contains the full slug
    }))
    .catch((error) => {
      console.error("Error fetching metadata:", error);
      return {
        metatitle: 'Default Title',
        metadescription: 'Default Description',
        canonicalUrl: '/adobe-premiere-pro-course-in-rawalpindi' // Default slug
      };
    });

  return (
    <>
      <title>{metadata.metatitle}</title>
      <meta name="description" content={metadata.metadescription} />
      <link
        rel="canonical"
        href={`${metadata.canonicalUrl}`}
      />
      <Adobepremiere1 />
    </>
  );
}
