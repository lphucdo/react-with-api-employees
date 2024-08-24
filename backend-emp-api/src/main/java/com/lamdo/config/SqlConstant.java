package com.lamdo.config;

public class SqlConstant {
	public static final String GET_ALL_SQL = "SELECT o.id,oi.product_id,p.product_name,oi.quantity,e.id,e.emp_name,o.order_time,o.status,o.total_amount \n"
			+ "FROM `_order` o join `_emp` e ON o.employee_id = e.id  \n"
			+ "				JOIN `_order-item` oi ON o.id = oi.order_id\n"
			+ "				JOIN  `_product` p ON oi.product_id = p.id ";
}
