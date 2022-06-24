import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { getSelectedOrders, selectedOrder,deliveredOrder, setRoute, getRoutes} from "../../store/driverSlice";
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";


export default function SelectedOrders(){
    const dispatch = useDispatch();

    const selectedOrders = useSelector((state)=>state.driver.selectedOrders[0])
    const routes = useSelector((state)=>state.driver.routes[0])
    const[proDisplay,setproDisplay]=React.useState(0)
    const[rout,setRout]=React.useState(0)

    console.log("Rout Value",rout)

    useEffect(()=>{
        dispatch(getSelectedOrders())
    },[dispatch])

    console.log("I am Selected Orders::",selectedOrders)

    function handleDelivered(currentAddress,nextAddress,index,length){
        window.location.reload()
        dispatch(deliveredOrder(currentAddress,nextAddress,index,length))
        setRout(1)
        alert("Delivery Done")
        // window.location.href="/driver/home"
    }

    function handleCreateRoute(){
        if(selectedOrders.length===0){
            alert("No Orders, Please Select Orders ");
            window.location.href='/driver/home'
        }
        else if(routes && selectedOrders.length===routes.length){
            alert("Route already Generated")
        }
        else{
            dispatch(setRoute())
        }
    }
    function handleShowRoute(){
        dispatch(getRoutes())

        if(rout===0){
            setRout(1)
        }
        else{
            setRout(0)
        }
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
                                    {/* <Button onClick={()=>{handleDelivered(selectedOrder.id)}}>Delivery Done</Button> */}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        )
                    }
                })}
                
            </Container>
            <Button onClick={()=>{handleCreateRoute()}}>Create Route</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={()=>{handleShowRoute()}}>Show Routes</Button>

                <div className={rout===1?'display':'hide'}>
                    <table border="2px">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Customer Name</th>
                                <th>Phone number</th>
                                <th>Price</th>
                                <th>Address</th>
                                <th>Distance</th>
                                <th colSpan='2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {routes&&routes.map((order,i)=>{
                                return(
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>{order.customer}</td>
                                        <td>{order.phonenumber}</td>
                                        <td>{order.amount} Rs/-</td>
                                        <td>{order.route.address}</td>
                                        <td>{order.route.distance}</td>
                                        <td><button className={order.route.flag===true?'display':'hide'} onClick={()=>{handleDelivered(order,routes[i+1],i,routes.length-1)}}>Delivery</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

        </div>
    )
}