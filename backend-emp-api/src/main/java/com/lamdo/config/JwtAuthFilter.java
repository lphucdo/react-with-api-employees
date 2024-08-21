package com.lamdo.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.lamdo.repository.EmployeeRepository;
import com.lamdo.service.EmployeeDetailsService;
import com.lamdo.service.JwtUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter{

	@Autowired private EmployeeRepository repository;
	@Autowired private EmployeeDetailsService service;
	@Autowired private JwtUtils jwtUtils;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		final String authHeader = request.getHeader("Authorization");
		final String jwtToken;
		final String username;
		
		
		if(authHeader == null || authHeader.isBlank()) {
			filterChain.doFilter(request, response);
			return;
		}
		
		jwtToken = authHeader.substring(7);
		username = jwtUtils.extractUsername(jwtToken);
		
		if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			var user = service.loadUserByUsername(username);
			
			if(jwtUtils.isTokenValid(jwtToken, user)) {
				SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
				
				UsernamePasswordAuthenticationToken auth = 
						new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
				auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				securityContext.setAuthentication(auth);
				SecurityContextHolder.setContext(securityContext);
			}
		}
		filterChain.doFilter(request, response);
	}

}
