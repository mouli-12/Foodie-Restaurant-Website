package com.restaurant.details.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "restaurants")
public class Restaurant {

    @Id
    private String resid;

    @Indexed(unique = true)
    private String restaurantName;
    private String restaurantImage;
    private String cuisine;
    private String rating;
    private List<Items> itemDetails;
    private String address;
    private boolean enabled;
    private String ownerEmailId;

    // No-args constructor
    public Restaurant() {
    }

    public Restaurant(String resid, String restaurantName, String restaurantImage, String cuisine, String rating, List<Items> itemDetails, String address, boolean enabled, String ownerEmailId) {
        this.resid = resid;
        this.restaurantName = restaurantName;
        this.restaurantImage = restaurantImage;
        this.cuisine = cuisine;
        this.rating = rating;
        this.itemDetails = itemDetails;
        this.address = address;
        this.enabled = enabled;
        this.ownerEmailId = ownerEmailId;
    }

    public String getResid() {
        return resid;
    }

    public void setResid(String resid) {
        this.resid = resid;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getRestaurantImage() {
        return restaurantImage;
    }

    public void setRestaurantImage(String restaurantImage) {
        this.restaurantImage = restaurantImage;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public List<Items> getItemDetails() {
        return itemDetails;
    }

    public void setItemDetails(List<Items> itemDetails) {
        this.itemDetails = itemDetails;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getOwnerEmailId() {
        return ownerEmailId;
    }

    public void setOwnerEmailId(String ownerEmailId) {
        this.ownerEmailId = ownerEmailId;
    }

    @Override
    public String toString() {
        return "Restaurant{" +
                "resid='" + resid + '\'' +
                ", restaurantName='" + restaurantName + '\'' +
                ", restaurantImage='" + restaurantImage + '\'' +
                ", cuisine='" + cuisine + '\'' +
                ", rating='" + rating + '\'' +
                ", itemDetails=" + itemDetails +
                ", address='" + address + '\'' +
                ", enabled=" + enabled +
                ", ownerEmailId='" + ownerEmailId + '\'' +
                '}';
    }
}
