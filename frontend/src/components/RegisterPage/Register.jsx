import React,{useRef,useEffect}from 'react'
import { Link } from 'react-router-dom';
import {useFormik} from 'formik'
import * as yup from 'yup'
import YupPassword from 'yup-password'
import {getData,registerUser} from '../../store/authenticationSlice';
import {useSelector,useDispatch} from 'react-redux';
import '../LoginPage/Login.css'


YupPassword(yup);


export default function Register(){

    const dispatch = useDispatch();

    const emails = [];

    const users = useSelector((state)=>state.authentic.users);


    users.map((user)=>{
        emails.push(user.email)
    })

    var usernameRef = useRef();
    var emailRef = useRef();
    var phonenumberRef = useRef();
    var passwordRef = useRef();
    var cpasswordRef = useRef();

    useEffect(()=>{
        dispatch(getData())
    },[])

    const credentialsValidation = yup.object().shape({
        username:yup.string()
        .required('Username Required')
        .min(5,'Minimum Length 5')
        .max(12,'Maximum Length 12'),

        email:yup.string()
        .required('Email Required')
        .email('Invalid Email')
        .notOneOf(emails,'Email Already Registered'),

        password:yup.string()
        .required('Password Required')
        .min(5,'Minimum 5 atleast 1 capital')
        .max(15,'Maximum 15')
        .minUppercase(1,'1 Capital Letter'),

        confirmpassword:yup.string()
        .required(' Confirm Password Required')
        .oneOf([yup.ref('password'),null],'password and confirm passwords is not same'),

        phonenumber:yup.string()
        .required('phone number rrequired')
        .min(10,'Not a Valid Phone number')
        .max(10,'Not a Valid Phone number')
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,'Not a valid phonne number'),

    })

    const formik = useFormik({
        initialValues:{
            username:'',
            email:'',
            phonenumber:'',
            password:'',
            confirmpassword:''
        },
        validationSchema:credentialsValidation,
        onSubmit:(values)=>{
            const newUser = {
                name:values.username,
                email:values.email,
                phonenumber:values.phonenumber,
                password:values.password,
                role_id:3
            }

            dispatch(registerUser(newUser))
        }
    })

    // function registerUser(values){
    //     console.log("Hey Register",values);
    // }

    return(
        <div className='loginGlobalDiv'>
            <h1 className='heading'>Ecommerce Application</h1>
        <div className='loginFormDiv'>
            <h2>REGISTER</h2>
            <form onSubmit={formik.handleSubmit}>
            <input type="text"  placeholder="Enter Username" className="formInput" {...formik.getFieldProps('username')} required ref={usernameRef}/>    
            {formik.touched.username&&formik.errors.username?<div className="errors">{formik.errors.username}</div>:null}
            <br/>
                
            <input type="email"  placeholder="Enter Mail" className="formInput" {...formik.getFieldProps('email')} required ref={emailRef}/>  
            {formik.touched.email&&formik.errors.email?<div className="errors">{formik.errors.email}</div>:null}
            <br/>
                
            <input type="number"   placeholder="Enter Phone Numer" className="formInput" {...formik.getFieldProps('phonenumber')} required ref={phonenumberRef}/>  
            {formik.touched.phonenumber&&formik.errors.phonenumber?<div className="errors">{formik.errors.phonenumber}</div>:null}
            <br/>

            <input type="password"    placeholder="Password" className="formInput" {...formik.getFieldProps('password')} ref={passwordRef}/>  
            {formik.touched.password&&formik.errors.password?<div className="errors">{formik.errors.password}</div>:null}
            <br/>

            <input type="password"   placeholder="Confirm  Password" className="formInput" {...formik.getFieldProps('confirmpassword')} required ref={cpasswordRef} />  
            {formik.touched.confirmpassword&&formik.errors.confirmpassword?<div className="errors">{formik.errors.confirmpassword}</div>:null}
            <br/>

            <button type='submit' className='btn'>Register</button>

            <div className='toggleLogin'>
                Existing User, <Link to='/login'>Login</Link> Here
            </div>
            </form>
        </div>
        </div>
    )
}