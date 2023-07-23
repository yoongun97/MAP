import { createSlice } from '@reduxjs/toolkit';

const searchKeyword = createSlice({
  name: 'searchKeyword',
  initialState: '',
  reducers: {
    setSearchKeyword(state, action) {
      return action.payload;
    }
  }
});

export default searchKeyword.reducer;
export const { setSearchKeyword } = searchKeyword.actions;
