import { configureStore } from '@reduxjs/toolkit';
import likes from '../module/likes';

const store = configureStore({
  reducer: {
    likes
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
