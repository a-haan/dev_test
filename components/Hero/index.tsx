import background from './background.jpg';
import Image from 'next/image';
import { motion } from 'framer-motion';

const backgroundVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const titleVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};

const Hero = () => (
  <motion.div className="p-2 md:p-5 relative">
    <Image
      src={background.src}
      alt="Earth from ISS"
      className="rounded-3xl aspect-square md:aspect-video object-cover md:h-[500px] object-right -z-10"
      loading="eager"
      placeholder="blur"
      blurDataURL={background.blurDataURL}
      width={background.width}
      height={background.height}
      sizes="(min-width: 768px) 768px, 100vw"
      priority
    />
    <motion.div
      variants={backgroundVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1 }}
      className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80"
    />
    <div className="prose prose-invert lg:prose-xl">
      <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, delay: 0.5 }}
        className="z-10 absolute bottom-10 left-10 text-lg md:text-7xl">
        EXOPLANET CATALOG
      </motion.h1>
    </div>
  </motion.div>
);

export default Hero;
