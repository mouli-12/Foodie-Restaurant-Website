package com.restaurant.details.service;

import com.restaurant.details.model.Restaurant;

import java.util.List;
import java.util.Optional;

public interface RestaurantService {

    Restaurant saveOrUpdate(Restaurant restaurant);          // Create or Update
    List<Restaurant> getAll();                               // Read All
    Optional<Restaurant> getById(String resid);              // Read by ID
    void delete(String resid);                               // Delete
    List<Restaurant> getEnabledRestaurants();
    Restaurant updateRestaurantStatus(String id,boolean enabled);
    Optional<Restaurant> getByName(String restaurantName);
    List<Restaurant> getEnabledRestaurantsByOwnerEmail(String ownerEmailId);

}
