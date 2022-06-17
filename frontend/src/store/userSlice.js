import { createSlice } from '@reduxjs/toolkit';
export const userSlice= createSlice({
  name: 'user',
  initialState: {
    loadAllCartProducts:[],
    loadAllProducts:[],
    loadAllCategories:[],
    loadAllAddresses:[],
    loadAllOrders:[],
    totalamount:0
  },
  reducers: {
    loadAllCartProducts:(state,action)=>{
      state.loadAllCartProducts=[]
      state.loadAllCartProducts.push(action.payload)
    },
    loadAllProducts:(state,action)=>{
      state.loadAllProducts=[]
      state.loadAllProducts.push(action.payload)
    },
    loadAllCategories:(state,action)=>{
      state.loadAllCategories = []
      state.loadAllCategories.push(action.payload)
    },
    loadAllAddresses:(state,action)=>{
      state.loadAllAddresses = []
      state.loadAllAddresses.push(action.payload)
    },
    loadAllOrders:(state,action)=>{
      state.loadAllOrders=[]
      state.loadAllOrders.push(action.payload)
    }
  },
});

// export function getAllCategories(){
//   const token = localStorage.getItem('token')
//   const user = localStorage.getItem('user')

//   return ((dispatch)=>{
//     fetch('http://localhost:')
//   })
// }

export function getAllCartProducts(){
  
  const token = window.localStorage.getItem('token')
  const user = window.localStorage.getItem('user')

  console.log("I am user in getallproducts::",user)

  return(dispatch)=>{
    fetch('http://localhost:3700/allcartitems',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(loadAllCartProducts(data)))
    .catch((err)=>{console.log(err)})
  }
}

//Add To cart

export function addToCart(id){
  const token = window.localStorage.getItem('token')
  const user = window.localStorage.getItem('user')

  console.log("I am user",user)

  return(dispatch)=>{
    fetch(`http://localhost:3700/addtocart/${id}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>dispatch(getAllCartProducts()))
    .catch((err)=>console.log("addtocartErr",err))
  }
}

export function decQuantity(id){
  const token = window.localStorage.getItem('token');
  const user = window.localStorage.getItem('user');
  return(dispatch)=>{
    fetch(`http://localhost:3700/decquantity/${id}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>dispatch(getAllCartProducts()))
  }
}

export function incQuantity(id){
  const token = window.localStorage.getItem('token');
  const user = window.localStorage.getItem('user');
  return(dispatch)=>{
    fetch(`http://localhost:3700/incquantity/${id}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>dispatch(getAllCartProducts()))
  }
}

export function addAddresses(newAdd){
  const token = window.localStorage.getItem('token');
  const user = window.localStorage.getItem('user')

  return (dispatch)=>{
    fetch('http://localhost:3700/addaddress',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      },
      body:JSON.stringify(newAdd)
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(getAllAddresses()))
    .catch((err)=>console.log(err))
  }
}

export function removeAddress(id){
  const token = window.localStorage.getItem('token');
  const user = window.localStorage.getItem('user')

  return (dispatch)=>{
    fetch(`http://localhost:3700/removeaddress/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((data)=>dispatch(getAllAddresses()))
    .catch((err)=>console.log(err))
  }
}

export function getAllAddresses(){
  const token = window.localStorage.getItem('token');
  const user = window.localStorage.getItem('user')
  return (dispatch)=>{
    fetch('http://localhost:3700/alladdresses',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(loadAllAddresses(data)))
    .catch((err)=>console.log(err))
  }
}

export function getAllOrders(){
  const token = window.localStorage.getItem('token')
  const user = window.localStorage.getItem('user')

  return(dispatch)=>{
    fetch('http://localhost:3700/allorders',{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'token':token,
      'user':user
    }
  })
  .then((res)=>res.json())
  .then((data)=>{console.log("I am All OrderrsData;::",data);dispatch(loadAllOrders(data))})
  .catch((err)=>console.log(err))
  }
}

export function placeAllOrders(products,address){
  const ord = {products,address}
  const token = window.localStorage.getItem('token')
  const user = window.localStorage.getItem('user')

  return (dispatch)=>{
    fetch('http://localhost:3700/placeallorders',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
          'token':token,
          'user':user

      },
      body:JSON.stringify(ord)
    }).then((res)=>res.json())
    .then((data)=>dispatch(getAllOrders()),dispatch(getAllCartProducts()))
    .catch((err)=>console.log())
  }
}

export const {loadAllCartProducts,loadAllProducts,loadAllCategories,loadAllAddresses,loadAllOrders} = userSlice.actions;
export default userSlice.reducer;
