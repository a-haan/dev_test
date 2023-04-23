import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import { Badge, IconButton, useScrollTrigger } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialFavs, selectFavCount } from '../../../slices/favSlice';
import Search from '../search/Search';
type Props = {};

const Toolbar = (props: Props) => {
  const toolbarVariants = {
    hidden: {
      y: '150%',
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const dispatch = useDispatch();
  const favCount = useSelector(selectFavCount);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const getFavs = async () => {
    try {
      dispatch(getInitialFavs());
    } catch (err) {
      console.log('Error getting favs', err);
    }
  };

  useEffect(() => {
    getFavs();
  }, []);

  const trigger = useScrollTrigger({
    threshold: 0,
  });
  return (
    <motion.div
      className="fixed bottom-5 left-0 right-0 z-10 w-full pointer-events-none"
      variants={toolbarVariants}
      initial="hidden"
      animate={trigger ? 'hidden' : 'visible'}>
      <div className="w-fit mx-auto h-20 bg-tertiary-tertiaryContainer rounded-full bg-opacity-50 backdrop-filter backdrop-blur-3xl flex items-center justify-center pointer-events-auto px-5">
        <div className="flex items-center justify-evenly text-tertiary-onTertiaryContainer">
          <IconButton
            size="large"
            color="inherit"
            sx={{ mx: 1 }}
            component={Link}
            href={'/'}
            title="Home">
            <HomeIcon />
          </IconButton>

          <IconButton
            size="large"
            color="inherit"
            sx={{ mx: 1 }}
            component={Link}
            href={'/favourites'}
            title="Favourites">
            <Badge
              badgeContent={favCount > 0 ? favCount : null}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#00e0b5',
                  color: '#000',
                  fontSize: '0.6rem',
                },
              }}>
              {favCount > 0 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Badge>
          </IconButton>

          <IconButton
            onClick={() => setSearchOpen(true)}
            disabled={searchOpen}
            size="large"
            color="inherit"
            sx={{ mx: 1 }}
            title="Not available">
            <SearchIcon />
          </IconButton>

          <IconButton
            disabled
            size="large"
            color="inherit"
            sx={{ mx: 1 }}
            title="Not available">
            <AccountCircleIcon />
          </IconButton>
        </div>
      </div>
      <Search open={searchOpen} setOpen={setSearchOpen} />
    </motion.div>
  );
};

export default Toolbar;
