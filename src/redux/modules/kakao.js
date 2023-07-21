import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const name = 'kakao';
export const fetchkakao = createAsyncThunk(`${name}/fetchkakao`, async (LatLng, thunkAPI) => {
  try {
    console.log(LatLng);
    return thunkAPI.fulfillWithValue(LatLng);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});
const initialState = {
  kakao: { mapX: null, mapY: null },
  isMarked: false,
  isMarkedMarked: false,
  kakaoLoading: false,
  error: null
};

const kakaoSlice = createSlice({
  name,
  initialState,
  reducers: {
    setIsMarkedMarked(state, action) {
      state.isMarkedMarked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchkakao.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchkakao.fulfilled, (state, action) => {
        state.loading = false;
        state.kakao.mapX = action.payload.getLng();
        state.kakao.mapY = action.payload.getLat();
        state.isMarked = true;
      })
      .addCase(fetchkakao.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
export default kakaoSlice.reducer;
export const { setIsMarkedMarked } = kakaoSlice.actions;
