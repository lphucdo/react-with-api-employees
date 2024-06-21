import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import UserService from "../services/UserService";

function LoginPage() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigate();

    const handleLogin =async () => {
        try {
            if(!username || !password){
                setError("Hay Dien day du tai khoan va mat khau");
                return;
            }
            const respose = await UserService.checkLogin({username,password});
            console.log(respose.data);
            navigation("/");
        } catch (error) {
            console.log("LOginfailed");
            setError("Sai tk hoặc mk")
        }
    }

    return ( 
        <div className="d-flex justify-content-center align-items-center vh-100"> 
            <div className="border rounded-lg p-4" style={{ width: '500px', height: 'auto' }}> 
                <MDBContainer className="p-3"> 
                    <h2 className="mb-4 text-center">Trang Đăng nhập</h2> 
                    <MDBInput wrapperClass='mb-4' placeholder='UserName' id='username' value={username} type='text' onChange={(e) => setUserName(e.target.value)} /> 
                    <MDBInput wrapperClass='mb-4' placeholder='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} /> 
                    {error && <p className="text-danger">{error}</p>} {/* Render error message if exists */} 
                    <button className="mb-4 d-block btn-primary" style={{ height:'50px',width: '100%' }} onClick={handleLogin}>Đăng nhập</button> 
                    <div className="text-center"> 
                        <p>Chưa có tài khoản? <a href="/register" >Đăng ký</a></p> 
                    </div> 
                </MDBContainer> 
            </div> 
        </div> 
    ); 
}


export default LoginPage; 