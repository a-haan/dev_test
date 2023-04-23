import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Fav {
  id: number;
}

export interface FavState {
  favourites: Fav[];
}

const initialState: FavState = {
  favourites: [],
};

export const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInitialFavs.fulfilled, (state: any, action: any) => {
      state.favourites = action.payload;
    });
    builder.addCase(addtoFavs.fulfilled, (state: any, action: any) => {
      state.favourites.push(action.payload.id);
    });
    builder.addCase(removefromFavs.fulfilled, (state: any, action: any) => {
      state.favourites = state.favourites.filter(
        (fav: number) => fav !== action.payload.id,
      );
    });
  },
});

export const getInitialFavs = createAsyncThunk(
  'fav/getInitialFavs',
  async () => {
    try {
      // get the initial favs from local storage
      const favs = localStorage.getItem('favs');
      if (favs) {
        return JSON.parse(favs);
      }
      return [];
    } catch (e) {
      console.log('error', e);
      return [];
    }
  },
) as any;

export const addtoFavs = createAsyncThunk(
  'fav/addtoFavs',
  async ({ id }: { id: number }) => {
    // add id to favs local storage

    const favs = localStorage.getItem('favs');

    if (favs) {
      const favsArray = JSON.parse(favs);
      favsArray.push(id);
      localStorage.setItem('favs', JSON.stringify(favsArray));
      return { id: id };
    } else {
      localStorage.setItem('favs', JSON.stringify([id]));
      return { id: id };
    }
  },
) as any;

export const removefromFavs = createAsyncThunk(
  'fav/removefromFavs',
  async ({ id }: { id: number }) => {
    // remove id from favs local storage
    const favs = localStorage.getItem('favs');

    if (favs) {
      const favsArray = JSON.parse(favs);
      const newFavsArray = favsArray.filter((fav: number) => fav !== id);
      localStorage.setItem('favs', JSON.stringify(newFavsArray));
      return { id: id };
    }

    try {
    } catch (e) {
      console.log('error', e);
    }
  },
) as any;

export const selectFavs = (state: RootState) => state.fav.favourites;

// export favourites.length
export const selectFavCount = (state: RootState) =>
  state.fav.favourites?.length;

export default favSlice.reducer;
