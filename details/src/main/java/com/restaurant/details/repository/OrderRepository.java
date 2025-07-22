package com.restaurant.details.repository;

import com.restaurant.details.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByEmailId(String emailId);
    @Query("{ 'restaurant.ownerEmailId': ?0 }")
    List<Order> findByRestaurantOwnerEmail(String ownerEmail);

//    @Query("{ 'restaurant.ownerEmailId': ?0, 'status': ?1 }")
    List<Order> findByRestaurantNameAndStatus(String ownerEmail, String status);
}
