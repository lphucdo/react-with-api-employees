import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080";

class EmployeeService {
    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL + "/employees");
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL + "/addEmp", employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + "/employee/" + employeeId);
    }

    updateEmployee(empNo, employee){
        console.log(EMPLOYEE_API_BASE_URL + "/employee/" + empNo);
        return axios.put(EMPLOYEE_API_BASE_URL + "/employee/" + empNo, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + "/employee/" + employeeId);
    }
}
// eslint-disable-next-line
export default new EmployeeService();
