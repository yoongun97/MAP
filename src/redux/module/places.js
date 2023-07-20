import { createSlice } from '@reduxjs/toolkit';

const places = createSlice({
  name: 'places',
  initialState: [],
  reducers: {
    setPlaces(state, action) {
      if (action.payload) return action.payload.slice().sort((a, b) => b.likes - a.likes);
    },
    sortPlaces(state, action) {
      switch (action.payload) {
        case '좋아요순':
          return state.slice().sort((a, b) => b.likes - a.likes);
        case '오름차순':
          return state.slice().sort((a, b) => {
            if (a.placeName > b.placeName) {
              return 1;
            } else return -1;
          });
        case '내림차순':
          return state.slice().sort((a, b) => {
            if (b.placeName > a.placeName) {
              return 1;
            } else return -1;
          });
        default:
          return state;
      }
    }
  }
});

export default places.reducer;
export const { setPlaces, sortPlaces } = places.actions;
