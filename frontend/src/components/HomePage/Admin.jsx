import React from "react";
import './Admin.css'
import { Link } from "react-router-dom";
import { logout } from "../../store/authenticationSlice";


export default function Admin(){
    return(
        <div className="loginGlobalDiv">
        <div>
            <h1>This is Admins Home Page</h1>
            <Link to='/login'>Logout</Link>
            <div className="combineDiv">
                
                <div className="products">
                    <h3>PRODUCTS</h3>
                    <Link to='/admin/productsScreen'>Click Here</Link>
                </div>
                

                <div className="drivers">
                    <h3>DRIVERS</h3>
                    <Link to='/admin/driverScreen'>Click Here</Link>
                </div>

                <div className="categories">
                    <h3>CATEGORIES</h3>
                    <Link to='/admin/categoriesScreen'>Click Here</Link>
                </div>
            </div>

           
            

            {/* <Link to="/admin/addCategory">Add Category</Link>
            <br/>
            <Link to="/admin/addDriver">Add Driver</Link>
            <br/>
            <Link to="/admin/addProduct">Add Product</Link>
            <br/>
            <Link to='/login'>Logout</Link> */}
        </div>
        </div>
    )
}