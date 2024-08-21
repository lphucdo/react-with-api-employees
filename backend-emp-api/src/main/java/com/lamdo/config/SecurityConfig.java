package com.lamdo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.lamdo.entity.Role.*;
import static com.lamdo.entity.Permission.*;

import com.lamdo.service.EmployeeDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Autowired private EmployeeDetailsService employeeDetailsService;
	@Autowired private JwtAuthFilter jwtAuthFilter;
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http.csrf(AbstractHttpConfigurer::disable)
				.cors(Customizer.withDefaults())
				.authorizeHttpRequests(request->request
						.requestMatchers("/auth/**", "/public/**").permitAll()
						.requestMatchers("/admin/**").hasAnyRole(ADMIN.name())
						.requestMatchers("/employee/**").hasAnyRole(ADMIN.name(), EDITOR.name())
						.requestMatchers("/adminuser/**").hasAnyRole(ADMIN.name(),USER.name(), EDITOR.name())
						.anyRequest()
						.authenticated()
						
				)
				.sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
				.build();
	}
	
	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
		
		daoAuthenticationProvider.setUserDetailsService(employeeDetailsService);
		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
		
		return daoAuthenticationProvider;
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authenticationManager (AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}
