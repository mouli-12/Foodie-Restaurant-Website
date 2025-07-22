package com.restaurant.details.repository;

import com.restaurant.details.model.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends MongoRepository<Restaurant, String> {
    List<Restaurant> findByEnabledTrue();
    Optional<Restaurant> findByRestaurantName(String restaurantName);
    List<Restaurant> findByEnabledTrueAndOwnerEmailId(String ownerEmailId);
//    Optional<Restaurant> findByResid(String resid);
}
