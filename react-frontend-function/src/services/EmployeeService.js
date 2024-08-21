import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080";

class EmployeeService {
  static async login(username, password) {
    try {
      const response = await axios.post(`${EMPLOYEE_API_BASE_URL}/auth/login`, { username, password });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async register(userData) {
    try {
      const response = await axios.post(`${EMPLOYEE_API_BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUser(token) {
    try {
      const response = await axios.get(`${EMPLOYEE_API_BASE_URL}/admin/get-all-employee`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getYourProfile(token) {
    try {
      const response = await axios.get(`${EMPLOYEE_API_BASE_URL}/adminuser/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static getToken() {
    return sessionStorage.getItem('token') || localStorage.getItem('token');
  }

  static isAdmin() {
    return sessionStorage.getItem('role') === 'ADMIN';
  }

  static isAuthenticated() {
    return sessionStorage.getItem("token") !== null;
  }

  static logout(){
    sessionStorage.clear();
    localStorage.clear();
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
  }
}

export default EmployeeService;
