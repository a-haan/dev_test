import { IconButton } from '@mui/material';
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import {
  addtoFavs,
  removefromFavs,
  selectFavs,
} from '../../../slices/favSlice';

type Props = {
  id: number;
};

export default function FavButton({ id }: Props) {
  const dispatch = useDispatch();
  const favs = useSelector(selectFavs);

  const handleFav = (id: number) => {
    favs.find((fav: any) => fav === id)
      ? dispatch(
          removefromFavs({
            id: id,
          }),
        )
      : dispatch(
          addtoFavs({
            id: id,
          }),
        );
  };

  return (
    <IconButton
      onClick={() => handleFav(id)}
      size="large"
      color="inherit"
      sx={{ ml: 2, mb: 1 }}>
      {favs.find((fav: any) => fav === id) ? (
        <FavoriteIcon />
      ) : (
        <FavoriteBorderIcon />
      )}
    </IconButton>
  );
}
