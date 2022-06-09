import {createSlice} from '@reduxjs/toolkit';

export const adminSlice = createSlice({
    name:'admin',
    initialState:{
        totalDrivers:[],
        totalCategories:[],
        totalProducts:[]
    },
    reducers:{
        loadDrivers:(state,action)=>{
            state.totalDrivers=[];
            state.totalDrivers.push(action.payload);
          },
        loadCategories:(state,action)=>{
            state.totalCategories=[];
            state.totalCategories.push(action.payload)
        },
        loadProducts:(state,action)=>{
            state.totalProducts = [];
            state.totalProducts.push(action.payload);
        }
    }
});

export function getDriverData(){
    return ((dispatch)=>{
      fetch('http://localhost:2424/getDrivers')
      .then((res)=>res.json())
      .then((data)=>{
        dispatch(loadDrivers(data))
      }).catch((err)=>console.log("Err::",err))
    })
  }

  export  function getAllCategories(){
      return((dispatch)=>{
          fetch("http://localhost:2424/getCategories")
          .then((res)=>res.json())
          .then((data)=>{
              dispatch(loadCategories(data))
          })
      })
  }

  export function getAllProducts(){
      return((dispatch)=>{
          fetch("http://localhost:2424/getProducts")
          .then((res)=>res.json())
          .then((data)=>{
              dispatch(loadProducts(data))
          })
      })
  }

  export function addCategory(newCategory){
      return((dispatch)=>{
        fetch("http://localhost:2424/addCategory",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newCategory)
        })
        .then((res)=>{
            if(res.status===200){
                alert("Category Added Successfully")
                window.location.reload();
            }

            if(res.status===400){
                alert("Category Already Exist")
                window.location.reload();
            }
            if(res.status===500){
                alert("Internal Server Error")
                window.location.reload();
            }
        })
      })
  }

  export function addProduct(newProduct){
    return((dispatch)=>{
        fetch("http://localhost:2424/addProduct",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newProduct)
        })
        .then((res)=>{
            if(res.status===200){
                alert("Product Added Successfully")
                window.location.reload();
            }

            if(res.status===400){
                alert("Product Already Exist")
                window.location.reload();
            }
            if(res.status===500){
                alert("Internal Server Error")
                window.location.reload();
            }
        })
      })
  }

export const {loadDrivers,loadCategories,loadProducts}  = adminSlice.actions;
export default adminSlice.reducer;