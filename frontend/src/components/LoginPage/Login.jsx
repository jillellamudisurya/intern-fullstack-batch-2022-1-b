import React,{useRef,useEffect} from "react";
import {Link} from 'react-router-dom';
import {useFormik} from 'formik';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { useDispatch,useSelector } from 'react-redux';
import {loginUser} from '../../store/authenticationSlice'

import './Login.css'

YupPassword(yup);


export default function Login(){

    var emailRef = useRef();
    var passwordRef = useRef();

    //Yup Validations
    const credentialsValidation = yup.object().shape({
        email:yup.string()
        .required('Email Required')
        .email('Invalid Email'),

        password:yup.string()
        .required('Password Required')
        .min(5,'Minimum Lenght:5')
        .max(15,'Maximum Lenght:15')
    })


    //Dispatch
    const dispatch = useDispatch();

    var formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        
        validationSchema:credentialsValidation,

        onSubmit:(values)=>{
            dispatch(loginUser(values))
        }
    })

    // function loginuser(values){
    //     console.log("Hey Bruh!!!",values);
    // }

    


    return (
        <div className="loginGlobalDiv">
            <h1 className="heading">Ecommerce Application</h1>
        <div className="loginFormDiv">
            <h2>LOGIN</h2>
            <form onSubmit={formik.handleSubmit}>
                <input type="text" placeholder="Enter email" className="formInput" name="email" {...formik.getFieldProps('email')}  required ref={emailRef}/>
                {formik.touched.email && formik.errors.email ? <div className="errors">{formik.errors.email}</div>:null}
                <br/>
                <input type="password" placeholder="Password" name="password" className="formInput" {...formik.getFieldProps('password')}  required ref={passwordRef}/>
                {formik.touched.password && formik.errors.password ? <div className="errors">{formik.errors.password}</div>:null}

                <br/>
                <button type="submit" className="btn">Login</button>

                <div className="toggleLogin">
                    New User, <Link to='/register'>Register</Link> Here
                </div>
            </form>
        </div>
        </div>
    )
}