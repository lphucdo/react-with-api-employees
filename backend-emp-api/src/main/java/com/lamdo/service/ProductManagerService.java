package com.lamdo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.lamdo.dto.RequestResponse;
import com.lamdo.dto.request.ProductRequest;
import com.lamdo.dto.response.BaseResponse;
import com.lamdo.dto.response.ListProductResponse;
import com.lamdo.dto.response.ProductResponse;
import com.lamdo.entity.Employee;
import com.lamdo.entity.Product;
import com.lamdo.repository.EmployeeRepository;
import com.lamdo.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductManagerService {
	private final ProductRepository productRepository;
	
	public ProductResponse addProduct(ProductRequest request) {
		ProductResponse resp = new ProductResponse();
		try {
			
			Product newProduct = new Product();
			if(!productRepository.findById(request.getProductId()).isPresent()) {
				newProduct.setDescription(request.getDescription());
				newProduct.setProductName(request.getProductName());
				newProduct.setPrice(request.getPrice());
				newProduct.setQuantity(request.getQuantity());
				newProduct.setImage(request.getImage());
				
				Product saved = productRepository.save(newProduct);
				if(saved.getId()>0) {
					resp.setStatusCode(200);
					System.out.println("Image: " + saved.getImage() + " Ima: " + newProduct.getImage() + "  image req: " + request.getImage());
					resp.setMessage("Product Saved Successfully"+ saved.toString());
					resp.setProduct(saved);
				}
			}else {
				resp.setStatusCode(404);
				resp.setError("Username has exitsting");
			}
			
			
		} catch (Exception e) {
			resp.setStatusCode(500);
			resp.setError(e.getMessage());
		}
		
		return resp;
	}
	
	// lay 1 sp
	public ProductResponse getProductById(int productId) {
		ProductResponse resp = new ProductResponse();
		try {
			Optional<Product> product = productRepository.findById(productId);
			Product exitstingProduct = product.get();
			resp.setProduct(exitstingProduct);
			resp.setStatusCode(200);
			resp.setMessage("Founded a product");	
		} catch (Exception e) {
			resp.setStatusCode(404);
			resp.setError("Khong tim thay san pham nay:" + e.getMessage());
		}
		return resp;
	}
	// list
	public ListProductResponse getAllProduct() {
		ListProductResponse resp = new ListProductResponse();
		try {
			List<Product> products = productRepository.findAll();
			if(!products.isEmpty()) {
				resp.setStatusCode(200);
				resp.setMessage("Founded List Products");
				resp.setListProduct(products);
			}else {
				resp.setStatusCode(404);
				resp.setMessage("Not Products found!");
			}
		} catch (Exception e) {
			resp.setStatusCode(505);
			resp.setError("Found error when fetching data!" + e.getMessage());
		}
		return resp;
	}
	// xóa theo id
	public BaseResponse deleteProductById(int productId) {
		BaseResponse resp = new BaseResponse();
		
		try {
			Optional<Product> product = productRepository.findById(productId);
			if(product.isPresent()) {
				productRepository.deleteById(productId);
				resp.setStatusCode(200);
				resp.setMessage("Deleted Product");
			}else {
				resp.setStatusCode(404);
				resp.setMessage("Product not found for delete");
			}
		} catch (Exception e) {
			resp.setStatusCode(500);
			resp.setMessage("Error while deleting Product " + e.getMessage());
		}
		return resp;
	}
	
	// cập nhật
	public ProductResponse updateProduct(int productId, ProductRequest productRequest) {
		ProductResponse resp = new ProductResponse();
		
		try {
			Optional<Product> product = productRepository.findById(productId);
			if(product.isPresent()) {
				Product exitingProduct = product.get();
				exitingProduct.setProductName(productRequest.getProductName());
				exitingProduct.setDescription(productRequest.getDescription());
				exitingProduct.setPrice(productRequest.getPrice());
				exitingProduct.setQuantity(productRequest.getQuantity());
				exitingProduct.setImage(productRequest.getImage());
				
				Product savedProduct = productRepository.save(exitingProduct);
				resp.setProduct(savedProduct);
				resp.setStatusCode(200);
				resp.setMessage("Updated Product");
			}else {
				resp.setStatusCode(404);
				resp.setMessage("Product not found for updated");
			}
			
		} catch (Exception e) {
			resp.setStatusCode(500);
			resp.setMessage("Error while updating Product " + e.getMessage());
		}
		
		return resp;
	}
	
}
