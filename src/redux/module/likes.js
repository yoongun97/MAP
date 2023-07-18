import { createSlice } from '@reduxjs/toolkit';

const likes = createSlice({
  name: 'likes',
  initialState: [{ placeId: '', userId: '' }],
  reducers: {
    setLikes(state, action) {
      return action.payload;
    }
  }
});

export default likes.reducer;
export const { setLikes } = likes.actions;
