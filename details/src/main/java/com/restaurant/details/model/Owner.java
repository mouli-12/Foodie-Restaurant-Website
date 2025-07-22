package com.restaurant.details.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Owner {

    @Id
    private String emailId;

    private String userName;

    private String password;

    private String phNumber;

    private List<String> restaurantIds;
    private Restaurant restaurant;

    // No-args constructor
    public Owner() {
    }

    // Parameterized constructor


    public Owner(String emailId, String userName, String password, String phNumber, List<String> restaurantIds, Restaurant restaurant) {
        this.emailId = emailId;
        this.userName = userName;
        this.password = password;
        this.phNumber = phNumber;
        this.restaurantIds = restaurantIds;
        this.restaurant = restaurant;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhNumber() {
        return phNumber;
    }

    public void setPhNumber(String phNumber) {
        this.phNumber = phNumber;
    }

    public List<String> getRestaurantIds() {
        return restaurantIds;
    }

    public void setRestaurantIds(List<String> restaurantIds) {
        this.restaurantIds = restaurantIds;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    @Override
    public String toString() {
        return "Owner{" +
                "emailId='" + emailId + '\'' +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", phNumber='" + phNumber + '\'' +
                ", restaurantIds=" + restaurantIds +
                ", restaurant=" + restaurant +
                '}';
    }
}
