import React , {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function Navbar ()
{
  const [isAdmin, setAdmin] = useState(false);
  const [isAuthenticated,setAuthenticated] = useState(false);

  useEffect(()=>{
    setAdmin(EmployeeService.isAdmin());
    setAuthenticated(EmployeeService.isAuthenticated());
  },[])

  const handleLogout = () => {
    const confirm = window.confirm("Do u want to logout this user???")
    if(confirm){
      EmployeeService.logout();
      setAuthenticated(false);
    }
  }
  
  return(
    <div className="pb-5">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">{isAdmin === true ? "ADMINISTRATOR" : "USER PRODUCT"}</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/products">Product</Link>
              </li>
              {isAdmin ? (
                <><li className="nav-item">
                  <Link className="nav-link" to="/employees">Employees</Link>

                </li>
                <li>
                  <Link className='nav-link' to="/carts">Cart</Link>
                </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add-product">New Product</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add-employee">New Employee</Link>
                  </li>
                  
                  </>
              ): <></>}
              {!localStorage.getItem("position") ? 
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
               : 
                <li>
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
                        <a className="dropdown-item" href="/">
                          New project...
                        </a>
                      </li>
                      <li>
                          <Link className='' to="/my-cart">Cart</Link>
                      </li>
                      <li>
                          <Link className='' to="/profile">Profile</Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                          <Link className="" onClick={handleLogout} to="/">Logout</Link>
                      </li>
                    </ul>
                  </div>
              </li>

              }

              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;