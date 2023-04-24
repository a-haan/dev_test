import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { AnimatePresence, motion } from 'framer-motion';
import fetchNasaData from '../../../lib/fetchNasaData';
import Link from 'next/link';
import { useRouter } from 'next/router';
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Search({ open, setOpen }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const deBounce = (func: any, delay: number) => {
    let inDebounce: any;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: { xs: 300, md: 400, lg: 600 },
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    bgcolor: '#000',
    border: '2px solid #5f5858',
    boxShadow: 24,
    borderRadius: 8,
    p: { xs: 3, sm: 4, md: 5 },
    maxHeight: '80vh',
  };

  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const handleSearchSubmit = useCallback(async (search: string) => {
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

    const uniqueNasaData = nasaData.filter((item: any, index: number) => {
      const isDuplicate = nasaData.findIndex((planet: any) => {
        return planet.id === item.id;
      });
      return isDuplicate === index;
    });

    // filter out the planet that matches the hostname and return the object
    const planet = uniqueNasaData.filter((item: any) => {
      const slug = item.title.toLowerCase().includes(search.toLowerCase());
      return slug;
    });

    setResults(planet);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setLoading(true);

      handleSearchSubmit(search);
    }
  }, [search, handleSearchSubmit]);

  useEffect(() => {
    // if page changes close the modal
    router.events.on('routeChangeStart', handleClose);
    return () => {
      router.events.off('routeChangeStart', handleClose);
    };
  }, [router.events, handleClose]);

  return (
    <AnimatePresence mode="wait">
      <Modal
        component={motion.div}
        variants={variants}
        initial="closed"
        animate="open"
        exit="closed"
        open={open}
        onClose={handleClose}>
        <Box sx={style}>
          <div className="flex justify-end items-center mb-3">
            <IconButton
              aria-label="close search"
              onClick={handleClose}
              sx={{
                color: '#fff',
              }}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className="flex justify-center items-center">
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              color="secondary"
              value={search}
              onChange={(e) => deBounce(handleSearch(e), 500)}
              sx={{
                width: '100%',
                '& label.Mui-focused': {
                  color: '#00e0b5',
                },
                '& .MuiFormLabel-root': {
                  color: '#fff',
                },
                '& .MuiInputBase-input': {
                  color: '#fff',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#00e0b5',
                  },
                  '&:hover fieldset': {
                    borderColor: '#00e0b5',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00e0b5',
                  },
                },
              }}
            />
          </div>
          <div className="flex mt-3 justify-between items-center prose prose-invert prose-img:rounded-3xl lg:prose-xl">
            <Typography variant="h6" component="div" sx={{ mr: 2, mt: 2 }}>
              Search results:
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: '#00e0b5' }}>
              {results.length}
            </Typography>
          </div>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 2,
            }}>
            {loading ? (
              <CircularProgress
                sx={{
                  color: '#00e0b5',
                }}
              />
            ) : (
              <div className="w-full text-background-onDefault overflow-y-auto divide-y-2 divide-background-outline">
                {results.map((item: any) => (
                  <Link href={`/planets/${item.id}`} key={item.id}>
                    <ListItem
                      component={motion.li}
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      color="inherit"
                      sx={{
                        borderBottom: '2px solid rgb(137 147 142)',
                        '&:hover': {
                          backgroundColor: '#00e0b5',
                          color: '#000',
                        },
                      }}>
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
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                ))}
              </div>
            )}
          </Box>
        </Box>
      </Modal>
    </AnimatePresence>
  );
}
