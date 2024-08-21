import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {MDBContainer, MDBInput} from 'mdb-react-ui-kit'
import EmployeeService from '../services/EmployeeService';
import swal from "sweetalert"
function SignUpPage(){
    const [token, setToken] = useState(EmployeeService.getToken());

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [empName, setEmpname] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('USER');
    const [error, setError] = useState('');
    const navigation = useNavigate();
    

    const handleSignup = async () => {
        try {
            if(!username || !password || !confirmPassword){
                setError('Kiem tra va dien day du cac truong');
                return;
            }

            if(password !== confirmPassword){
                throw new Error("Mat Khau Khong Trung Khop");
            }

            const data = {
                username: username,
                password: confirmPassword,
                empName: empName,
                role: role
            };
            const response = await EmployeeService.register(data,token)

            console.log(response);
            swal("Sucessful" , response.message ? response.message : "THem thanh cong" , "success")


            const userData = await EmployeeService.login(username, password);
            console.log("Dang ky: ", userData);
            if (userData.token) {
                const rememberMe = true;
                rememberMe && localStorage.setItem('token', userData.token);
                localStorage.setItem("rememberMe", rememberMe);
                sessionStorage.setItem('token', userData.token);
                sessionStorage.setItem('role', userData.role);
                sessionStorage.setItem('isAdmin', EmployeeService.isAdmin());
                swal("Successful!", userData.message || "Đăng nhập thành công", "success");
            }
            navigation("/");
        } catch (error) {
            console.log("Dang ky that bai: ", error.respone ? error.respone.data : error.message);
            setError(error.respone ? error.respone.data : error.message);
        }
    };

    return ( 
        <div className="d-flex justify-content-center align-items-center vh-100"> 
            <div className="border rounded-lg p-4" style={{width: '600px', height: 'auto'}}> 
                <MDBContainer className="p-3"> 
                    <h2 className="mb-4 text-center">Trang Đăng ký</h2> 
                    {error && <p className="text-danger">{error}</p>} 
                    <MDBInput wrapperClass='mb-3' placeholder='Employee name' id='empName' value={empName} type='text'
                              onChange={(e) => setEmpname(e.target.value)}/> 
                    <MDBInput wrapperClass='mb-3' placeholder='Username' id='username' value={username} type='text'
                              onChange={(e) => setUserName(e.target.value)}/> 
                    <MDBInput wrapperClass='mb-3' placeholder='Password' id='password' type='password' value={password} 
                              onChange={(e) => setPassword(e.target.value)}/> 
                    <MDBInput wrapperClass='mb-3' placeholder='Confirm Password' id='confirmPassword' type='password'
                              value={confirmPassword} 
                              onChange={(e) => setConfirmPassword(e.target.value)}/> 
                    {/* <MDBInput wrapperClass='mb-3' placeholder='role' id='role' type='text'
                              value={role} 
                              onChange={(e) => setRole(e.target.value)}/>  */}

                    <select className="form-select mb-3" aria-label="Default select example" id='role' value={role}
                        onChange={(e)=>setRole(e.target.value)} required
                    >
                        {/* <option selected disabled>Select role you want to choose</option> */}
                        <option value="USER">USER</option>
                        <option value="EDITOR">EDITOR</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                    <button className="mb-4 d-block mx-auto fixed-action-btn btn-primary"
                            style={{height: '40px', width: '100%'}} 
                            onClick={handleSignup}>Đăng ký 
                    </button> 
  
                    <div className="text-center"> 
                        <p>Đã có tài khoản? <a href="/login">Đăng nhập</a></p> 
                    </div> 
  
                </MDBContainer> 
            </div> 
        </div> 
    ); 
}

export default SignUpPage;