import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { savePlan } from '../../api/plans';

const name = 'plan';

// 현재 일자 구하기
const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate.toLocaleDateString('ko-kr');
};

export const writePlan = createAsyncThunk(`${name}/writePlan`, async (data, thunkAPI) => {
  try {
    const newData = { ...data, createdAt: getCurrentDate() };
    if (
      Object.entries(newData.day1).length === 0 &&
      Object.entries(newData.day2).length === 0 &&
      Object.entries(newData.day3).length === 0 &&
      Object.entries(newData.day5).length === 0 &&
      Object.entries(newData.day4).length === 0
    ) {
      return thunkAPI.rejectWithValue({ error: { message: '1곳 이상의 장소를 추가해주세요' } });
    }
    const result = await savePlan(newData);
    if (result.success) return thunkAPI.fulfillWithValue({ message: result.message });
    return thunkAPI.rejectWithValue({ error: { message: result.message } });
  } catch (e) {
    return thunkAPI.rejectWithValue({ error: { message: e } });
  }
});

const initialState = {
  plan: { userId: null, placeId: null, title: '', createdAt: null, day1: [], day2: [], day3: [], day4: [], day5: [] },
  selectedTime: 1,
  loading: false,
  message: null,
  error: null
};

const planSlice = createSlice({
  name,
  initialState,
  reducers: {
    addTourPlace(state, action) {
      switch (action.payload.when) {
        case 1: {
          state.plan.day1.push({
            ...action.payload.selectedPlace,
            day: action.payload.when,
            index: state.plan.day1.length,
            text: ''
          });
          break;
        }
        case 2: {
          state.plan.day2.push({
            ...action.payload.selectedPlace,
            day: action.payload.when,
            index: state.plan.day2.length,
            text: ''
          });
          break;
        }
        case 3: {
          state.plan.day3.push({
            ...action.payload.selectedPlace,
            day: action.payload.when,
            index: state.plan.day3.length,
            text: ''
          });
          break;
        }
        case 4: {
          state.plan.day4.push({
            ...action.payload.selectedPlace,
            day: action.payload.when,
            index: state.plan.day4.length,
            text: ''
          });
          break;
        }
        case 5: {
          state.plan.day5.push({
            ...action.payload.selectedPlace,
            day: action.payload.when,
            index: state.plan.day5.length,
            text: ''
          });
          break;
        }
        default: {
          state.error = 'invalid action. bro';
        }
      }
    },
    setSelectedTime(state, action) {
      state.selectedTime = action.payload;
    },
    initTourPlaceData(state, action) {
      state.plan.placeId = action.payload.placeId;
      state.plan.userId = action.payload.userId;
    },
    setPlanTitle(state, action) {
      state.plan.title = action.payload;
    },
    setTextSpot(state, action) {
      state.plan[`day${action.payload.day}`][action.payload.index].text = action.payload.text;
    },
    deleteTourPlace(state, action) {
      const deletedArr = state.plan[`day${action.payload.day}`].filter((plan) => plan.index !== action.payload.index);
      state.plan[`day${action.payload.day}`] = deletedArr;
    },
    deleteAllTourPlace(state, action) {
      for (let i = 1; i <= 5; i++) state.plan[`day${i}`] = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(writePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(writePlan.fulfilled, (state, action) => {
        state.loading = false;
        for (let i = 1; i <= 5; i++) state.plan[`day${i}`] = [];
        state.message = '여행계획을 작성하였습니다.';
        alert(state.message);
      })
      .addCase(writePlan.rejected, (state, action) => {
        state.loading = false;
        for (let i = 1; i <= 5; i++) state.plan[`day${i}`] = [];
        state.error = action.payload.error.message;
        alert(state.error);
      });
  }
});
export default planSlice.reducer;
export const {
  addTourPlace,
  initTourPlaceData,
  setSelectedTime,
  setTextSpot,
  deleteTourPlace,
  deleteAllTourPlace,
  setPlanTitle
} = planSlice.actions;
