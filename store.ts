import { configureStore } from '@reduxjs/toolkit';
import favReducer from './slices/favSlice';

export const store = configureStore({
  reducer: {
    fav: favReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: ['getInitialFavs', 'addtoFavs', 'removefromFavs'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
