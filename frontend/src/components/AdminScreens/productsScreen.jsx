import React from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../store/adminSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import './AdminScreen.css'

export default function ProductsScreen(){

    const allProducts = useSelector((state)=>state.admin.totalProducts[0])
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllProducts())
    },[])
    console.log("Prods::",allProducts);
    return(
        <div>
            <h1>Displaying All Products</h1>

            <Link to="/admin/addProduct">Add Product</Link>

            <br/>
            {allProducts&&allProducts.map((ep,i)=>(
                   <Card key={i} className="driverCard">
                       <Card.Header>Product ID: {ep.id}</Card.Header>
                       <Card.Body>
                           <Card.Title>Name: {ep.product_name}</Card.Title>
                       </Card.Body>
                   </Card>
                ))}

                <br/>

                <Link to='/admin/home'>Go To Home</Link>
            
        </div>
    )
}