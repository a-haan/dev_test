import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Toolbar from '../components/ui/toolbar/Toolbar';
import {
  Avatar,
  Box,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { selectFavs } from '../slices/favSlice';
import { useSelector } from 'react-redux';
import FavButton from '../components/ui/favourites/FavButton';
import fetchNasaData from '../lib/fetchNasaData';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Props = {};

const Favourites = (props: Props) => {
  const favs = useSelector(selectFavs);
  const [favsData, setFavsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFavs = useCallback(async () => {
    try {
      const res = await fetch(
        `https://binary-vision.s3.eu-west-2.amazonaws.com/discoveries.json`,
      );
      const data = await res.json();
      setLoading(true);

      const nasaData = await Promise.all(
        data.map(async (item: any) => {
          const planet = item.hostname;
          const date = item.releasedate;
          const radius = item.pl_rade;
          const nasaData = await fetchNasaData(planet, date, radius);

          return nasaData;
        }),
      );

      const uniqueNasaData = nasaData.filter((item: any, index: number) => {
        const isDuplicate = nasaData.findIndex((planet: any) => {
          return planet.id === item.id;
        });
        return isDuplicate === index;
      });

      const favsData = uniqueNasaData.filter((item: any) => {
        const slug = favs.some((fav: any) => fav === item.id);
        return slug;
      });
      if (favsData) {
        setLoading(false);
      }

      setFavsData(favsData);
    } catch (error) {
      console.log(error);
    }
  }, [favs]);

  useMemo(() => {
    if (favs.length > 0) {
      fetchFavs();
    }
    if (favs.length === 0) {
      setFavsData([]);
    }

    return () => {
      setFavsData([]);
    };
  }, [fetchFavs, favs]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="relative h-screen w-screen flex flex-col mt-5">
      <Toolbar />
      <div className="prose prose-invert prose-img:rounded-3xl lg:prose-xl mx-auto px-5">
        <h1 className="">Favourite Planets</h1>

        {favs.length === 0 ? (
          <p className="text-background-onDefault">
            You have no favourites. Click the heart icon on a planet to add it
            to your favourites.
          </p>
        ) : null}
      </div>

      {loading ? (
        <Box sx={{ width: '100%', my: 5 }}>
          <LinearProgress
            sx={{
              '& .MuiLinearProgress-barColorPrimary': {
                backgroundColor: '#00e0b5',
                height: '5px',
                borderRadius: '5px',
              },
              '&.MuiLinearProgress-colorPrimary': {
                backgroundColor: 'transparent',
              },
            }}
          />
        </Box>
      ) : null}

      <div className="!text-background-onDefault mt-6 max-w-5xl mx-auto divide-y-2 divide-background-outline">
        {favsData.map((item: any) => {
          return (
            <ListItem
              component={motion.li}
              variants={variants}
              initial="hidden"
              animate="visible"
              key={item.id}
              secondaryAction={<FavButton id={item.id} />}
              color="inherit">
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      objectFit: 'cover',
                    }}
                    alt={item.title}
                    src={item.image}
                  />
                </ListItemAvatar>
                <Link href={`/planets/${item.id}`}>
                  <ListItemText
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                      '& .MuiListItemText-secondary': {
                        color: 'inherit',
                        opacity: 0.7,
                      },
                    }}
                    primary={item.title}
                    secondary={item.description}
                  />
                </Link>
              </ListItemButton>
            </ListItem>
          );
        })}
      </div>
    </div>
  );
};

export default Favourites;
