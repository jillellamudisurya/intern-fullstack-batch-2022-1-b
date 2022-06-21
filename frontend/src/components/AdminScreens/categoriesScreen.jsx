import React from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../store/adminSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import './AdminScreen.css'

export default function CategoriesScreen(){

    const allCategories = useSelector((state)=>state.admin.totalCategories[0])
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllCategories())
    },[])
    console.log("Categs::",allCategories);
    return(
        <div className="loginGlobalDiv">
            <h1>Displaying All Categories</h1>

            <Button><Link to='/admin/home'>Go To Home</Link></Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button><Link to="/admin/addCategory">Add Category</Link></Button>
            <br/>
            <br/>
            {allCategories&&allCategories.map((ec,i)=>(
                   <Card key={i} className="driverCard">
                       <Card.Header className="cardHeader">Category ID: {ec.id}</Card.Header>
                       <Card.Body>
                           <Card.Title>{(ec.category).toUpperCase()}</Card.Title>
                       </Card.Body>
                   </Card>
                ))}
        </div>
    )
}