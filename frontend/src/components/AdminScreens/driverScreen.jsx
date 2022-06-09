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
        <div>
            
            <h1>Displaying All Drivers</h1>
            <Link to="/admin/addDriver">Add Driver</Link>
            <div>
                {drivers&&drivers.map((ed,i)=>(
                   <Card key={i} className="driverCard">
                       <Card.Header>Driver ID: {ed.id}</Card.Header>
                       <Card.Body>
                           <Card.Title>{ed.name}</Card.Title>
                           <Card.Text>
                               Mail Id: <b>{ed.email}</b>
                               <br/>
                               Phone Number: <b>{ed.phonenumber}</b>
                           </Card.Text>
                       </Card.Body>
                   </Card>
                ))}
            </div>
            
        </div>
    )
}