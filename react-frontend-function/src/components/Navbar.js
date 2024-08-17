import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function Navbar() {
  const [isLogged, setIsLogged] = useState(EmployeeService.isAuthenticated());
  const [isAdmin, setIsAdmin] = useState(EmployeeService.isAdmin());

  useEffect(() => {
    // Update states when component mounts
    setIsLogged(EmployeeService.isAuthenticated());
    setIsAdmin(EmployeeService.isAdmin());
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you want to log out?");
    if (confirmLogout) {
      EmployeeService.logout();
      setIsLogged(false);  // Set to false instead of empty string
      setIsAdmin(false);
    }
  };

  return (
    <div className="pb-5">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">{isAdmin ? "ADMINISTRATOR" : "USER PRODUCT"}</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/products">Product</Link>
              </li>
              {isAdmin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/employees">Employees</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/orders">All Orders</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add-product">New Product</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add-employee">New Employee</Link>
                  </li>
                </>
              )}
              {isLogged ? (
                <li className="nav-item">
                  <div className="dropdown text-end">
                    <a href="/my-info" className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src="https://github.com/mdo.png"
                        alt="mdo"
                        style={{ width: '32px', height: '32px' }}
                        className="rounded-circle"
                      />
                    </a>
                    <ul className="dropdown-menu text-small">
                      <li>
                        <Link className="dropdown-item" to="/my-cart">Cart</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/profile">Profile</Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" onClick={handleLogout} to="/login">Logout</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
