import React from 'react';
import { Link } from 'react-router-dom';
import { getAllCartProducts,decQuantity,incQuantity } from '../../store/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productimg from '../../product.jpg';
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';


export default function Cart(){

    const cartProducts = useSelector((state)=>state.user.loadAllCartProducts[0]);
    var payment = 0;

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllCartProducts())
    },[dispatch])

    console.log("cartProducts",cartProducts)

    function handleDecQuantity(id){
        dispatch(decQuantity(id))
    }
    function handleIncQuantity(id){
        dispatch(incQuantity(id))
    }

    return(
        <div>
            <h1>Cart</h1>
            <Link to="/user/home">Go To Home</Link>
            <Container>
                <Row>
                    {cartProducts&&cartProducts.map((eachcart,i)=>(
                        <Card key={i} style={{width:"20%",margin:'10px',display:'inline-block'}}>
                            <Card.Header><b><center>{eachcart.product.product_name}</center></b></Card.Header>
                            <Card.Body>
                                <center>
                                    <Card.Text>
                                        <img src={productimg} alt="ImageHere" style={{height:"100px",width:"100px"}}/>
                                        <br/>
                                        Price: <b>{eachcart.product.price}</b>
                                        <br/>
                                        <br/>
                                        Quantitiy:
                                        <button onClick={()=>handleDecQuantity(eachcart.id)}>-</button>
                                        <b>{eachcart.quantity}</b>
                                        <button onClick={()=>handleIncQuantity(eachcart.id)}>+</button>
                                        <br/>
                                        Payment: <b>{eachcart.product.price*eachcart.quantity}</b>
                                    </Card.Text>
                                </center>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
                {/* {cartProducts&&cartProducts.map((eachcart,i)=>{
                    var pricehere =  eachcart.product.price * eachcart.quantity
                }
                payment = payment+pricehere
                )} */}
                <Button><Link to="/user/address">Place Order</Link></Button>
            </Container>
        </div>
    )
}