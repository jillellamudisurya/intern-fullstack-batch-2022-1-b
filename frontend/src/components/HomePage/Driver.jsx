import React, { useEffect } from "react";
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'; 
import productimg from '../../product.jpg';
import { getTotalOrders } from "../../store/driverSlice";
import { logoutUser } from "../../store/authenticationSlice";
import './Driver.css'

export default function Driver(){

    const dispatch = useDispatch()

    const loggedUser = useSelector(state=>state.authentic.loggedUser)
    const localUser = JSON.parse(localStorage.getItem('user'))

    const allOrders = useSelector((state)=>state.driver.totalOrders[0])

    useEffect(()=>{
        dispatch(getTotalOrders())
    },[dispatch])

    function handleLogout(){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        dispatch(logoutUser)
        window.location.href ='/'
    }

    return(
        <div className="loginGlobalDiv">
            <button onClick={handleLogout}>Logout</button>
            <h1>Ordres Ordered By Customers</h1>

            <Container>
                <Row>
                    <div >
                    {allOrders&&allOrders.map((order,i)=>(
                        <Card key={i} className="cardbg" style={{width:"20%",margin:'10px',display:'inline-block'}}>
                            <Card.Header><b><center>Order {i+1}</center></b></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <div>
                                        <ol>
                                            {
                                                order.products.map((eachProduct,i)=>{
                                                    return(
                                                        <li>
                                                            name:<b>{eachProduct.name}</b>
                                                            <br/>
                                                            qunatity:<b>{eachProduct.quantity}</b>
                                                        </li>
                                                        
                                                    )
                                                })
                                            }
                                        </ol>
                                    </div>
                                    <br/>
                                    Ordered User: <b>{order.customer}</b>
                                    <br/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                    </div>
                    
                </Row>
            </Container>

        </div>
    )
}