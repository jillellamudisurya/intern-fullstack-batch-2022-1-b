import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../store/userSlice";
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';

export default function PlacedOrders(){

    const dispatch = useDispatch();

    const allOrders = useSelector((state)=>state.user.loadAllOrders[0])
    const[proDisplay,setproDisplay]=React.useState(0)
    var localUser = JSON.parse(window.localStorage.getItem('user'))

    useEffect(()=>{
        dispatch(getAllOrders())
    },[dispatch])

    return(
        <div className="loginGlobalDiv">
            <Button><Link to="/user/home">Go To Home</Link></Button>
            <Container>
                <Row>
                    <div>
                    <h1>Your Orders</h1>
                    {allOrders&&allOrders.map((order,i)=>{
                        console.log("I am Order",order)
                        if(order.user_id===localUser.id){
                            console.log("Hey Guys")
                            return(
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
                                    <br/>
                                    <br/>
                                    <div className="orderStatus">
                                        <i>Order Status: </i><b>{order.order_status}</b>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                            )
                        }
                        
                        })}
                    </div>
                    
                </Row>
            </Container>
        </div>
    )
}