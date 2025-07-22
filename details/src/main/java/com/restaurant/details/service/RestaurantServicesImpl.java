package com.restaurant.details.service;

import com.restaurant.details.model.Restaurant;
import com.restaurant.details.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServicesImpl implements RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public Restaurant saveOrUpdate(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    @Override
    public List<Restaurant> getAll() {
        return restaurantRepository.findAll();
    }

    @Override
    public Optional<Restaurant> getById(String resid) {
        return restaurantRepository.findById(resid);
    }

    @Override
    public void delete(String resid) {
        restaurantRepository.deleteById(resid);
    }

    @Override
    public List<Restaurant> getEnabledRestaurants() {
        return restaurantRepository.findByEnabledTrue();
    }

    @Override
    public Restaurant updateRestaurantStatus(String id, boolean enabled) {
        Restaurant restaurant = restaurantRepository.findById(id).orElseThrow();
        restaurant.setEnabled(enabled);
        return restaurantRepository.save(restaurant);
    }

    @Override
    public Optional<Restaurant> getByName(String restaurantName) {
        return restaurantRepository.findByRestaurantName(restaurantName);
    }

    @Override
    public List<Restaurant> getEnabledRestaurantsByOwnerEmail(String ownerEmailId) {
        return restaurantRepository.findByEnabledTrueAndOwnerEmailId(ownerEmailId);
    }


}
