import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import AddEmployee from './components/AddEmployee';
import ViewEmployee from './components/ViewEmployee';
import EditEmployee from './components/EditEmployee';

import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/employees' element={<ViewEmployee />}/>
          <Route path='/add-employee' element={<AddEmployee />}/>
          <Route path='/edit-employee/:empNo' element={<EditEmployee />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
