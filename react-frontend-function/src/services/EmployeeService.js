import axios from 'axios';


class EmployeeService {
    static EMPLOYEE_API_BASE_URL = "http://localhost:8080";
    
    static async login(username,password){
        try {
            const response = await axios.post(`${EmployeeService.EMPLOYEE_API_BASE_URL}/auth/login`, {username ,password});

            return response.data;

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    static async register(userData, token){
        try {
            const response = 
            await axios.post(`${EmployeeService.EMPLOYEE_API_BASE_URL}/auth/register`, userData
            );

            return response.data;

        } catch (error) {
            throw error
        }
    }

    static async getAllUser(token){
        try {
            const response = 
            await axios.get(`${EmployeeService.EMPLOYEE_API_BASE_URL}/admin/get-all-employee`,
                {
                 headers: {Authorization: `Bearer ${token}`}
                }
            );

            return response.data;

        } catch (error) {
            throw error
        }
    }

    static async getYourProfile(token){
        try {
            const response = 
            await axios.get(`${EmployeeService.EMPLOYEE_API_BASE_URL}/adminuser/profile`,
                {
                 headers: {Authorization: `Bearer ${token}`}
                }
            );

            return response.data;

        } catch (error) {
            throw error
        }
    }

    static async getEmployeeById(id, token){
        try {
            const response = 
            await axios.get(`${EmployeeService.EMPLOYEE_API_BASE_URL}/admin/get-employee/${id}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            );

            return response.data;

        } catch (error) {
            throw error
        }
    }

    static async deleteEmployee(id, token){
        try {
            const response = 
            await axios.delete(`${EmployeeService.EMPLOYEE_API_BASE_URL}/admin/delete-employee/${id}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            );
            

            return response.data;

        } catch (error) {
            throw error
        }
    }

    static async updateEmployee(id,employeeData, token){
        try {
            const response = 
            await axios.put(`${EmployeeService.EMPLOYEE_API_BASE_URL}/admin/update-employee/${id}`,employeeData,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            );

            return response.data;

        } catch (error) {
            console.log("LOi ben service");
            throw error
        }
    }


    static logout(){
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(";").forEach((cookie) => {
            document.cookie = cookie
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
        });
    }

    
    static getToken(){
        const token = localStorage.getItem('token');
        return token;
    }
    static isAuthenticated(){
        const token = localStorage.getItem('token');
        return !!token;
    }
    static isAdmin(){
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }

    static isUser(){
        const role = localStorage.getItem('role');
        return role === 'USER';
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }
}
export default EmployeeService;
