import React from "react";
import { Link } from "react-router-dom";
import { getAllProducts,productEnable,productDisable} from "../../store/adminSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import productimg from '../../product.jpg';
export default function ProductsScreen(){

    const allProducts = useSelector((state)=>state.admin.totalProducts[0])
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllProducts())
    },[])
    console.log("Prods::",allProducts);

    function handleProductStatus(prod){
        console.log("HandleProd::",prod)
        if(prod.available_status==true){
            dispatch(productDisable(prod))
        }
        else{
            dispatch(productEnable(prod))
        }
    }

    return(
        <div className="loginGlobalDiv">
            <h1 >Displaying All Products</h1>

            <Link to="/admin/addProduct">Add Product</Link>

            <br/>
            <Container className='p-4'>
                <Row>
                    {allProducts&&allProducts.map((ep,i)=>(
                        <Card key={i} style={{width:"20%",margin:'10px',display:'inline-block'}}>
                            <Card.Header><b>{ep.product_name}</b></Card.Header>
                            <Card.Body>
                                <center>
                                    <Card.Text>
                                        <img src={productimg} style={{height:"100px",width:"100px"}} />
                                        <br/>
                                        <b>{ep.price}Rs/-</b>
                                        <br/>
                                        <Button onClick={()=>{handleProductStatus(ep)}}>{ep.available_status?"Disable Product":"Enable Product"}</Button>
                                    </Card.Text>
                                </center>
                            </Card.Body>
                        </Card>
                        ))}
                </Row>
                
            </Container>

                <br/>

                <Link to='/admin/home'>Go To Home</Link>
            
        </div>
    )
}