import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import EmployeeService from "../services/EmployeeService";
import swal from "sweetalert";
function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const authenticated = EmployeeService.isAuthenticated();
    const navigation = useNavigate();

    useEffect(() => {
        if(authenticated){
            navigation('/');
        }
    }, []);
    
    const handleLogin = async (e) => {

        e.preventDefault();
        try {
            if(!username || !password){
                setError("Hay Dien day du tai khoan va mat khau");
                return;
            }
                
            const userData = await EmployeeService.login(username,password);
            if(userData.token){
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                localStorage.setItem('isAdmin', EmployeeService.isAdmin());
                swal("Successful!", userData.message ? userData.message : "Đăng nhập thanh cong", "success")
                navigation('/');
            }else{
                setError(userData.message ? userData.message: userData.error);
                setTimeout(()=>{
                    setError('');
                }, 5000);
            }
        } catch (error) {
            console.log('hi');
            swal("Failed!", "Đăng nhập thất bại", "error");
            
            setTimeout(()=>{
                setError('');
            }, 10000)
        }
    }

    return ( 
        <div className="d-flex justify-content-center align-items-center vh-100"> 
            <div className="border rounded-lg p-4" style={{ width: '500px', height: 'auto' }}> 
                <MDBContainer className="p-3"> 
                    <h2 className="mb-4 text-center">Trang Đăng nhập</h2> 
                    <MDBInput wrapperClass='mb-4' placeholder='Username' id='username' value={username} type='text' onChange={(e) => setUsername(e.target.value)} required/> 
                    <MDBInput wrapperClass='mb-4' placeholder='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required/> 
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