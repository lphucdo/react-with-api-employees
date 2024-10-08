import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import EmployeeService from "../services/EmployeeService";
import swal from "sweetalert";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Hãy điền đầy đủ tài khoản và mật khẩu");
      return;
    }

    try {
      const userData = await EmployeeService.login(username, password);

      if (userData.token) {
        rememberMe && localStorage.setItem('token', userData.token);
        localStorage.setItem("rememberMe", rememberMe);
        sessionStorage.setItem('token', userData.token);
        sessionStorage.setItem('role', userData.role);
        sessionStorage.setItem('isAdmin', EmployeeService.isAdmin());
        swal("Successful!", userData.message || "Đăng nhập thành công", "success");
        navigate("/")
      } else {
        setError(userData.message || userData.error);
        setTimeout(() => setError(''), 5000);
      }
    } catch (error) {
      swal("Failed!", "Đăng nhập thất bại", "error");
      setTimeout(() => setError(''), 10000);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border rounded-lg p-4" style={{ width: '500px', height: 'auto' }}>
        <MDBContainer className="p-3">
          <h2 className="mb-4 text-center">Trang Đăng nhập</h2>
          <form onSubmit={handleLogin}>
            <MDBInput 
              wrapperClass='mb-4' 
              placeholder='Username' 
              id='username' 
              value={username} 
              type='text' 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            <MDBInput 
              wrapperClass='mb-4' 
              placeholder='Password' 
              id='password' 
              type='password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            {error && <p className="text-danger">{error}</p>}
            <div className="mb-4">
              <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              <label htmlFor="rememberMe" className="ml-2">Remember me?</label>
            </div>
            <MDBBtn className="mb-4 d-block btn-primary" style={{ height: '50px', width: '100%' }} type="submit">
              Đăng nhập
            </MDBBtn>
          </form>
          <div className="text-center">
            <p>Chưa có tài khoản? <a href="/register">Đăng ký</a></p>
          </div>
        </MDBContainer>
      </div>
    </div>
  );
}

export default LoginPage;
