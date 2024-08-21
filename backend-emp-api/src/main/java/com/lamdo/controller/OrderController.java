package com.lamdo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lamdo.dto.RequestResponse;
import com.lamdo.dto.request.OrderRequest;
import com.lamdo.dto.response.BaseResponse;
import com.lamdo.dto.response.OrderResponse;
import com.lamdo.entity.OrderItem;
import com.lamdo.dto.response.ListOrderResponse;
import com.lamdo.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/public/order")
public class OrderController {
	
	private final OrderService orderService;

	@PostMapping("/add-order")
	public ResponseEntity<OrderResponse> addToCart(@RequestHeader("Authorization") String token, @RequestBody List<OrderItem> items) {
		if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
		return ResponseEntity.ok(orderService.addOrder(token, items));
	}
	
	@DeleteMapping("/delete-order")
	public ResponseEntity<BaseResponse> deleteCartByEmployeeIdAndProductId(@RequestHeader("Authorization") String token 
			,@RequestBody OrderRequest request)
	{
		if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
		return ResponseEntity.ok(orderService.deleteOrder(token, request));
	}
	
	@DeleteMapping("/delete-order-by-id/{id}")
	public ResponseEntity<BaseResponse> deleteCartById(@PathVariable int id){
		return ResponseEntity.ok(orderService.deleteOrderWithAdmin(id));
	} 
	
	@DeleteMapping("/delete-all-order/{id}")
	public ResponseEntity<BaseResponse> deleteAllCartByUserID(@PathVariable int id){
		return ResponseEntity.ok(orderService.deleteAllOrderByUserId(id));
	}
	
	@GetMapping("/list-all-order")
	public ResponseEntity<List<ListOrderResponse>> getAll(){
		return ResponseEntity.ok(orderService.getAllOrder());
	}
	
	@GetMapping("/list-order-by-user")
	public ResponseEntity<ListOrderResponse> getAllById(@RequestHeader("Authorization") String token){
		if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
		return ResponseEntity.ok(orderService.getAllOrderByUserId(token));
	}
}
