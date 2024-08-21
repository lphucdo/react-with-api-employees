package com.lamdo.entity;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "_emp")
@Entity
public class Employee implements UserDetails{

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String username;
	private String empName;
	private String password;
	
	@Enumerated(EnumType.STRING)
	private Role role;
	private String photos;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		
		return role.getAuthorities();
	}
}
