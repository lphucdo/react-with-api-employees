import React,{useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import EmployeeService from "../services/EmployeeService";

function ViewEmployee() {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        EmployeeService.getEmployees().then(res => {
            if (res.status === 200) {
                setEmployees(res.data);
                setLoading(false);
            }
        })
    }, []);

    const deleteEmployee = (e, empNo) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        EmployeeService.deleteEmployee(empNo).then(res => {
            if(res.status === 200){
                swal("Deleted!", "Thanh Cong", "success");
                thisClicked.closest("tr").remove();
            }
            else if(res.status === 404){
                swal("Error", "That Bai", "error");
                thisClicked.innerText = "Delete";
            }
        })
    }

    if(loading){
        return <h4>Loading Employee Data..</h4>
    }else{
        var employee_HTMLABLE = "";
        employee_HTMLABLE = employees.map((employee, index) => {
            return (
                <tr key={index}>
                    <td>{employee.empNo}</td>
                    <td>{employee.empName}</td>
                    <td>{employee.position}</td>

                    <td>
                        <Link to={`/edit-employee/${employee.empNo}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>

                    <td>
                        <button type="button" onClick={(e) => deleteEmployee(e, employee.empNo)} className="btn btn-danger btn-sm"> Delete</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Employees Data
                                    <Link to={`/add-employee`} className="btn btn-primary btn-sm float-end"> Add Employee</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>empNo</th>
                                            <th>empName</th>
                                            <th>position</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employee_HTMLABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewEmployee;