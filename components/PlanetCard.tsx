import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export interface Planet {
  description: string;
  date: string;
  mass: string;
  image: string;
  title: string;
  radius: number;
  slug: string;
  id: number;
  planet_type: string;
  pl_discmethod: string;
  pl_facility: string;
}

type Props = {
  planet: Planet;
};

export default function PlanetCard({ planet }: Props) {
  return (
    <div
      key={planet.id}
      title="Swipe me left or right on mobile"
      className="prose prose-invert prose-img:rounded-3xl rounded-[100px] overflow-hidden shadow-lg px-10 my-5 mx-auto not-prose border bg-[rgba(104,112,184,0.1)] border-background-outline w-[340px] lg:px-24 lg:w-[640px] h-[690px] flex flex-col justify-center items-center before:block before:absolute before:-inset-0 before:opacity-90 before:blur-2xl  before:bg-background-surface before:-z-10 relative">
      <div className="relative">
        <Image
          src={planet.image}
          alt={planet.title}
          width={250}
          height={250}
          quality={100}
          loading="lazy"
          className="aspect-square object-cover object-[20%] rounded-full mb-2"
        />
        <motion.div
          whileInView={{ y: [0, 50, 10, 0], x: [0, 30, -30, 0], rotate: 360 }}
          transition={{
            times: [0, 0.5, 1],
            duration: 15,
            ease: 'linear',
            repeat: Infinity,
            loop: Infinity,
            delay: 0.3,
          }}
          className="aspect-square object-cover object-[20%] rounded-full mb-2 absolute top-[-90px] blur-xl w-[300px] h-[370px] -z-10 ">
          <Image
            src={planet.image}
            alt={planet.title}
            width={150}
            height={150}
            quality={1}
            loading="lazy"
            className="aspect-square object-cover object-[20%] rounded-full mb-2 absolute top-[-50px] blur-xl w-[300px] h-[370px] -z-10"
          />
        </motion.div>
      </div>
      <h1 className="font-bold text-4xl mb-3">{planet.title}</h1>
      <p className="text-base mb-1 text-center opacity-70 text-background-onSurface">
        {planet.description}
      </p>
      <Link
        href={{
          pathname: '/planets/[planet]',
          query: { planet: planet.id },
        }}
        as={`/planets/${planet.id}`}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-primary-default text-primary-onPrimary rounded-full w-full px-4 py-2 mt-5 font-bold my-2">
          Visit Planet
        </motion.button>
      </Link>
      <p className="text-base my-1 font-bold text-background-onSurface opacity-70">
        Discovered on {planet.date}
      </p>
    </div>
  );
}
