import { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';

function useAuth() {
  var [isLogged, setIsLogged] = useState(EmployeeService.isAuthenticated());
  var [isAdmin, setIsAdmin] = useState(EmployeeService.isAdmin());

  useEffect(() => {
    setIsLogged(EmployeeService.isAuthenticated());
    setIsAdmin(EmployeeService.isAdmin());
    console.log("at line 11: isAdmin: "+isAdmin);
  }, isLogged);

  return {
    isLogged,
    isAdmin,
  };
}

export default useAuth;
