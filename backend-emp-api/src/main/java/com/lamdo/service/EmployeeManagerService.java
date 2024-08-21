package com.lamdo.service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import javax.management.relation.Role;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lamdo.dto.RequestResponse;
import com.lamdo.dto.request.LoginRequest;
import com.lamdo.dto.request.RegisterRequest;
import com.lamdo.dto.response.ListEmployeeResponse;
import com.lamdo.dto.response.LoginResponse;
import com.lamdo.dto.response.BaseResponse;
import com.lamdo.dto.response.EmployeeResponse;
import com.lamdo.entity.Employee;
import com.lamdo.repository.OrderRepository;
import com.lamdo.repository.EmployeeRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeManagerService {
	private final EmployeeRepository employeeRepository;
	private final OrderRepository cartRepository;
	private final JwtUtils jwtUtils;
	private final AuthenticationManager authenticationManager;
	private final PasswordEncoder passwordEncoder;
	
	
	public EmployeeResponse register(RegisterRequest register) {
		EmployeeResponse resp = new EmployeeResponse();
		try {
			
			Employee newEmployee = new Employee();
			if(!employeeRepository.findByUsername(register.getUsername()).isPresent()) {
				newEmployee.setUsername(register.getUsername());
				newEmployee.setEmpName(register.getEmpName());
				newEmployee.setPassword(passwordEncoder.encode(register.getPassword()));
				newEmployee.setPhotos(register.getPhotos());
				newEmployee.setRole(register.getRole());
				Employee saved = employeeRepository.save(newEmployee);
				
				if(saved.getId()>0) {
					resp.setStatusCode(200);
					resp.setMessage("Employee Saved Successfully");
					resp.setEmployee(saved);
				}
			}else {
				resp.setStatusCode(404);
				resp.setError("Username has exitsting");
			}
		} catch (Exception e) {
			resp.setStatusCode(500);
			resp.setError(e.getMessage());
		}
		
		return resp;
	}
	
	public LoginResponse login(LoginRequest login) {
		LoginResponse resp = new LoginResponse();
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));	
			var employee = employeeRepository.findByUsername(login.getUsername()).orElseThrow();
			var jwtToken = jwtUtils.generateToken(employee);
			resp.setStatusCode(200);
			resp.setToken(jwtToken);
			resp.setRole(employee.getRole());
			resp.setExpirationTime("24h");
			resp.setMessage("Loggin sucessfully");
		} catch (Exception e) {
			resp.setStatusCode(500);
			resp.setError("WRONG VALIDATION");
		}
		return resp;
	}
	
//	public RequestResponse refreshToken(RequestResponse refreshTokenRegis) {
//		RequestResponse resp = new RequestResponse();
//		try {
//			String username = jwtUtils.extractUsername(refreshTokenRegis.getToken());
//			Employee employee = employeeRepository.findByUsername(username).orElseThrow();
//			
//			if(jwtUtils.isTokenValid(refreshTokenRegis.getToken(), employee)) {
//				var jwtToken = jwtUtils.generateToken(employee);
//				resp.setStatusCode(200);
//				resp.setToken(jwtToken);
//				resp.setRefreshToken(refreshTokenRegis.getToken());
//				resp.setExpirationTime("24h");
//				resp.setMessage("Refreshed sucessfully");
//			}
//		} catch (Exception e) {
//			resp.setStatusCode(500);
//			resp.setError(e.getMessage());
//			resp.setMessage("Sai tai khoan hoac mat khau");
//		}
//		return resp;
//	}
	//refresh token khong biet de lam gi nen tam thoi bo ra				
	
	public ListEmployeeResponse getAllEmployee() {
		ListEmployeeResponse resp = new ListEmployeeResponse();
		
		try {
			List<Employee> employees = employeeRepository.findAll();
			if(!employees.isEmpty()) {
				resp.setStatusCode(200);
				resp.setMessage("Loaded All Employee!");
				resp.setListEmp(employees);
			}else {
				resp.setStatusCode(404);
				resp.setMessage("Not employee found!");
			}
			
		} catch (Exception e) {
			resp.setStatusCode(500);
			resp.setError("Loading Failed Employee: " + e.getMessage());
		}
		
		return resp;
	}
	
	public EmployeeResponse getEmployeeById(Integer empId) {
		EmployeeResponse resp = new EmployeeResponse();
		
		try {
			Employee emp = employeeRepository.findById(empId).orElseThrow(()-> new RuntimeException("User not found"));
			resp.setStatusCode(200);
			resp.setEmployee(emp);
			resp.setMessage("User with Id "+ emp.getId() + " with username " + emp.getEmpName());
			
		} catch (Exception e) {
			resp.setStatusCode(500);
			resp.setMessage("User not found" + e.getMessage());
		}
		return resp;
	}
	
	@Transactional
	public BaseResponse deleteEmployeeById(Integer empId) {
		BaseResponse resp = new BaseResponse();
		try {
			Optional<Employee> emp = employeeRepository.findById(empId);
			if(emp.isPresent()) {
//				cartRepository.deleteAllByEmployeeId(empId);
				employeeRepository.deleteById(empId);
				resp.setStatusCode(200);
				resp.setMessage("Deleted Employee");
			}else {
				resp.setStatusCode(404);
				resp.setMessage("User not found for delete");
			}
		} catch (Exception e) {
			resp.setStatusCode(500);
			resp.setMessage("Error while deleting employee " + e.getMessage());
		}
		return resp;
	}
	
	public EmployeeResponse updatedEmployeeById(Integer id, Employee updatedEmployee) {
		
		EmployeeResponse resp = new EmployeeResponse();
		try {
			Optional<Employee> emp = employeeRepository.findById(id);
			if(emp.isPresent()) {
				Employee exitingEmployee = emp.get();
				exitingEmployee.setEmpName(updatedEmployee.getEmpName());
				exitingEmployee.setRole(updatedEmployee.getRole());
				exitingEmployee.setUsername(updatedEmployee.getUsername());
				if(updatedEmployee.getPassword() != null && !updatedEmployee.getPassword().isEmpty()) {
					exitingEmployee.setPassword(passwordEncoder.encode(updatedEmployee.getPassword()));
				}
				
				Employee savedEmployee = employeeRepository.save(exitingEmployee);
				resp.setEmployee(savedEmployee);
				resp.setStatusCode(200);
				resp.setMessage("Updated Employee");
			}else {
				resp.setStatusCode(404);
				resp.setMessage("User not found for updated");
			}
			
		} catch (Exception e) {
			resp.setStatusCode(500);
			resp.setMessage("Error while updating employee " + e.getMessage());
		}
		
		return resp;
	}
	
	public EmployeeResponse getMyInfo(String username) {
		EmployeeResponse resp = new EmployeeResponse();
		try {
			Optional<Employee> emp = employeeRepository.findByUsername(username);
			if(emp.isPresent()) {
				resp.setEmployee(emp.get());
				resp.setStatusCode(200);
				resp.setMessage("Founded Employee");
			}else {
				resp.setStatusCode(404);
				resp.setMessage("not found Employee");
			}
		} catch (Exception e) {
			resp.setStatusCode(500);
			resp.setMessage("Error while find user info" + e.getMessage());
		}
		return resp;
	}
}
