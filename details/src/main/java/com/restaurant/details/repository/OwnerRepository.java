package com.restaurant.details.repository;

import com.restaurant.details.model.Owner;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OwnerRepository extends MongoRepository<Owner, String> {
    Owner findByEmailId(String emailId);
}
