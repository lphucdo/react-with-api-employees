package com.lamdo.dto;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.lamdo.entity.OrderItem;
import com.lamdo.entity.Employee;
import com.lamdo.entity.Product;

import lombok.Data;
//
//@Data
//@JsonInclude(JsonInclude.Include.NON_NULL)
//@JsonIgnoreProperties(ignoreUnknown = true)
public class RequestResponse {
	// status
//	private int statusCode;
//	private String error;
//	private String message;
//	
//	// token with user
//	private String token;
//	private String refreshToken;
//	private String expirationTime;
//	private String username;
//	private String empName;
//	private String position;
//	private String password;
//	
//	//employee vs list employee
//	private Employee employee;
//	private List<Employee> listEmp;
//	
//	//product
//	private int productId;
//	private String productName;
//	private String description;
//	private int price;
//	private int quantity;
//	
//	private Product product;
//	private List<Product> listProduct;
//	
//	//cart
//	private int cartId;
//	// product id
//	//employee id
//	//quantity
//	private Cart cart;
//	private List<Cart> listCart;
}
