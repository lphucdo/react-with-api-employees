package com.lamdo.dto.request;

import com.lamdo.entity.Role;

import lombok.Data;

@Data
public class LoginRequest {
	private String username;
	private String password;
	private Role role;
}
