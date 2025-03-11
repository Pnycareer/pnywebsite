import Trainingschedule1 from "./Trainingschedule1";

export default async function Trainingschedule() {
  const metadata = await fetch('https://www.admin777.pny-trainings.com/api/metas/training-schedule', {
    cache: 'no-cache'
  })
    .then((response) => response.json())
    .then((data) => ({
      metatitle: data.metas[0].meta_title,
      metadescription: data.metas[0].meta_description
    }))
    .catch((error) => {
      console.error("Error fetching metadata:", error);
      return {
        metatitle: '',
        metadescription: ''
      };
    });

  return (
    <>
      <title>{metadata.metatitle}</title>
      <link rel="canonical" href="http://localhost:10001/training-schedule" />
      <meta name="description" content={metadata.metadescription} />
      <Trainingschedule1 />

    </>
  );
}