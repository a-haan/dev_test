import React from 'react';
import { Planet } from '../../components/PlanetCard';
import fetchNasaData from '../../lib/fetchNasaData';
import Image from 'next/image';
import Toolbar from '../../components/ui/toolbar/Toolbar';
import { motion } from 'framer-motion';
import FavButton from '../../components/ui/favourites/FavButton';

type Props = {
  planet: Planet;
};

export const getStaticPaths = async () => {
  const res = await fetch(
    `https://binary-vision.s3.eu-west-2.amazonaws.com/discoveries.json`,
  );
  const data = await res.json();

  const nasaData = await Promise.all(
    data.map(async (item: any) => {
      const planet = item.hostname;
      const date = item.releasedate;
      const radius = item.pl_rade;
      const nasaData = await fetchNasaData(planet, date, radius);
      return nasaData;
    }),
  );

  const paths = nasaData.map((planet: any) => {
    return {
      params: { planet: planet.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(
      `https://binary-vision.s3.eu-west-2.amazonaws.com/discoveries.json`,
    );
    const data = await res.json();

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

    // filter out the planet that matches the hostname and return the object
    const planet = nasaData.filter((item: any) => {
      const slug = item.id.toString() === params.planet;
      return slug;
    });

    return {
      props: {
        planet: planet[0],
        nasaData,
        params,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default function PlanetPage({ planet }: Props) {
  const variants = {
    hidden: { opacity: 0, clipPath: 'circle(0% at 50% 50%)' },
    visible: {
      opacity: 1,
      clipPath: 'circle(100% at 50% 50%)',
      transition: {
        duration: 1,
        delay: 0.5,
      },
    },
  };

  return (
    <>
      <motion.div
        className="relative w-screen h-screen"
        initial="hidden"
        animate="visible"
        variants={variants}>
        <Image
          src={planet.image}
          alt={planet.title}
          fill
          priority
          className="object-cover brightness-50"
        />
        <div className="prose prose-invert prose-img:rounded-3xl lg:prose-xl mx-auto px-5 relative h-screen w-screen flex flex-col lg:justify-center items-center">
          <h1 className="p-5 px-10 mt-8 lg:mt-0 bg-secondary-default text-secondary-onSecondary rounded-full">
            {planet.title}
            <FavButton id={planet.id} />
          </h1>
          <p>{planet.description}</p>
          <div className="flex flex-col items-center bg-secondary-secondaryContainer px-5 lg:px-16 py-5 mt-1 lg:mt-3 rounded-xl text-secondary-onSecondaryContainer">
            <div className="flex flex-col items-start lg:items-center">
              <span className="text-lg">Discovery Date: {planet.date}</span>
              <span className="text-lg">
                Discovery Method: {planet.pl_discmethod}
              </span>
              <span className="text-lg">Radius: {planet.radius}</span>
              <span className="text-lg">Mass: {planet.mass}</span>
              <span className="text-lg">Planet Type: {planet.planet_type}</span>
              <span className="text-lg">Facility: {planet.pl_facility}</span>
            </div>
          </div>
        </div>

        <Toolbar />
      </motion.div>
    </>
  );
}
