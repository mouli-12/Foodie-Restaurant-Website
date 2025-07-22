package com.restaurant.details.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.restaurant.details.model.Restaurant;
import com.restaurant.details.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    // ➕ Create a new Restaurant
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Restaurant> createRestaurant(
            @RequestPart("restaurant") String restaurantJson,
            @RequestPart("restaurantImage") MultipartFile restaurantImage,
            @RequestPart("itemImages") MultipartFile[] itemImages) {

        try {
            ObjectMapper mapper = new ObjectMapper();
            Restaurant restaurant = mapper.readValue(restaurantJson, Restaurant.class);

            // Set enabled to false by default for new restaurants
            restaurant.setEnabled(false);

            // Convert images to Base64
            String base64RestaurantImage = Base64.getEncoder().encodeToString(restaurantImage.getBytes());
            restaurant.setRestaurantImage(base64RestaurantImage);

            for (int i = 0; i < restaurant.getItemDetails().size(); i++) {
                String itemImage = Base64.getEncoder().encodeToString(itemImages[i].getBytes());
                restaurant.getItemDetails().get(i).setItemImage(itemImage);
            }

            return ResponseEntity.ok(restaurantService.saveOrUpdate(restaurant));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ✏️ Update an existing Restaurant
    @PutMapping(value = "/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Restaurant> updateRestaurant(
            @RequestPart("restaurant") String restaurantJson,
            @RequestPart(value = "restaurantImage", required = false) MultipartFile restaurantImage,
            @RequestPart(value = "itemImages", required = false) MultipartFile[] itemImages) {

        System.out.println("✅ Update request received!");

        try {
            ObjectMapper mapper = new ObjectMapper();
            Restaurant updatedRestaurant = mapper.readValue(restaurantJson, Restaurant.class);

            // Fetch existing restaurant using name
            Optional<Restaurant> existingOpt = restaurantService.getByName(updatedRestaurant.getRestaurantName());
            if (existingOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            // Set resid from existing
            updatedRestaurant.setResid(existingOpt.get().getResid());

            // Restaurant image update
            if (restaurantImage != null && !restaurantImage.isEmpty()) {
                String base64RestaurantImage = Base64.getEncoder().encodeToString(restaurantImage.getBytes());
                updatedRestaurant.setRestaurantImage(base64RestaurantImage);
            } else {
                updatedRestaurant.setRestaurantImage(existingOpt.get().getRestaurantImage());
            }

            // Item images update
            if (itemImages != null && itemImages.length > 0) {
                for (int i = 0; i < updatedRestaurant.getItemDetails().size(); i++) {
                    if (i < itemImages.length && itemImages[i] != null && !itemImages[i].isEmpty()) {
                        String itemImage = Base64.getEncoder().encodeToString(itemImages[i].getBytes());
                        updatedRestaurant.getItemDetails().get(i).setItemImage(itemImage);
                    } else {
                        updatedRestaurant.getItemDetails().get(i).setItemImage(
                                existingOpt.get().getItemDetails().get(i).getItemImage()
                        );
                    }
                }
            } else {
                for (int i = 0; i < updatedRestaurant.getItemDetails().size(); i++) {
                    updatedRestaurant.getItemDetails().get(i).setItemImage(
                            existingOpt.get().getItemDetails().get(i).getItemImage()
                    );
                }
            }

            return ResponseEntity.ok(restaurantService.saveOrUpdate(updatedRestaurant));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }


    // 📄 Get all Restaurants
    @GetMapping
    public ResponseEntity<List<Restaurant>> listRestaurants() {
        List<Restaurant> all = restaurantService.getAll();
        return ResponseEntity.ok(all);
    }

    // 🔍 Get one Restaurant by resid
    @GetMapping("/{resid}")
    public ResponseEntity<Restaurant> getRestaurant(@PathVariable String resid) {
        return restaurantService.getById(resid)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ❌ Delete a Restaurant
    @DeleteMapping("/{resid}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable String resid) {
        if (!restaurantService.getById(resid).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        restaurantService.delete(resid);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/enabled")
    public List<Restaurant> getEnabledRestaurants() {
        return restaurantService.getEnabledRestaurants();
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<Restaurant> toggleVisibility(@PathVariable String id, @RequestParam boolean enabled) {
        Restaurant updated = restaurantService.updateRestaurantStatus(id, enabled);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/enabled/by-owner")
    public ResponseEntity<List<Restaurant>> getEnabledRestaurantsByOwner(@RequestParam String ownerEmailId) {
        List<Restaurant> restaurants = restaurantService.getEnabledRestaurantsByOwnerEmail(ownerEmailId);
        return ResponseEntity.ok(restaurants);
    }
}
