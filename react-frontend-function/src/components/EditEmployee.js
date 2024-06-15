import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import swal from 'sweetalert';
import EmployeeService from '../services/EmployeeService';

function EditEmployee() {
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [employeeInput, setEmployee] = useState({});
    const [errorInput, setError] = useState([]);

    console.log(employeeInput);

    useEffect(() => {
        console.log(params.empNo);
        const employee_id = params.empNo;
        EmployeeService.getEmployeeById(employee_id).then( res => {
            console.log(res);
            if(res.status === 200)
            {
                setEmployee(res.data);
                setLoading(false);
            }
            else if(res.status === 404)
            {
                swal("Error","Loi","error");
                navigate('/employees');
            }
        });

    }, [navigate]);

    const handleInput = (e) => {
        e.persist();
        setEmployee({...employeeInput, [e.target.name]: e.target.value });
    }

    const updateEmployee= (e) => {
        e.preventDefault();
        
        const employee_empNo = params.empNo;
        // const data = studentInput;
        const data = {
            empNo: employeeInput?.empNo,
            empName: employeeInput?.empName,
            position: employeeInput?.position,
        }

        EmployeeService.updateEmployee(employee_empNo, data).then(res=>{
            if(res.status === 200)
            {
                swal("Success","Success","success");
                setError([]);
                navigate('/employees');
            }
            else if(res.status === 422)
            {
                swal("All fields are mandetory","","error");
                setError(res.validationErrors);
            }
            else if(res.status === 404)
            {
                swal("Error",res.message,"error");
                navigate('/employees');
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Edit Employees Data...</h4>
    }
    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Employees 
                                    <Link to={'/employees'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateEmployee} >
                                    <div className="form-group mb-3">
                                        <label>Employee No</label>
                                        <input type="text" name="empNo" onChange={handleInput} value={employeeInput?.empNo} className="form-control" />
                                        <span className="text-danger">{errorInput.empNo}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Employee Name</label>
                                        <input type="text" name="empName" onChange={handleInput} value={employeeInput?.empName} className="form-control" />
                                        <span className="text-danger">{errorInput.empName}</span>
                                    </div>
                                    
                                    <div className="form-group mb-3">
                                        <label>Employee Position</label>
                                        <input type="text" name="position" onChange={handleInput} value={employeeInput?.position}  className="form-control" />
                                        <span className="text-danger">{errorInput.position}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update Employee</button>
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

export default EditEmployee;