import React,{useEffect} from "react";
import { getAllOrders } from "../../store/userSlice";
import { useDispatch,useSelector } from "react-redux";
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';


export default function AllOrders(){

    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(getAllOrders())
        console.log("All Orders",allOrders)
        console.log("Type::",typeof(allOrders))
    },[dispatch])

    const allOrders = useSelector((state)=>state.user.loadAllOrders[0])
    

    return(
        <div>
            <h1>I am all orders</h1>
            <Container>
                <Row>
                    {allOrders&&allOrders.map((eachOrder,i)=>(
                        <Card key={i} style={{width:"20%",margin:'10px',display:'inline-block'}}>
                            <Card.Header>{eachOrder.order_status}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <span>products:{eachOrder.products.length}</span>
                                    <div>
                                        <ol>
                                            {
                                                eachOrder.products.map((eachProd)=>{
                                                    return(
                                                        <li>
                                                            name:<b>{eachProd.name}</b><br/>
                                                            price:<b>{eachProd.price}</b><br/>
                                                            quantity:<b>{eachProd.quantity}</b>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ol>
                                    </div>
                                    <br/>
                                    address:<b>{eachOrder.address.address}</b>
                                    <br/>
                                    phonenumber:<b>{eachOrder.phonenumber}</b>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
        </div>
    )
}