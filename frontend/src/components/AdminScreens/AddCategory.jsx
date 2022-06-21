import React,{useRef} from "react";
import { useFormik, validateYupSchema } from "formik";
import * as yup from 'yup'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import { addCategory } from "../../store/adminSlice";



export default function AddCategory(){

    const dispatch = useDispatch();

    const catValidation = yup.object().shape({
        category:yup.string()
        .required("Category Required")
        .min(4,"Min Length 4")
    })

    const formik = useFormik({
        initialValues:{
            category:''
        },
        validationSchema:catValidation,
        onSubmit:(values)=>{
            const newCategory = {
                category:values.category
            }

            dispatch(addCategory(newCategory))
        }
    })

    var catRef = useRef();

    function printing(values){
        console.log(values);
    }

    return(
        <div className="loginGlobalDiv">
            <h1>Add New Category</h1>

            <Button><Link to='/admin/home'>Go To Home</Link></Button>

            <form onSubmit={formik.handleSubmit}>
                <input type="text" className="formInput" placeholder="Enter Category" name = "category" {...formik.getFieldProps('category')} required ref={catRef} />
                {formik.touched.category&&formik.errors.category?<div className="errors">{formik.errors.category}</div>:null}

                <br/>

                <Button type="submit">Add Category</Button>

            </form>
        </div>
    )
}