package com.lamdo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lamdo.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{

}
