import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPlaces, getPlacesAreaBased } from '../../api/tourPlaces';
const name = 'tourPlaces';
export const fecthTourPlaces = createAsyncThunk(
  `${name}/fecthTourPlaces`,
  async ({ contentTypeId, arrange, mapX, mapY, radius, pageNo, ob, unob }, thunkAPI) => {
    try {
      let res = await getPlaces(contentTypeId, arrange, radius, mapX, mapY, pageNo);
      if (res.length < 1) {
        res = [];
      }
      return thunkAPI.fulfillWithValue({ res: res, ob: ob, unob: unob });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const fecthTourPlacesBasedAreaCode = createAsyncThunk(
  `${name}/fecthTourPlacesBasedAreaCode`,
  async ({ contentTypeId, areaCode, sigunguCode, arrange, pageNo, ob, unob }, thunkAPI) => {
    try {
      const res = await getPlacesAreaBased(contentTypeId, areaCode, sigunguCode, arrange, pageNo);

      return thunkAPI.fulfillWithValue({ res: res, ob: ob, unob: unob });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
const initialState = {
  tourPlaces: [],
  loading: false,
  nothing: false,
  error: null
};

const tourPlaceSlice = createSlice({
  name,
  initialState,
  reducers: {
    setPlace(state, action) {
      state.tourPlaces = action.payload; //[]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fecthTourPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.nothing = false;
      })
      .addCase(fecthTourPlaces.fulfilled, (state, action) => {
        state.loading = false;
        let dupArr = [...state.tourPlaces, ...action.payload.res];
        let dupRemovedArr = [...new Map(dupArr.map((tourPlace) => [tourPlace.contentid, tourPlace])).values()];
        action.payload.unob();
        state.tourPlaces = dupRemovedArr;
        action.payload.ob();
      })
      .addCase(fecthTourPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.nothing = true;
      })

      .addCase(fecthTourPlacesBasedAreaCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fecthTourPlacesBasedAreaCode.fulfilled, (state, action) => {
        state.loading = false;
        let dupArr = [...state.tourPlaces, ...action.payload.res];
        let dupRemovedArr = [...new Map(dupArr.map((tourPlace) => [tourPlace.contentid, tourPlace])).values()];

        action.payload.unob();
        state.tourPlaces = dupRemovedArr;
        action.payload.ob();
      })
      .addCase(fecthTourPlacesBasedAreaCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
export default tourPlaceSlice.reducer;
export const { setPlace } = tourPlaceSlice.actions;
