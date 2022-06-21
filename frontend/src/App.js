import './App.css';
import {BrowserRouter,Link,Route,Routes} from 'react-router-dom';
import Login from './components/LoginPage/Login';
import Register from './components/RegisterPage/Register';
import Admin from './components/HomePage/Admin';
import Driver from './components/HomePage/Driver';
import User from './components/HomePage/User';

import AddProduct from './components/AdminScreens/AddProduct';
import AddCategory from './components/AdminScreens/AddCategory';
import AddDriver from './components/AdminScreens/AddDriver';
import AllOrders from './components/AdminScreens/AllOrders';


import DriverScreen from './components/AdminScreens/driverScreen';
import CategoriesScreen from './components/AdminScreens/categoriesScreen';
import ProductsScreen from './components/AdminScreens/productsScreen';
import Cart from './components/UserScreens/cart';
import Address from './components/UserScreens/Address';
import SelectedOrders from './components/DriverScreens/SelectedOrders';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>

          <Route path='/admin/home' element={<Admin/>}/>
          <Route path='/driver/home' element={<Driver/>}/>
          <Route path='/user/home' element={<User/>}/>

          {/* Admin Screens */}

          <Route path='/admin/addProduct' element={<AddProduct/>}/>
          <Route path='/admin/addCategory' element={<AddCategory/>}/>
          <Route path='/admin/addDriver' element={<AddDriver/>}/>

          <Route path='/admin/productsScreen' element={<ProductsScreen/>}/>
          <Route path='/admin/categoriesScreen' element={<CategoriesScreen/>}/>
          <Route path='/admin/driverScreen' element={<DriverScreen/>}/>

          <Route path="/admin/allorders" element={<AllOrders/>}/>

          {/* User Screens */}

          <Route path='/user/cart' element={<Cart/>}/>
          <Route path='/user/address' element={<Address/>}/>
          {/* <Route path='/user/allorders' element={<AllOrders/>}/> */}

          {/* Driver Screens */}
          <Route path="/driver/selectedorders" element={<SelectedOrders/>}/>
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
