package com.restaurant.details.service;

import com.restaurant.details.model.Owner;
import com.restaurant.details.model.Restaurant;

public interface OwnerService {

    Owner createOwner(Owner owner);

    Owner getCurrentOwner(String emailId);

    Owner addRestaurant(String emailId, Restaurant restaurant);
}
