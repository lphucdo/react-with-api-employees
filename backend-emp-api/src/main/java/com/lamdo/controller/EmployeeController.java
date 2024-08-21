package com.lamdo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.lamdo.dto.RequestResponse;
import com.lamdo.dto.request.LoginRequest;
import com.lamdo.dto.request.RegisterRequest;
import com.lamdo.dto.response.ListEmployeeResponse;
import com.lamdo.dto.response.LoginResponse;
import com.lamdo.dto.response.BaseResponse;
import com.lamdo.dto.response.EmployeeResponse;
import com.lamdo.entity.Employee;
import com.lamdo.service.EmployeeManagerService;

@RestController
public class EmployeeController {

	@Autowired 
	private EmployeeManagerService employeeManagerService;
	
	@GetMapping("/public")
	public String helloWorld() {
		return "Hello World";
	}
	
	@PostMapping("/auth/register")
	public ResponseEntity<EmployeeResponse> register(@RequestBody RegisterRequest request){
		System.out.println("Registering...");
		return ResponseEntity.ok(employeeManagerService.register(request));
	}
	
	@PostMapping("/auth/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
		
		return ResponseEntity.ok(employeeManagerService.login(request));
	}
	
	@GetMapping("/admin/get-all-employee")
	public ResponseEntity<ListEmployeeResponse> getAll(){
		
		return ResponseEntity.ok(employeeManagerService.getAllEmployee());
	}
	
	@GetMapping("/admin/get-employee/{id}")
	public ResponseEntity<EmployeeResponse> getEmployee(@PathVariable Integer id){
		return ResponseEntity.ok(employeeManagerService.getEmployeeById(id));
	}
	
	@DeleteMapping("/admin/delete-employee/{id}")
	public ResponseEntity<BaseResponse> deleteEmployee(@PathVariable Integer id){
		
		return ResponseEntity.ok(employeeManagerService.deleteEmployeeById(id));
	}
	
	@PutMapping("/admin/update-employee/{id}")
	public ResponseEntity<EmployeeResponse> updateEmployee(@PathVariable Integer id, @RequestBody Employee request){
		
		return ResponseEntity.ok(employeeManagerService.updatedEmployeeById(id, request));
	}
	
	@GetMapping("/adminuser/profile")
	public ResponseEntity<EmployeeResponse> getMyInfo(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String username = auth.getName();
		EmployeeResponse resp = employeeManagerService.getMyInfo(username);
		
		return ResponseEntity.status(resp.getStatusCode()).body(resp);
	}
}
