import { configureStore } from '@reduxjs/toolkit';
import places from '../modules/places';
import tourPlacesReducer from '../modules/tourPlaces';
import kakaoReducer from '../modules/kakao';
const store = configureStore({
  reducer: { places: places, tourPlacesReducer, kakaoReducer },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
