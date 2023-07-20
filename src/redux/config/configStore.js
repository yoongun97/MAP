import { configureStore } from '@reduxjs/toolkit';
import places from '../modules/places';

const store = configureStore({
  reducer: { places: places },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
