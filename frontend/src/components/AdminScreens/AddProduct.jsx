import React,{useRef,useEffect} from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { addProduct,getAllCategories} from "../../store/adminSlice";


export default function AddProduct(){

    const allCategories = useSelector((state)=>state.admin.totalCategories[0]);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllCategories())
    },[])

    const productValidation = yup.object().shape({
        product_name:yup.string()
        .required("Product Name")
        .min(4,"Min Length 4"),
        price:yup.string()
        .required("Enter Price")
        .min(2,"Enter >10"),
        image:yup.string()
        .required("Image Required"),
        category_id:yup.string()
        .required("Please Select Category")
    })

    const formik = useFormik({
        initialValues:{
            product_name:'',
            price:'',
            image:'',
            category_id:'',
            avialable_status:true
        },
        validationSchema:productValidation,
        onSubmit:(values)=>{
            const newProduct={
                product_name:values.product_name,
                price:values.price,
                image:values.image,
                category_id:parseInt(values.category_id),
                available_status:true

            }

            console.log("NEw Product",newProduct);
            dispatch(addProduct(newProduct));
        }
    })

    var productRef = useRef();
    var priceRef = useRef();
    var imageRef = useRef();



    return(
        <div>
            <h1>This is Add Product Section</h1>

            <form onSubmit={formik.handleSubmit}>
                <input type="text" placeholder="Product Name" {...formik.getFieldProps('product_name')} ref={productRef} required />
                {formik.touched.product_name&&formik.errors.product_name?<div className="errors">{formik.product_name.errors}</div>:null}
                <br/>
                <input type="number" placeholder="Enter Price" {...formik.getFieldProps('price')} ref={priceRef} required/>
                {formik.touched.price&&formik.errors.price?<div className="errors">{formik.price.errors}</div>:null}
                <br/>
                <input type="text"  placeholder="Image"  {...formik.getFieldProps('image')} required/>
                {formik.touched.image&&formik.errors.image?<div className="errors">{formik.image.errors}</div>:null}

                <br/>
                <select {...formik.getFieldProps('category_id')}>
                    <option>Select Category</option>
                    {
                        allCategories&&allCategories.map((eachCate,i)=>{
                            return(
                                <option value={eachCate.id} key={i}>{eachCate.category}</option>
                            )
                        })
                    }
                </select>

                <br/>
                  
                <button type="submit">Add Product</button>
            </form>

            <div>
                <Link to='/admin/home'>Go To Home</Link>
            </div>

        </div>
    )
}