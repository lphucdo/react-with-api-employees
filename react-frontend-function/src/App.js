import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import AddEmployee from './components/AddEmployee';
import ViewEmployee from './components/ViewEmployee';
import EditEmployee from './components/EditEmployee';

import axios from 'axios';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<ViewEmployee />}/>
          <Route path='/employees' element={<ViewEmployee />}/>
          <Route path='/add-employee' element={<AddEmployee />}/>
          <Route path='/edit-employee/:empNo' element={<EditEmployee />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<SignUpPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
