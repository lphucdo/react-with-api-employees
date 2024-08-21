package com.lamdo.dto.response;

import com.lamdo.entity.Order;
import com.lamdo.entity.OrderItem;

import lombok.Data;
import lombok.EqualsAndHashCode;
@Data
@EqualsAndHashCode(callSuper = false)
public class OrderResponse extends BaseResponse{
	private Order order;
}
