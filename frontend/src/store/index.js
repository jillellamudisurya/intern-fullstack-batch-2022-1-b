import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './adminSlice';
import driverReducer from './driverSlice';
import userReducer from './userSlice';
import authenticReducer from './authenticationSlice';


export default configureStore({
    reducer:{
        admin:adminReducer,
        driver:driverReducer,
        user:userReducer,
        authentic:authenticReducer

    }
})