import React from 'react';
import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className='container'>
          <Switch>
            <Route path="/" exact component={ListEmployeeComponent}/>
            <Route path="/employees" component={ListEmployeeComponent} />
            <Route path="/addEmp" component={CreateEmployeeComponent} />
            <Route path="/employee/:empNo" component={ViewEmployeeComponent} />
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
