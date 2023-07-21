import { createSlice } from '@reduxjs/toolkit';

const places = createSlice({
  name: 'places',
  initialState: [],
  reducers: {
    setPlaces(state, action) {
      // 튜터님께 여쭤보기
      // rtk는 immer가 있는데 sort는 안먹히는 이유
      // let a = action.payload;
      // console.log(action.payload);
      if (action.payload) {
        // console.log를 통해 확인하니, a와 b는 다르다. immer가 먹히지 않는건가??
        let b = action.payload.slice().sort((a, b) => b.likes - a.likes);
        // console.log(a === b);
        return b;
      }
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
