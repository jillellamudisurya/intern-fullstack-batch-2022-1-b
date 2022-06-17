import {createSlice} from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
    name:'authentication',
    initialState:{
        users:[],
        tokenlog:null,
        loggeduser:{}
    },
    reducers:{
        loadusers:(state,action)=>{
            state.users=[]
            state.users.push(action.payload);
        },
        loadtoken:(state,action)=>{
            state.tokenlog = action.payload;
        },
        loggeduser:(state,action)=>{
            state.loggeduser = action.payload;
        },
        logout:(state,action)=>{
            state.loggeduser='';
            state.tokenlog=null
        }
    }
});

export function getData(){
    return((dispatch)=>{
        fetch('http://localhost:3700/allusers')
        .then((res)=>res.json())
        .then((data)=>dispatch(loadusers(data[0])))
    })
}

export function loginUser(loguser){
    return(dispatch)=>{
        fetch("http://localhost:3700/loginauthentication",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(loguser)
        })
        .then((res)=>{
            if(res.status===200){
                res.json()
                .then((data)=>{
                    if(data.user.role_id===1){
                        alert("Login Success as Admin")
                        localStorage.setItem('token',data.token)
                        localStorage.setItem('user',JSON.stringify(data.user))
                        dispatch(loadtoken(data.token))
                        dispatch(loggeduser(data.user))
                        window.location.href='/admin/home'
                    }
                    if(data.user.role_id===2){
                        alert("Login Success as Driver")
                        localStorage.setItem('token',data.token)
                        localStorage.setItem('user',JSON.stringify(data.user))
                        dispatch(loadtoken(data.token))
                        dispatch(loggeduser(data.user))
                        window.location.href='/driver/home'
                    }
                    if(data.user.role_id===3){
                        alert("Login Success as User")
                        localStorage.setItem('token',data.token)
                        localStorage.setItem('user',JSON.stringify(data.user))
                        dispatch(loadtoken(data.token))
                        dispatch(loggeduser(data.user))
                        window.location.href='/user/home'
                    }
                })
            }
            if(res.status===405){
                alert('password not match')
            }
            if(res.status===410){
                alert('user not found')
                window.location.reload()
            }
            if(res.status===500){
                alert('Internal Server Error')
            }
        })
    }
}

export function registerUser(newuser){
    return(dispatch)=>{
        fetch("http://localhost:3700/registeruser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newuser)
        })
        .then((res)=>{
            if(res.status===200){
                dispatch(getData());
                alert("Registered Succesfully")
                window.location.href='/login'
            }
            if(res.status===400){
                alert('User Already Exist')
                window.location.reload()
            }
            if(res.status===500){
                alert("Internal Server Error")
                window.location.reload()
            }
        })
    }
}

export function addDriver(newUser){
    return (dispatch)=>{

        fetch("http://localhost:3700/addDriver",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newUser)
        })
        .then((res)=>{
            if(res.status===200){
                dispatch(getData());
                alert("Driver Registered Succesfully")
                // window.location.href='/login'
                window.location.reload();
            }
            if(res.status===400){
                alert('Driver Already Exist')
                window.location.reload()
            }
            if(res.status===500){
                alert("Internal Server Error")
                window.location.reload()
            }
        })

    }
}

export function logoutUser(){
    return(dispatch)=>{
        dispatch(logout)
    }
}

export const {loadusers,loadtoken,loggeduser,logout} = authenticationSlice.actions;
export default authenticationSlice.reducer;