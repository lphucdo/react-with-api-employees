package com.lamdo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.lamdo.dto.RequestResponse;
import com.lamdo.dto.request.ProductRequest;
import com.lamdo.dto.response.BaseResponse;
import com.lamdo.dto.response.ListProductResponse;
import com.lamdo.dto.response.ProductResponse;
import com.lamdo.entity.Employee;
import com.lamdo.entity.Product;
import com.lamdo.service.ProductManagerService;

@RestController
public class ProductController {
	@Autowired 
	private ProductManagerService productManagerService;
	
	@PostMapping("/adminuser/add-product")
	public ResponseEntity<ProductResponse> addProduct(@RequestBody ProductRequest request){
		
		return ResponseEntity.ok(productManagerService.addProduct(request));
	}
	
	@GetMapping("/adminuser/get-all-product")
	public ResponseEntity<ListProductResponse> getAll(){
		
		return ResponseEntity.ok(productManagerService.getAllProduct());
	}
	
	@GetMapping("/adminuser/get-product/{id}")
	public ResponseEntity<ProductResponse> getEmployee(@PathVariable int id){
		return ResponseEntity.ok(productManagerService.getProductById(id));
	}
	
	@DeleteMapping("/adminuser/delete-product/{id}")
	public ResponseEntity<BaseResponse> deleteEmployee(@PathVariable int id){
		
		return ResponseEntity.ok(productManagerService.deleteProductById(id));
	}
	
	@PutMapping("/adminuser/update-product/{id}")
	public ResponseEntity<ProductResponse> updateEmployee(@PathVariable int id, @RequestBody ProductRequest request){
		
		return ResponseEntity.ok(productManagerService.updateProduct(id, request));
	}
}
