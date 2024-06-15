import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function AddEmployee() {
    const navigate = useNavigate();

    const [employeeInput, setEmployee] = useState({
        empNo: '',
        empName: '',
        position: '',
        error_list: []
    });

    const handleInput = (e) => {
        setEmployee({ ...employeeInput, [e.target.name]: e.target.value });
    };

    const saveEmployee = (e) => {
        e.preventDefault();

        const data = {
            empNo: employeeInput.empNo,
            empName: employeeInput.empName,
            position: employeeInput.position
        };

        // axios.post(`/employee/addEmp`, data).then(res => {
        //     if (res.data.status === 200) {
        //         swal("Success!", res.data.message, "success");
        //         setEmployee({
        //             empNo: '',
        //             empName: '',
        //             position: '',
        //             error_list: []
        //         });
        //         navigate('/employees');
        //     } else if (res.data.status === 422) {
        //         setEmployee({ ...employeeInput, error_list: res.data.validate_err });
        //     }
        // });
        EmployeeService.createEmployee(data).then(res=>{
            navigate(`/employees`)
        })
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
                                        <label>Employee No</label>
                                        <input type="text" name="empNo" onChange={handleInput} value={employeeInput.empNo} className="form-control" />
                                        <span className="text-danger">{employeeInput.error_list.empNo}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Employee Name</label>
                                        <input type="text" name="empName" onChange={handleInput} value={employeeInput.empName} className="form-control" />
                                        <span className="text-danger">{employeeInput.error_list.empName}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Employee Position</label>
                                        <input type="text" name="position" onChange={handleInput} value={employeeInput.position} className="form-control" />
                                        <span className="text-danger">{employeeInput.error_list.position}</span>
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
