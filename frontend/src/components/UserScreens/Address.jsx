import React,{useEffect, useState} from "react";
import GooglePlacesAutocomplete,{geocodeByAddress,getLatLng} from 'react-google-places-autocomplete';
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addAddresses,getAllAddresses,removeAddress,getAllOrders,placeAllOrders, getAllCartProducts } from "../../store/userSlice";
export default function Address(){

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllAddresses())
        dispatch(getAllOrders())
        dispatch(getAllCartProducts())
    },[dispatch])

    const [addAddress,setaddAddress] = React.useState(null);
    const [latlng, setLatlng] = React.useState(null);
    const [ordAddress,setordAddress]=useState({})
    const [ordering,setOrdering] =useState({})

    const allAddresses = useSelector((state)=>state.user.loadAllAddresses[0])
    const allOrders = useSelector((state)=>state.user.loadAllOrders[0])
    const allCartItems = useSelector((state)=>state.user.loadAllCartProducts[0])



    //Handling
    function handleAddAddress(addAddress){
        setaddAddress(addAddress.label);
        geocodeByAddress(addAddress.label)
        .then((result)=>getLatLng(result[0]))
        .then(({lat,lng})=>{
            setLatlng(JSON.stringify({lat,lng}))
        })

    }

    function addingAddress(){
        const newPath = {
            address:addAddress,
            lanlat:latlng
        }
        setaddAddress(' ')
        dispatch(addAddresses(newPath))
    }

    function handleRemoveAddress(id){
        dispatch(removeAddress(id))
    }

    function handlePlaceAllOrder(address){
        console.log("******************All Cart Items::",allCartItems)
        dispatch(placeAllOrders(allCartItems,address))
        window.location.href='/user/home'
    }

    return(
        <div>
            {/* <Link to="/user/allorders">Click for all orders</Link> */}
            <h2>Select Address For Delivery</h2>
            <div>
                {allAddresses&&allAddresses.map((address,i)=>{
                    return(
                        <div>
                            <input type="radio" name="radio-btn" id={i} value={address.id} onClick={()=>{setordAddress(address)}}/><span>{address.address}</span>{' '}<i onClick={()=>handleRemoveAddress(address.id)} style={{color:'red'}}>remove</i>
                        </div>
                    )
                })}
            </div>
            <br/>
            <br/>
            <br/>
            <h3>Add New Address</h3>
            <br/>
            <br/>
            <div>
                <center>
                <form style={{width:'500px'}}>
                    <GooglePlacesAutocomplete
                    apiKey='AIzaSyAkbV8govh-Rv1ytH3fcewTF_c4hq1nYnw'
                    selectProps={{
                    addAddress,
                    onChange:handleAddAddress,
                    }}
                    value={addAddress}
                    />
                </form>
                </center>
                
                <button onClick={()=>addingAddress()}>Add Address</button>
            </div>
            <br/>
            <center><button onClick={()=>{handlePlaceAllOrder(ordAddress)}}>Place Order</button></center>
        </div>
    )
}