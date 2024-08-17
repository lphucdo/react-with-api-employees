import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import AddEmployee from './components/AddEmployee';
import ViewEmployee from './components/ViewEmployee';
import EditEmployee from './components/EditEmployee';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import MyProfile from './components/MyProfile';
import FileUploadComponent from './components/FileUploadComponent';
import ViewProduct from './components/ViewProduct';
import ViewOrder from './components/VIewOrder';
import MyCart from './components/MyCart';
import AddProduct from './components/AddProduct';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<ViewProduct />}/>
          <Route path='/employees' element={<ViewEmployee />}/>
          <Route path='/products' element={<ViewProduct />}/>
          <Route path='/orders' element={<ViewOrder />}/>
          <Route path='/add-employee' element={<AddEmployee />}/>
          <Route path='/add-product' element={<AddProduct />}/>
          <Route path='/edit-employee/:id' element={<EditEmployee />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<SignUpPage />}/>
          <Route path='/profile' element={<MyProfile />}/>
          <Route path='/my-cart' element={<MyCart />}/>
          <Route path='/upload' element={<FileUploadComponent />}/>
          <Route path='/oi' element={<LoginPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
