import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080";

class UserService{
    getUsers(){
        return axios.get(USER_API_BASE_URL + "/users");
    }

    createUser(user){
        return axios.post(USER_API_BASE_URL + "/addUser", user);
    }

    getUserById(userId){
        return axios.get(USER_API_BASE_URL + "/user/" + userId);
    }

    updateUser(userId, user){
        return axios.put(USER_API_BASE_URL + "/user/" + userId, user);
    }

    deleteUser(userId){
        return axios.delete(USER_API_BASE_URL + "/user/" + userId);
    }
    checkLogin(user){
        return axios.post(USER_API_BASE_URL + "/checkLogin", user);
    }
    checkRegister(user){
        return axios.post(USER_API_BASE_URL + "/checkSignUp", user);
    }
}

export default new UserService();