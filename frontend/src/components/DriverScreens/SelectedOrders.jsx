import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { getSelectedOrders, selectedOrder,deliveredOrder} from "../../store/driverSlice";
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";


export default function SelectedOrders(){
    const dispatch = useDispatch();

    const selectedOrders = useSelector((state)=>state.driver.selectedOrders[0])
    const[proDisplay,setproDisplay]=React.useState(0)

    useEffect(()=>{
        dispatch(getSelectedOrders())
    },[dispatch])

    console.log("I am Selected Orders::",selectedOrders)

    function handleDelivered(id){
        dispatch(deliveredOrder(id))
        alert("Delivery Done")
        window.location.href="/driver/home"
    }

    return(
        <div className="loginGlobalDiv">
            <Button><Link to="/driver/home">Go To Home</Link></Button>
            <h1>Selected Orders</h1>
            <Container>
                {selectedOrders&&selectedOrders.map((selectedOrder,i)=>{
                    if(selectedOrder.delivered_status==false){
                        return(
                            <Card key={i} className="driverCard" style={{width:"20%",margin:'10px',display:'inline-block'}}>
                            <Card.Header className="cardHeader"><b><center>Order {i+1}</center></b></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                <h4><span onClick={()=>{proDisplay==0?setproDisplay(1):setproDisplay(0)}}>Products:: {selectedOrder.products.length}</span></h4>
                                    <div className={proDisplay==1?'display':'hide'}>
                                        <ol> 
                                            {
                                                selectedOrder.products.map((eachProduct,i)=>{
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
                                    <i>Ordered User: </i><b>{selectedOrder.customer}</b>
                                    <br/>
                                    <i>Order Amount: </i><b>{selectedOrder.amount} Rs/-</b>
                                    <br/>
                                    <i>Address: </i><b>{selectedOrder.address.address}</b>
                                    <Button onClick={()=>{handleDelivered(selectedOrder.id)}}>Delivery Done</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        )
                    }
                })}
            </Container>
            

        </div>
    )
}