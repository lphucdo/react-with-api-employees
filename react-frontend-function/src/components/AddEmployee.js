import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import swal from 'sweetalert';

function AddEmployee() {
    const navigate = useNavigate();
    const authenticated = EmployeeService.isAuthenticated();
    const token = EmployeeService.getToken();
    const [employeeInput, setEmployee] = useState({
        username: '',
        password: '',
        empName: '',
        position: ''
    });

    useEffect(() => {
        if(!authenticated){
            navigate('/login');
        }
    }, []);

    const handleInput = (e) => {
        setEmployee({ ...employeeInput, [e.target.name]: e.target.value });
    };


    const saveEmployee = async (e) => {
        e.preventDefault();

        const data = {
            username: employeeInput.username,
            password: employeeInput.password,
            empName: employeeInput.empName,
            position: employeeInput.position
        };
        
        const response = await EmployeeService.register(data, token);
        console.log(response);
        if(response){
            swal("Thành Công", response.message ? response.message : "Thành Công", 'success')
            navigate('/employees')
        }
    };

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Employee
                                    <Link to={'/employees'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={saveEmployee}>
                                    <div className="form-group mb-3">
                                        <label>Username</label>
                                        <input type="text" name="username" onChange={handleInput} value={employeeInput.username} className="form-control" />
                                        <span className="text-danger"></span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" onChange={handleInput} value={employeeInput.password} className="form-control" />
                                        <span className="text-danger"></span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Employee Name</label>
                                        <input type="text" name="empName" onChange={handleInput} value={employeeInput.empName} className="form-control" />
                                        <span className="text-danger"></span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Employee Position</label>
                                        <input type="text" name="position" onChange={handleInput} value={employeeInput.position} className="form-control" />
                                        <span className="text-danger"></span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Employee</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;
