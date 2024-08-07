import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {MDBContainer, MDBInput, MDBBtn} from 'mdb-react-ui-kit'
import EmployeeService from '../services/EmployeeService';
import swal from "sweetalert"
function SignUpPage(){
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [empName, setEmpname] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [position, setPosition] = useState('');
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
                position: position
            };
            const token = localStorage.getItem('token')
            const response = await EmployeeService.register(data,token)

            console.log(response);
            swal("Sucessful" , response.message ? response.message : "THem thanh cong" , "success")


            navigation('/login')
            
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
                    <MDBInput wrapperClass='mb-3' placeholder='position' id='position' type='text'
                              value={position} 
                              onChange={(e) => setPosition(e.target.value)}/> 
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