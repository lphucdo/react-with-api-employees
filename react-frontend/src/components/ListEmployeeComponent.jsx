import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import withHook from '../components/withHook';

class ListEmployeeComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(empNo){
        EmployeeService.deleteEmployee(empNo).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.empNo !== empNo)});
        });
    }

    viewEmployee(empNo){
        this.props.navigation(`/employee/${empNo}`);
    }

    editEmployee(empNo){
        this.props.navigation(`/add-employee/${empNo}`);
    }

    componentDidMount(){

        EmployeeService.getEmployees().then((res) => {
            this.setState({
                employees: res.data
            });
        });
    }

    addEmployee(){
        this.props.navigation(`/add-employee/_add`);
    }

    render(){
        return (
            <div>
                 <h2 className="text-center">Employees List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Employee No</th>
                                    <th> Employee Name</th>
                                    <th> Employee Postion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.empNo}>
                                             <td> {employee.empNo}</td>
                                             <td> {employee.empName} </td>   
                                             <td> {employee.position}</td>
                                             <td>
                                                 <button onClick={ () => this.editEmployee(employee.empNo)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.empNo)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.empNo)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>

        )
    }

}

export default withHook(ListEmployeeComponent);