package com.lamdo.dto.request;

import com.lamdo.entity.Role;

import lombok.Data;

@Data
public class RegisterRequest {
	private String username;
	private String empName;
	private String password;
	private String photos;
	private Role role;
}
