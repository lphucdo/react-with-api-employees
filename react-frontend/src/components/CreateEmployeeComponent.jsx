import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import withHook from '../components/withHook';

class CreateEmployeeComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            empNo: this.props.params.empNo,
            empName: '',
            position: ''
        }
        this.changeEmpNoHandler = this.changeEmpNoHandler.bind(this);
        this.changeEmpNameHandler = this.changeEmpNameHandler.bind(this);
        this.changePositionHandler = this.changePositionHandler.bind(this);
    }

    componentDidMount(){
        if(this.state.empNo === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.empNo).then(
                (res) => {
                    let employee = res.data;
                    this.setState({
                        empNo: employee.empNo,
                        empName: employee.empName,
                        position: employee.position
                    })
                }
            )
        }
    }
    saveOrUpdateEmployee = (e) =>{
        e.preventDefault();
        let employee = {
            empNo: this.state.empNo,
            empName: this.state.empName,
            position: this.state.position
        }
        console.log('employee => ' + JSON.stringify(employee));

        if(this.state.empNo === '_add') {
            EmployeeService.createEmployee(employee).then(res => {
                    this.props.navigation('/employees');
                }
            )
        }
        else{
            EmployeeService.updateEmployee(this.state.empNo, employee).then(res => {
                this.props.navigation('/employees');
            })
        }
    }

    changeEmpNoHandler = (event) => {
        this.setState({empNo: event.target.value});
    }

    changeEmpNameHandler = (event) => {
        this.setState({empName: event.target.value});
    }

    changePositionHandler = (event) => {
        this.setState({position: event.target.value})
    }

    cancel(){
        this.props.navigation('/employees');

    }

    getTitle(){
        if(this.state.empNo === '_add'){
            return <h3 className='text-center'>Add Employee</h3>
        }else{
            return <h3 className='text-center'>Update Employee</h3>
        }
    }
    
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> EmpNo: </label>
                                            <input placeholder="EmpNo" name="empNo" className="form-control" 
                                                value={this.state.empNo} onChange={this.changeEmpNoHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Employee Name: </label>
                                            <input placeholder="Employee Name" name="empName" className="form-control" 
                                                value={this.state.empName} onChange={this.changeEmpNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Employee Postion: </label>
                                            <input placeholder="Position" name="position" className="form-control" 
                                                value={this.state.position} onChange={this.changePositionHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }

}


export default withHook(CreateEmployeeComponent);