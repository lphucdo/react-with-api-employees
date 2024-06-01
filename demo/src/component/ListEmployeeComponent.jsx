import React, {Component} from 'react'
import EmployeeServices from '../services/EmployeeServices'

class ListEmployeeComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            employees: []
        }
        // this.addEmployee = this.addEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeServices.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        })
    }
    componentDidMount(){
        EmployeeServices.getEmployee().then((res) => {
            this.setState({ employees: res.data});
            console.log(res);

        });

    }
    render(){
        return(
            <div>
                <h2 className='text-center'>
                    Employees List
                </h2>
                <div className='row'>
                    <button className='btn btn-primary'>Add Employee</button>
                </div>
                <br></br>
                <div className='row'>
                    <tabel className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee=>
                                    <tr key={employee.empNo}>
                                        <td>{employee.empNo}</td>
                                        <td>{employee.empName}</td>
                                        <td>{employee.position}</td>
                                        <td>
                                            <button className='btn btn-info'>Update</button>
                                            <button onClick={this.deleteEmployee(employee.id)} className='btn btn-danger' style={{marginLeft: "10px"}}>Delete</button>
                                            <button className='btn btn-info' style={{marginLeft: "10px"}}>View</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </tabel>
                </div>
            </div>
        )
    }
}

export default ListEmployeeComponent;