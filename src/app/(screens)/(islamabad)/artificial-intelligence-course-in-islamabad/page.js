import Artificialintelligence from "./Artificialintelligence";

export default async function Androidcourse() {
  const metadata = await fetch('https://www.admin777.pny-trainings.com/api/city/specialpage/artificial-intelligence-course-in-islamabad', {
    cache: 'no-cache'
  })
    .then((response) => response.json())
    .then((data) => ({
      metatitle: data.special_page.meta_title,
      metadescription: data.special_page.meta_description,
      canonicalUrl: data.special_page.full_url
    }))
    .catch((error) => {
      console.error("Error fetching metadata:", error);
      return {
        metatitle: 'Default Title',
        metadescription: 'Default Description',
        canonicalUrl: ''
      };
    });

  return (
    <>
      <title>{metadata.metatitle}</title>
      <meta name="description" content={metadata.metadescription} />
      {metadata.canonicalUrl && (
        <link rel="canonical" href={metadata.canonicalUrl} />
      )}
      <Artificialintelligence />
    </>
  );
}
