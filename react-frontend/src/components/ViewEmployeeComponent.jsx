import React, {Component} from "react";
import EmployeeService from "../services/EmployeeService";
import withHook from "../components/withHook";

class ViewEmployeeComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            empNo: this.props.params.empNo,
            employee: {}
        }
    }
    
    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.empNo).then( res => {
            this.setState({employee: res.data});
        })
    }
    

    render(){
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">View Employee Details</h3>
                    <div className="card-body text-center">
                        <div className="row">
                            <label>Employee No: </label>
                            <div>{this.state.employee.empNo}</div>
                        </div>
                        <div className="row">
                            <label>Employee Name: </label>
                            <div>{this.state.employee.empName}</div>
                        </div>
                        <div className="row">
                            <label>Employee position: </label>
                            <div>{this.state.employee.position}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withHook(ViewEmployeeComponent);


