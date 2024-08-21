package com.lamdo.dto.response;

import com.lamdo.entity.Product;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ProductResponse extends BaseResponse{
	private Product product;
}
