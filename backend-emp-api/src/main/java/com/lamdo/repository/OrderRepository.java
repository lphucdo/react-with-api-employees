package com.lamdo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.lamdo.config.SqlConstant;
import com.lamdo.entity.Order;
import com.lamdo.entity.OrderItem;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>{
	Optional<Order> findByEmployeeId(int userId);
	void deleteAllByEmployeeId(int userId);
	List<Order> findAllByEmployeeId(int userId);
	
	@Query(value = SqlConstant.GET_ALL_SQL, nativeQuery = true)
	List<Object[]> getAllOrders();
//	Optional<OrderItem> findByEmployeeIdAndProductId(int userId, int productId);
//	void deleteByEmployeeIdAndProductId(int userId, int productId);
//	List<OrderItem> findAllByEmployeeId(int userId);
//	
//	void deleteAllByEmployeeId(int userId);
}
