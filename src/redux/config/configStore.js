import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import places from '../modules/places';
import tourPlacesReducer from '../modules/tourPlaces';
import kakaoReducer from '../modules/kakao';
import searchKeyword from '../modules/searchKeyword';
import planReducer from '../modules/plan';
const store = configureStore({
  reducer: { places, tourPlacesReducer, kakaoReducer, searchKeyword, planReducer },
  devTools: process.env.NODE_ENV !== 'production',
  // 무한 스크롤의 A non-serializable value was detected in an action 오류를 해결하기 위해 사용. 오류가 있다면 삭제 무방.
  middleware: getDefaultMiddleware({ serializableCheck: false })
});

export default store;
