import React from 'react';
import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUploadComponent from './components/FileUploadComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className='container'>
          <Routes>
            <Route path="/" element={<ListEmployeeComponent />}/>
            <Route path="/employees" element={<ListEmployeeComponent />} />
            <Route path="/add-employee/:empNo" element={<CreateEmployeeComponent />} />
            <Route path="/employee/:empNo" element={<ViewEmployeeComponent />} />
            <Route path='/upload' element={<FileUploadComponent />}/>
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
