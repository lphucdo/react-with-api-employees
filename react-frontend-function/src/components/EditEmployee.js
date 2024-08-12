import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import swal from 'sweetalert';
import EmployeeService from '../services/EmployeeService';

function EditEmployee() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [employeeInput, setEmployee] = useState({});
    const [errorInput, setError] = useState([]);
    console.log("id: " + id);
    

    useEffect(() => {
        fecthDataById();
    }, [id]);
    
    async function fecthDataById (){
        try {
            const token = localStorage.getItem('token');
            const response = await EmployeeService.getEmployeeById(id, token);
            if(response.statusCode == 200){
                setEmployee(response.employee);
                setLoading(false);
            }else{
                swal("Error",response.message ? response.message : "Loi","error");
            }
        } catch (error) {
            swal('Error', "Co loi xay ra", 'error')
        }
    }


    const handleInput = (e) => {
        e.preventDefault();
        setEmployee({...employeeInput, [e.target.name]: e.target.value });
    }

    const updateEmployee = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const data = {
                id: employeeInput?.id,
                username: employeeInput?.username,
                password: employeeInput?.password,
                empName: employeeInput?.empName,
                position: employeeInput?.position,
                image: employeeInput?.image
            }

            const response = await EmployeeService.updateEmployee(id, data, token);
            console.log(response);

            if(response.statusCode === 200){
                swal("Success",response.message ? response.message : "Success updated","success");
                navigate('/employees');  
            }
        } catch (error) {
            console.log(error);
        }
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
                                        <label>Employee Id</label>
                                        <input type="text" name="id" onChange={handleInput} value={employeeInput?.id} className="form-control" />
                                        <span className="text-danger">{errorInput.id}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Employee Username</label>
                                        <input type="text" name="username" onChange={handleInput} value={employeeInput?.username} className="form-control" />
                                        <span className="text-danger">{errorInput.username}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Employee Password</label>
                                        <input type="text" name="password" onChange={handleInput} value={employeeInput?.password} className="form-control" />
                                        <span className="text-danger">{errorInput.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Employee Name</label>
                                        <input type="text" name="empName" onChange={handleInput} value={employeeInput?.empName} className="form-control" />
                                        <span className="text-danger">{errorInput.empName}</span>
                                    </div>
                                    
                                    <div className="form-group mb-3">
                                        <label>Employee Position</label>
                                        <input type="text" name="position" onChange={handleInput} value={employeeInput?.position} className="form-control" />

                                        <span className="text-danger">{errorInput.position}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Employee Image</label>
                                        <input type="text" name="image" onChange={handleInput} value={employeeInput?.image} className="form-control" />

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