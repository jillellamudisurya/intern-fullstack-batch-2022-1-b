import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import { getAllCategories,getAllProducts } from "../../store/adminSlice";
import { getAllCartProducts,addToCart } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import productimg from '../../product.jpg';
import { logoutUser } from "../../store/authenticationSlice";


export default function User(){

    const [categoryFilter,setCategoryFilter]=useState(null);

    const allCategories = useSelector((state)=>state.admin.totalCategories[0])
    const allProducts = useSelector((state)=>state.admin.totalProducts[0])

    var localUser = JSON.parse(window.localStorage.getItem('user'))

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllCategories());
        dispatch(getAllProducts());
    },[])

    //Handling

    function handleLogout(){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        dispatch(logoutUser);
        window.location.href='/'
    }

    function handleAddCart(id){
        dispatch(addToCart(id))
        alert("Added To Cart");
    }

    function handleOrder(prod){
        const product = {
            id:prod.id,
            price:prod.price,
            qunatity:1
        }
    }

    

    return(
        <div className="loginGlobalDiv">
            <Button onClick={handleLogout}>Logout</Button>
            
            <h1>Hi, {(localUser.name).toUpperCase()}!!! It's Your HomePage</h1>

            <Button><Link to="/user/placedorders">Placed Orders</Link></Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button><Link to="/user/cart">Cart</Link></Button>
            

            {/* Category Display */}
            <Container>
                <Row>
                <br/>
                    <select className="formInput" onChange={(e)=>{setCategoryFilter(parseInt(e.target.value))}}>
                        <option>Select Category</option>
                        {
                            allCategories&&allCategories.map((eachCat)=>{
                                return(
                                    <option value={eachCat.id}>{eachCat.category}</option>
                                )
                            })
                        }
                    </select>

                    <h1>Available Products</h1>
                    {
                        allProducts && allProducts.map((ep,i)=>{
                            if(categoryFilter==null&&ep.available_status==true){
                                console.log("filter",categoryFilter);
                                return(
                                    <Card key={i} style={{width:"20%",margin:'10px',display:'inline-block'}}>
                                    <Card.Header><b>{ep.product_name}</b></Card.Header>
                                    <Card.Body>
                                        <center>
                                            <Card.Text>
                                                <img src={productimg} style={{height:"100px",width:"100px"}} />
                                                <br/>
                                                <b>{ep.price}Rs/-</b>
                                                <br/>
                                                <Button onClick={()=>handleAddCart(ep.id)}>Add To Cart</Button>
                                                {/* <Button onClick={()=>handleOrder(ep)}>Buy Now</Button> */}
                                            </Card.Text>
                                        </center>
                                    </Card.Body>
                                </Card>
                                )
                            }
                        })
                    }
                    {allProducts&&allProducts.filter(prod => prod.category_id==categoryFilter).map((ep,i)=>{
                        console.log("filter",categoryFilter);

                        if(ep.available_status==true){
                            return(
                                <Card key={i} style={{width:"20%",margin:'10px',display:'inline-block'}}>
                                    <Card.Header><b>{ep.product_name}</b></Card.Header>
                                    <Card.Body>
                                        <center>
                                            <Card.Text>
                                                <img src={productimg} style={{height:"100px",width:"100px"}} />
                                                <br/>
                                                <b>{ep.price}Rs/-</b>
                                                <br/>
                                                <Button  onClick={()=>handleAddCart(ep.id)}>Add To Cart</Button>
                                                {/* <Button>Buy Now</Button> */}
                                            </Card.Text>
                                        </center>
                                    </Card.Body>
                                </Card>
                            )
                            
                        }
                        
                    })}

                    
                    <h1>Products Out Of Stock</h1>
                    {
                        allProducts && allProducts.map((ep,i)=>{
                            if(categoryFilter==null&&ep.available_status==false){
                                console.log("filter",categoryFilter);
                                return(
                                    <Card key={i} style={{width:"20%",margin:'10px',display:'inline-block'}}>
                                    <Card.Header><b>{ep.product_name}</b></Card.Header>
                                    <Card.Body>
                                        <center>
                                            <Card.Text>
                                                <img src={productimg} style={{height:"100px",width:"100px"}} />
                                                <br/>
                                                <b>{ep.price}Rs/-</b>
                                                <br/>
                                                {/* <Button>Add To Cart</Button>
                                                <Button>Buy Now</Button> */}
                                            </Card.Text>
                                        </center>
                                    </Card.Body>
                                </Card>
                                )
                            }
                        })
                    }
                    {allProducts&&allProducts.filter(prod => prod.category_id==categoryFilter).map((ep,i)=>{
                        console.log("filter",categoryFilter);

                        if(ep.available_status==false){
                            return(
                                <Card key={i} style={{width:"20%",margin:'10px',display:'inline-block'}}>
                                    <Card.Header><b>{ep.product_name}</b></Card.Header>
                                    <Card.Body>
                                        <center>
                                            <Card.Text>
                                                <img src={productimg} style={{height:"100px",width:"100px"}} />
                                                <br/>
                                                <b>{ep.price}Rs/-</b>
                                                <br/>
                                                {/* <Button>Add To Cart</Button>
                                                <Button>Buy Now</Button> */}
                                            </Card.Text>
                                        </center>
                                    </Card.Body>
                                </Card>
                            )
                            
                        }
                        
                    })}
                </Row>
            </Container>
        </div>
    )
}