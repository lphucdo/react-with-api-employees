package com.lamdo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.lamdo.repository.EmployeeRepository;

@Service
public class EmployeeDetailsService implements UserDetailsService{
	@Autowired EmployeeRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return repository.findByUsername(username).orElseThrow();
	}

}
