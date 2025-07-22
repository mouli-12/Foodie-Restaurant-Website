package com.restaurant.details.service;

import com.restaurant.details.model.Owner;
import com.restaurant.details.model.Restaurant;
import com.restaurant.details.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OwnerServicesImpl implements OwnerService {

    @Autowired
    private OwnerRepository ownerRepository;

    @Override
    public Owner createOwner(Owner owner) {
        return ownerRepository.save(owner);
    }

    @Override
    public Owner getCurrentOwner(String emailId) {
        Optional<Owner> ownerOptional = ownerRepository.findById(emailId);
        return ownerOptional.orElse(null);
    }

    @Override
    public Owner addRestaurant(String emailId, Restaurant restaurant) {
        Optional<Owner> ownerOptional = ownerRepository.findById(emailId);
        if (ownerOptional.isPresent()) {
            Owner owner = ownerOptional.get();
            owner.setRestaurant(restaurant);
            return ownerRepository.save(owner);
        }
        return null;
    }
}
