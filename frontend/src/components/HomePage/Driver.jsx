import React, { useEffect } from "react";
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'; 
import { getTotalOrders, selectedOrder } from "../../store/driverSlice";
import { logoutUser } from "../../store/authenticationSlice";
import './Driver.css'
import { Link } from "react-router-dom";

export default function Driver(){

    const [isSelected,setisSelected]=React.useState(false)
    const[proDisplay,setproDisplay]=React.useState(0)

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

    function handleSelect(id){
        // setisSelected(!isSelected);
        dispatch(selectedOrder(id))
        alert("Order Picked Succesfully")
    }

    return(
        <div className="loginGlobalDiv">
            <Button onClick={handleLogout}>Logout</Button>
            <h1>Customer Orders</h1>
            <b>Click to See The Orders Selected By You: </b><Button><Link to="/driver/selectedorders">Selected Orders</Link></Button>
            <Container>
                <Row>
                    <div >
                    {allOrders&&allOrders.map((order,i)=>(
                        <Card key={i} className="driverCard" style={{width:"20%",margin:'10px',display:'inline-block'}}>
                            <Card.Header className="cardHeader"><b><center>Order {i+1}</center></b></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                <h4><span onClick={()=>{proDisplay==0?setproDisplay(1):setproDisplay(0)}}>Products:: {order.products.length}</span></h4>
                                    <div className={proDisplay==1?'display':'hide'}>
                                        <ol> 
                                            {
                                                order.products.map((eachProduct,i)=>{
                                                    return(
                                                        <li>
                                                            name:<b>{eachProduct.name}</b>
                                                            <br/>
                                                            price:<b>{eachProduct.price}</b>
                                                            <br/>
                                                            qunatity:<b>{eachProduct.quantity}</b>
                                                        </li>
                                                        
                                                    )
                                                })
                                            }
                                        </ol>
                                    </div>
                                    <br/>
                                    <i>Ordered User: </i><b>{order.customer}</b>
                                    <br/>
                                    <i>Order Amount: </i><b>{order.amount} Rs/-</b>
                                    <br/>
                                    <i>Address: </i><b>{order.address.address}</b>
                                    <center><Button onClick={()=>{handleSelect(order.id)}}>Select Order</Button></center>
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