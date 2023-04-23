import Hero from '../components/Hero';
import PlanetCard, { Planet } from '../components/PlanetCard';
import Carousel from '../components/ui/Carousel';
import Toolbar from '../components/ui/toolbar/Toolbar';
import fetchNasaData from '../lib/fetchNasaData';

export async function getStaticProps() {
  try {
    const res = await fetch(
      `https://binary-vision.s3.eu-west-2.amazonaws.com/discoveries.json`,
    );
    const data = await res.json();

    // sort by date
    data.sort((a: any, b: any) => {
      return (
        new Date(b.releasedate).getTime() - new Date(a.releasedate).getTime()
      );
    });

    // for each planet in the data array, fetch the data from the NASA API
    const nasaData = await Promise.all(
      data.map(async (item: any) => {
        const planet = item.hostname;
        const date = item.releasedate;
        const radius = item.pl_rade;
        const nasaData = await fetchNasaData(planet, date, radius);
        return nasaData;
      }),
    );

    // check nasadata for duplicate ids and remove them
    const uniqueNasaData = nasaData.filter((item: any, index: number) => {
      const isDuplicate = nasaData.findIndex((planet: any) => {
        return planet.id === item.id;
      });
      return isDuplicate === index;
    });

    return {
      props: {
        nasaData: uniqueNasaData,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

const Home = ({ nasaData }) => {
  return (
    <div className="mb-32">
      <Hero />
      <div className="prose prose-invert prose-img:rounded-3xl lg:prose-xl mx-auto my-28 px-5">
        <h1>Cosmos</h1>
        <p>
          Once you have an innovation culture, even those who are not scientists
          or engineers - poets, actors, journalists - they, as communities,
          embrace the meaning of what it is to be scientifically literate. They
          embrace the concept of an innovation culture. They vote in ways that
          promote it. They don't fight science and they don't fight technology.
        </p>
        <p>
          Private enterprise in the history of civilization has never led large,
          expensive, dangerous projects with unknown risks. That has never
          happened because when you combine all these factors, you cannot create
          a capital market valuation of that activity.
        </p>
        <p>
          In science, if you don't do it, somebody else will. Whereas in art, if
          Beethoven didn't compose the 'Ninth Symphony,' no one else before or
          after is going to compose the 'Ninth Symphony' that he composed; no
          one else is going to paint 'Starry Night' by van Gogh.
        </p>

      </div>
      <div className="prose prose-invert prose-img:rounded-3xl lg:prose-xl mx-auto my-5 px-5">
        <h1>Discoveries</h1>
      </div>
      <Carousel>
        {nasaData.map((item: Planet) => (
          <PlanetCard planet={item} key={item.title} />
        ))}
      </Carousel>
      <Toolbar />
    </div>
  );
};
export default Home;
