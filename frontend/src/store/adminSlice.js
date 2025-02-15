import {createSlice} from '@reduxjs/toolkit';

export const adminSlice = createSlice({
    name:'admin',
    initialState:{
        totalDrivers:[],
        totalCategories:[],
        totalProducts:[],
        totalUsers : [],
        allOrders:[]
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
        },
        loadUsers:(state,action)=>{
            state.totalUsers=[];
            state.totalUsers.push(action.payload);
        },
        loadAllOrders:(state,action)=>{
            state.allOrders=[]
            state.allOrders.push(action.payload)
        }
    }
});

export function getDriverData(){
    return ((dispatch)=>{
      fetch('https://ecommerce-postgres-backend.herokuapp.com/getDrivers')
      .then((res)=>res.json())
      .then((data)=>{
        dispatch(loadDrivers(data))
      }).catch((err)=>console.log("Err::",err))
    })
  }

  export  function getAllCategories(){
      return((dispatch)=>{
          fetch("https://ecommerce-postgres-backend.herokuapp.com/getCategories")
          .then((res)=>res.json())
          .then((data)=>{
              dispatch(loadCategories(data))
          })
      })
  }

  export function getAllProducts(){
      return((dispatch)=>{
          fetch("https://ecommerce-postgres-backend.herokuapp.com/getProducts")
          .then((res)=>res.json())
          .then((data)=>{
              dispatch(loadProducts(data))
          })
      })
  }

  export function getAllUsers(){
      return((dispatch)=>{
        fetch("https://ecommerce-postgres-backend.herokuapp.com/allusers")
        .then((res)=>res.json())
        .then((data)=>{
            dispatch(loadUsers(data))
        })
      })
  }

  export function getAllOrders(){
    const token = window.localStorage.getItem('token');
    const user = window.localStorage.getItem('user');
    return(dispatch)=>{
      console.log("I am working");
      fetch('https://ecommerce-postgres-backend.herokuapp.com/alladminorders',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'token':token,
          'user':user
        }
      })
      .then((res)=>res.json())
      .then((data)=>{console.log("Admin Ayya::",data);dispatch(loadAllOrders(data))})
      .catch((err)=>console.log(err))
    }
  }

  export function addCategory(newCategory){
      return((dispatch)=>{
        fetch("https://ecommerce-postgres-backend.herokuapp.com/addCategory",{
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
        fetch("https://ecommerce-postgres-backend.herokuapp.com/addProduct",{
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

  export function productEnable(prod){
      return((dispatch)=>{
          const token = localStorage.getItem('token');
          const user = localStorage.getItem('user')

          console.log("id::",prod.id)

          fetch(`https://ecommerce-postgres-backend.herokuapp.com/enableproduct/${prod.id}`,{
              method:'PUT',
              headers:{
                  'Content-Type':'application/json',
                  'token':token,
                  'user':user
              }
          })
          .then((res)=>res.json())
          .then((data)=>dispatch(getAllProducts()))
          .catch((err)=>console.log("ProductAvai Err:",err))
      }
  )}
  export function productDisable(prod){
    return((dispatch)=>{
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user')

        fetch(`https://ecommerce-postgres-backend.herokuapp.com/disableproduct/${prod.id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'token':token,
                'user':user
            }
        })
        .then((res)=>res.json())
        .then((data)=>dispatch(getAllProducts()))
        .catch((err)=>console.log("ProductAvai Err:",err))
    }
)}

export function orderAccept(id){
    return(dispatch)=>{
        const token = window.localStorage.getItem('token');
        const user = window.localStorage.getItem('user');

        fetch(`https://ecommerce-postgres-backend.herokuapp.com/orderaccept/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'token':token,
                'user':user
            }
        })
        .then((res)=>res.json())
        .then((data)=>dispatch(getAllOrders()))
        .catch((err)=>console.log(err))
    }
}

export function orderReject(id){
    return(dispatch)=>{
        const token = window.localStorage.getItem('token');
        const user = window.localStorage.getItem('user');

        fetch(`https://ecommerce-postgres-backend.herokuapp.com/orderreject/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'token':token,
                'user':user
            }
        })
        .then((res)=>res.json())
        .then((data)=>dispatch(getAllOrders()))
        .catch((err)=>console.log(err))
    }
}

export const {loadDrivers,loadCategories,loadProducts,loadUsers,loadAllOrders}  = adminSlice.actions;
export default adminSlice.reducer;