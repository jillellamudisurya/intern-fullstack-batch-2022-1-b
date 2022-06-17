import { createSlice } from '@reduxjs/toolkit';
export const driverSlice= createSlice({
  name: 'driver',
  initialState: {
    totalOrders:[],
    selectedOrders:[],
  },
  reducers: {

    loadTotalOrders:(state,action)=>{
      state.totalOrders=[]
      state.totalOrders.push(action.payload)
    },

    loadSelectedOrders:(state,action)=>{
      state.selectedOrders=[]
      state.selectedOrders.push(action.payload)
    }
  },
});

export function getTotalOrders(){
  const token = window.localStorage.getItem('token');
  const user = window.localStorage.getItem('user');
  return(dispatch)=>{
    console.log("I am working");
    fetch('http://localhost:3700/alldriverorders',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>{console.log("DriverData::",data);dispatch(loadTotalOrders(data))})
    .catch((err)=>console.log(err))
  }
}




export const { loadTotalOrders,loadSelectedOrders} = driverSlice.actions;
export default driverSlice.reducer;
