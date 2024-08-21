package com.lamdo.dto.response;

import com.lamdo.entity.Role;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class LoginResponse extends BaseResponse{
	private String token;
	private String refreshToken;
	private String expirationTime;
	private Role role;
	
}
