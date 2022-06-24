import { createSlice } from '@reduxjs/toolkit';
export const driverSlice= createSlice({
  name: 'driver',
  initialState: {
    totalOrders:[],
    selectedOrders:[],
    routes:[]
  },
  reducers: {

    loadTotalOrders:(state,action)=>{
      state.totalOrders=[]
      state.totalOrders.push(action.payload)
    },

    loadSelectedOrders:(state,action)=>{
      state.selectedOrders=[]
      state.selectedOrders.push(action.payload)
    },
    loadRoutes:(state,action)=>{
      state.routes=[]
      state.routes.push(action.payload)
      console.log("state Routes",state.routes)
    }
  },
});

export function getTotalOrders(){
  const token = window.localStorage.getItem('token');
  const user = window.localStorage.getItem('user');
  return(dispatch)=>{
    console.log("I am working");
    fetch('https://ecommerce-postgres-backend.herokuapp.com/alldriverorders',{
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
export function getSelectedOrders(){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch('https://ecommerce-postgres-backend.herokuapp.com/selectedorders',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(loadSelectedOrders(data)))
    .catch((err)=>console.log(err))

  }
}
export function selectedOrder(id){
  const token = window.localStorage.getItem('token');
  const user = window.localStorage.getItem('user');

  return(dispatch)=>{
    fetch(`https://ecommerce-postgres-backend.herokuapp.com/selectedorder/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(getSelectedOrders()))
    .catch((err)=>console.log(err))
  }
}

export function deliveredOrder(currentAddress,NextAddress,index,length){
  const token = window.localStorage.getItem('token');
  const user = window.localStorage.getItem('user');

  return (dispatch)=>{
    fetch('https://ecommerce-postgres-backend.herokuapp.com/deliveredorder',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      },
      body:JSON.stringify({currentAddress,NextAddress,index,length})
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(getRoutes()))
    .catch((err)=>console.log(err))
  }
}


export function setRoute(){
  const token = window.localStorage.getItem('token');
  const user = window.localStorage.getItem('user');

  return (dispatch)=>{
    fetch("https://ecommerce-postgres-backend.herokuapp.com/setroute",{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>dispatch(getRoutes()))
    .catch((err)=>console.log(err))
  }
}

export function getRoutes(){
  const token = window.localStorage.getItem('token');
  const user = window.localStorage.getItem('user');

  return(dispatch)=>{
    fetch('https://ecommerce-postgres-backend.herokuapp.com/getroutes',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(loadRoutes(data)))
    .catch((err)=>console.log(err))
  }
}




export const { loadTotalOrders,loadSelectedOrders,loadRoutes} = driverSlice.actions;
export default driverSlice.reducer;

// https://ecommerce-postgres-backend.herokuapp.com
