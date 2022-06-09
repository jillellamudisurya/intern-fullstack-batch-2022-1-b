import { createSlice } from '@reduxjs/toolkit';
export const userSlice= createSlice({
  name: 'user',
  initialState: {
    count:9
  },
  reducers: {
    increment: (state) => {
      state.count = state.count + 1;
    },
    decrement: (state) => {
      state.count = state.count - 1;
    },
    reset: (state) => {
      state.count = 0;
    },
  },
});
export const { increment, decrement, reset } = userSlice.actions;
export default userSlice.reducer;
