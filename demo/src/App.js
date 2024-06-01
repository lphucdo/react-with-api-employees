import React from 'react';
import './App.css';
import RouteApp from './RouteApp';
import {
  BrowserRouter as Router,

} from 'react-router-dom';
function App() {
  return(
    <div>
      <Router>
        <RouteApp />
      </Router>
    </div>
  )
}
export default App;
