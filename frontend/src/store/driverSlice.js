import { createSlice } from '@reduxjs/toolkit';
export const driverSlice= createSlice({
  name: 'driver',
  initialState: {
    // totalDrivers:[]
  },
  reducers: {
    // loadDrivers:(state,action)=>{
    //   state.totalDrivers=[];
    //   state.totalDrivers.push(action.payload);
    //   console.log("State;;",state.totalDrivers)
    // }
  },
});



export const { loadDrivers} = driverSlice.actions;
export default driverSlice.reducer;
