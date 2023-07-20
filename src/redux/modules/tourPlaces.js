import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPlaces } from '../../api/tourPlaces';
const name = 'tourPlaces';
export const fecthTourPlaces = createAsyncThunk(
  `${name}/fecthTourPlaces`,
  async ({ contentTypeId, arrange, mapX, mapY, radius, pageNo, ob, unob }, thunkAPI) => {
    try {
      const res = await getPlaces(contentTypeId, arrange, radius, mapX, mapY, pageNo);
      console.log(res);
      return thunkAPI.fulfillWithValue({ res: res, ob: ob, unob: unob });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
const initialState = {
  tourPlaces: [],
  loading: false,
  error: null
};

const tourPlaceSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fecthTourPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fecthTourPlaces.fulfilled, (state, action) => {
        state.loading = false;
        let dupArr = [...state.tourPlaces, ...action.payload.res];
        let dupRemovedArr = [...new Map(dupArr.map((tourPlace) => [tourPlace.contentid, tourPlace])).values()];
        console.log(dupRemovedArr);
        action.payload.unob();
        state.tourPlaces = dupRemovedArr;
        action.payload.ob();
      })
      .addCase(fecthTourPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
export default tourPlaceSlice.reducer;
