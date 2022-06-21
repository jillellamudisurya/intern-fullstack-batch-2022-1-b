import React from "react";
import { Link } from "react-router-dom";
import { getDriverData } from "../../store/adminSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import './AdminScreen.css'


export default function DriverScreen(){

    const drivers = useSelector((state)=>state.admin.totalDrivers[0])

    // console.log(typeof(drivers))

    
    // const driversNames = [];

    const dispatch = useDispatch();

   useEffect(()=>{
       dispatch(getDriverData())
   },[dispatch]);

   console.log("D:;",drivers)
   

    return(
        <div className="loginGlobalDiv">
            <Button><Link to="/admin/home">Go To Home</Link></Button>
            <h1>Displaying All Drivers</h1>
            <Button><Link to="/admin/addDriver">Add Driver</Link></Button>
            <div>
                {drivers&&drivers.map((ed,i)=>(
                   <Card key={i} className="driverCard">
                       <Card.Header className="cardHeader">Hey {ed.name}</Card.Header>
                       <Card.Body>
                           <Card.Title>Your ID: {ed.id}</Card.Title>
                           <Card.Text>
                               <i>Mail Id: </i><b>{ed.email}</b>
                               <br/>
                               <i>Phone Number: </i><b>{ed.phonenumber}</b>
                           </Card.Text>
                       </Card.Body>
                   </Card>
                ))}
            </div>
            
        </div>
    )
}