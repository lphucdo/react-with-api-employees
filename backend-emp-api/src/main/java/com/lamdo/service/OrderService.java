package com.lamdo.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.lamdo.dto.request.OrderRequest;
import com.lamdo.dto.response.BaseResponse;
import com.lamdo.dto.response.ListOrderResponse;
import com.lamdo.dto.response.OrderResponse;
import com.lamdo.entity.Employee;
import com.lamdo.entity.Order;
import com.lamdo.entity.OrderItem;
import com.lamdo.repository.EmployeeRepository;
import com.lamdo.repository.OrderRepository;
import com.lamdo.repository.ProductRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {
	
	private final OrderRepository orderRepository;
	private final ProductRepository productRepository;
	private final EmployeeRepository employeeRepository;
	private final JwtUtils jwtUtils;
	
	
	public OrderResponse addOrder(String token, List<OrderItem> items) {
		OrderResponse resp = new OrderResponse();
		int user_id = jwtUtils.extractUserId(token);
		Optional<Employee> employee = employeeRepository.findById(user_id);
		if(employee.isPresent()) {
			Employee emp = employee.get();
			Order newOrder = new Order();
			newOrder.setEmployee(emp);
			newOrder.setOrders(items);
			newOrder.setOrderTime(new Date());
			newOrder.setStatus(1);
			int total = 0;
			for(OrderItem orderItem : items) {
				total+= orderItem.getPrice() * orderItem.getQuantity();
				System.out.println("total: "+ total);
			}
			newOrder.setTotalAmount(total);
			
			Order saved = orderRepository.save(newOrder);
			resp.setOrder(saved);
			resp.setStatusCode(200);
			resp.setMessage("Them mot order thanh cong");
		}
		
		
		return resp;
	}
	// xóa cart theo id của employee
	@Transactional
	public BaseResponse deleteOrder(String token, OrderRequest request) {
		BaseResponse resp = new BaseResponse();
		int user_id = jwtUtils.extractUserId(token);
		try {
			orderRepository.deleteById(request.getOrderId());
			resp.setStatusCode(200);
			resp.setMessage("Xóa Order hàng thành công!");
		} catch (Exception e) {
			resp.setStatusCode(404);
			resp.setError("Lamdo Phong cách tìm thấy lỗi: " + e.getMessage());
		}
		return resp;
	}
	
	public BaseResponse deleteOrderWithAdmin(int orderId) {
		BaseResponse resp = new BaseResponse();
		try {
			orderRepository.deleteById(orderId);
			resp.setStatusCode(200);
			resp.setMessage("Delete Cart " + orderId + " Thanh cong");
		} catch (Exception e) {
			resp.setStatusCode(404);
			resp.setError("Phong cach");
		}
		
		return resp;
	}
	
	@Transactional
	public BaseResponse deleteAllOrderByUserId(int user_id) {
		BaseResponse resp = new BaseResponse();
		try {
			orderRepository.deleteAllByEmployeeId(user_id);
			resp.setStatusCode(200);
			resp.setMessage("Xóa tat ca order cua user "+ user_id +" thành công!");
		} catch (Exception e) {
			resp.setStatusCode(501);
			resp.setError("Lamdo Phong cách tìm thấy lỗi: " + e.getMessage());
		}
		return resp;
	}
	public List<ListOrderResponse> getAllOrder() {
		List<ListOrderResponse> resp = new ArrayList<>();
		try {
			List<Order> listOrder = orderRepository.findAll();
			for(Order order: listOrder) {
				StringBuilder productIDs = new StringBuilder();
				StringBuilder productNames = new StringBuilder();
				StringBuilder quantities = new StringBuilder();
				
				for(OrderItem item: order.getOrders()) {
					if(productIDs.length() > 0) {
						productIDs.append(", ");
						productNames.append(", ");
						quantities.append(", ");
					}
					
					productIDs.append(item.getProduct().getId());
					productNames.append(item.getProduct().getProductName());
					quantities.append(item.getQuantity());
				}
				
				ListOrderResponse listOrderResponse = new ListOrderResponse().builder()
						.orderId(order.getId())
						.employeeId(order.getEmployee().getId())
						.empName(order.getEmployee().getEmpName())
						.orderTime(dateFormatter(order.getOrderTime()))
						.productId(productIDs.toString())
						.productName(productNames.toString())
						.quantity(quantities.toString())
						.totalAmount(order.getTotalAmount())
						.status(order.getStatus())
						.build();
				listOrderResponse.setStatusCode(200);
				resp.add(listOrderResponse);
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resp;
	}
	
	public String dateFormatter(Date date) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss-dd/MM/yyyy");
		System.out.println("Dinh dang lai ngay gio: "+ dateFormat.format(date));
		return dateFormat.format(date);
	}
	
	public ListOrderResponse getAllOrderByUserId(String token) {
		ListOrderResponse resp = new ListOrderResponse();
//		int user_id = jwtUtils.extractUserId(token);
//		try {
//			List<Order> list = orderRepository.findAllByEmployeeId(user_id);
//			resp.setStatusCode(200);
//			resp.setMessage("Lấy thành công order của user " + user_id);
//			resp.setListOrder(list);
//		} catch (Exception e) {
//			resp.setStatusCode(404);
//			resp.setError("Thiếu phong cách! Không có dữ liệu");
//		}
		return resp;
	}
	
}
