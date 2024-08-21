package com.lamdo.dto.request;

import lombok.Data;

@Data
public class ProductRequest{
	private int productId;
	private String productName;
	private String description;
	private int price;
	private int quantity;
	private String image;
}
