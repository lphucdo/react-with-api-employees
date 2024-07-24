import React,{useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import EmployeeService from "../services/EmployeeService";

function ViewEmployee() {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const token = localStorage.getItem('token');
    const authenticated = EmployeeService.isAuthenticated();
    const isAdmin = EmployeeService.isAdmin();
    console.log("You are admin? " + isAdmin);
    const navigate = useNavigate();

    useEffect(() => {
        if(!authenticated){
            navigate('/login');
        }else{
            fetchEmployees();

        }
    }, []);

    const fetchEmployees = async () => {
        console.log("Lay du lieu tu may chu...");
        try {
            const userData = await EmployeeService.getAllUser(token);
            console.log(userData);
            setEmployees(userData.listEmp);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    

    const deleteEmployee = async (e, id) => {

        var confirm = window.confirm("Are you sure to delete this employee???")
        
        if(confirm){
            const thisClicked = e.currentTarget;
            try {
                thisClicked.innerText = "Deleting";
                const token = localStorage.getItem('token');
                const response = await EmployeeService.deleteEmployee(id, token);
                if(response){
                    console.log(response);
                    swal("Deleted!",response.message ? response.message : "Thanh Cong", "success");
                    thisClicked.closest("tr").remove();
                }
            } catch (error) {
                thisClicked.innerText = "Delete";
                swal("Error", "That Bai", "error");
            }
        }
    }

    if(loading){
        return <h4>Loading Employee Data..</h4>
    }else{
        var employee_HTMLABLE = "";
        employee_HTMLABLE = employees.map((employee, index) => {
            return (
                <tr key={index}>
                    <td>{employee.id}</td>
                    <td>{employee.empName}</td>
                    <td>{employee.username}</td>
                    <td>{employee.position}</td>

                    <td>
                        <Link to={`/edit-employee/${employee.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>

                    <td>
                        <button type="button" onClick={(e) => deleteEmployee(e, employee.id)} className="btn btn-danger btn-sm"> Delete</button>
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
                                            <th>Id</th>
                                            <th>EmpployeeName</th>
                                            <th>username</th>
                                            <th>Position</th>
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