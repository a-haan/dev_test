import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
type Props = {
  children: Children;
};

interface Children {
  [key: number]: React.ReactNode;
  length: number;
}

export default function Carousel({ children }: Props) {
  let [index, setIndex] = useState(0);
  let [tuple, setTuple] = useState([null, index]);
  if (tuple[1] !== index) {
    setTuple([tuple[1], index]);
  }

  let prev = tuple[0];
  let direction = index > prev ? 1 : -1;

  const variants = {
    enter: (direction: number) => ({
      opacity: 1,
      x: direction * 1000,
      scale: 0.5,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 50,
      },
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
      opacity: 0.3,
      scale: 0.3,
      x: direction * -1000,
      y: -100,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 70,
      },
    }),
  };

  const swipeHandlers = {
    onSwipedLeft: () => {
      if (index < children.length - 1) {
        setIndex(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        setIndex(index - 1);
      }
    },
  };

  const handlers = useSwipeable(swipeHandlers);

  return (
    <>
      <div className="w-screen overflow-hidden p-0 m-0">
        <div
          {...handlers}
          className="relative h-[800px] w-full flex justify-evenly items-center">
          <AnimatePresence custom={direction} mode='popLayout'>
            {children[index] ? (
              <motion.div
                key={index}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute top-0 bottom-0 h-full w-full flex justify-center items-center"
                custom={direction}>
                {children[index]}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex justify-center items-center mb-20">
        <motion.button
          whileTap={{ scale: 0.9 }}
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
          className={`p-5 px-10 m-5 bg-primary-primaryContainer text-primary-onPrimaryContainer border-background-outline rounded-full uppercase ${
            index === 0 ? 'opacity-50' : 'border'
          } `}>
          Prev
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          disabled={index === children.length - 1}
          onClick={() => setIndex(index + 1)}
          className={`p-5 px-10 m-5 bg-primary-primaryContainer text-primary-onPrimaryContainer border-background-outline rounded-full uppercase ${
            index === children.length - 1 ? 'opacity-50' : 'border'
          } `}>
          Next
        </motion.button>
      </div>
    </>
  );
}
