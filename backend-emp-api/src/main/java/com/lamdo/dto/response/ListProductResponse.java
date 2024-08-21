package com.lamdo.dto.response;

import java.util.List;

import com.lamdo.entity.Product;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ListProductResponse extends BaseResponse{
	List<Product> listProduct;

}
