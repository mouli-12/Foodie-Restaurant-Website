package com.restaurant.details.controller;

import com.restaurant.details.model.Owner;
import com.restaurant.details.model.Restaurant;
import com.restaurant.details.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;     // ← Jakarta import here!

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/owner")
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    @PostMapping("/register")
    public ResponseEntity<Owner> createOwner(@RequestBody Owner owner) {
        if (owner.getRestaurant() == null) {
            owner.setRestaurant(new Restaurant());
        }
        Owner saved = ownerService.createOwner(owner);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/getOwnerProfile")
    public ResponseEntity<Owner> getOwnerProfile(HttpServletRequest request) {
        String presentUserEmailId = (String) request.getAttribute("presentUserEmailId");
        return new ResponseEntity<>(
                ownerService.getCurrentOwner(presentUserEmailId),
                HttpStatus.OK
        );
    }

    @PutMapping("/addRestaurant")
    public ResponseEntity<Owner> addRestaurantToOwner(
            @RequestBody Restaurant restaurant,
            HttpServletRequest request) {

        String presentUserEmailId = (String) request.getAttribute("presentUserEmailId");
        return new ResponseEntity<>(
                ownerService.addRestaurant(presentUserEmailId, restaurant),
                HttpStatus.OK
        );
    }
}
