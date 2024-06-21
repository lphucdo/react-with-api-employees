import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import {MDBContainer, MDBInput, MDBBtn} from 'mdb-react-ui-kit'

function SignUpPage(){
    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('ROLE_CUSTOMER');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigate();
    

    const handleSignup = async () => {
        try {
            if(!fullName || !email || !username || !password || !confirmPassword || !mobile){
                setError('Kiem tra va dien day du cac truong');
                return;
            }

            if(password !== confirmPassword){
                throw new Error("'Mat Khau Khong Trung Khop'");
            }

            const respone = await UserService.checkRegister({
                email,
                fullName,
                username,
                password,
                role,
                mobile
            })

            console.log(respone.data);

            navigation('/users')
            
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
                    {/* Render error message if exists */} 
                    {error && <p className="text-danger">{error}</p>} 
                    <MDBInput wrapperClass='mb-3' id='fullName' placeholder={"Full Name"} value={fullName} type='text'
                              onChange={(e) => setFullname(e.target.value)}/> 
                    <MDBInput wrapperClass='mb-3' placeholder='Email Address' id='email' value={email} type='email'
                              onChange={(e) => setEmail(e.target.value)}/> 
                    <MDBInput wrapperClass='mb-3' placeholder='Username' id='username' value={username} type='text'
                              onChange={(e) => setUserName(e.target.value)}/> 
                    <MDBInput wrapperClass='mb-3' placeholder='Password' id='password' type='password' value={password} 
                              onChange={(e) => setPassword(e.target.value)}/> 
                    <MDBInput wrapperClass='mb-3' placeholder='Confirm Password' id='confirmPassword' type='password'
                              value={confirmPassword} 
                              onChange={(e) => setConfirmPassword(e.target.value)}/> 
                    <MDBInput wrapperClass='mb-2' placeholder='Mobile Number' id='mobileNumber' value={mobile} 
                              type='text'
                              onChange={(e) => setMobile(e.target.value)}/> 
                    <label className="form-label mb-1">Role:</label> 
                    <select className="form-select mb-4" value={role} onChange={(e) => setRole(e.target.value)}> 
                        <option value="ROLE_CUSTOMER">User</option> 
                        <option value="ROLE_ADMIN">Admin</option> 
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