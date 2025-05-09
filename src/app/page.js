import ClientComponent from "./(screens)/home/page";
export default async function Home() {
  const metadata = await fetch(
    "https://www.admin777.pny-trainings.com/api/metas/home",
    {
      cache: "no-cache",
    }
  )
    .then((response) => response.json())
    .then((data) => ({
      metatitle: data.metas[0].meta_title,
      metadescription: data.metas[0].meta_description,
    }))
    .catch((error) => {
      console.error("Error fetching metadata:", error);
      return {
        metatitle: "",
        metadescription: "",
      };
    });

  // const metadata = {
  //   metatitle: "PNY Trainings Head Office – Arfa Karim Tower, Lahore",
  //   metadescription:
  //     "At Arfa Tower, we offer programs in Digital Marketing, Web Development, AI, Data Science, Graphic Design, E-Commerce, Cyber Security & Networking 0304-1111774",
  // };

  return (
    <>
      <title>{metadata.metatitle}</title>
      <meta name="description" content={metadata.metadescription} />
      <meta
        name="google-site-verification"
        content="xt9UQlTcyB46zJ1blAQyrgQvW-0AdlxqSsmkR8bUB4Y"
      />
      <link rel="icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&family=Manrope:wght@200&family=Poppins:wght@600&display=swap"
        rel="stylesheet"
      />

      <ClientComponent />
    </>
  );
}
