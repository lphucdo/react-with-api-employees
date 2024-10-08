package com.lamdo.dto.response;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ListOrderResponse extends BaseResponse{
//	private List<Order> listOrder;
	private int orderId;
	private int productId;
	private String productName;
	private int quantity;
	private int employeeId;
	private String empName;
	private String orderTime;
	private int status;
	private Object totalAmount;
	
}
