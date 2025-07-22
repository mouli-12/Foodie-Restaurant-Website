package com.restaurant.details.model;

import org.springframework.data.annotation.Id;

public class Items {

    @Id
    private String itemId;
    private String itemName;
    private String itemPrice;
    private String itemRating;
    private String quantity;
    private String itemImage;

    // No-args constructor
    public Items() {
    }

    // Parameterized constructor

    public Items(String itemId, String itemName, String itemPrice, String itemRating, String quantity, String itemImage) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemRating = itemRating;
        this.quantity = quantity;
        this.itemImage = itemImage;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(String itemPrice) {
        this.itemPrice = itemPrice;
    }

    public String getItemRating() {
        return itemRating;
    }

    public void setItemRating(String itemRating) {
        this.itemRating = itemRating;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getItemImage() {
        return itemImage;
    }

    public void setItemImage(String itemImage) {
        this.itemImage = itemImage;
    }

    @Override
    public String toString() {
        return "Items{" +
                "itemId='" + itemId + '\'' +
                ", itemName='" + itemName + '\'' +
                ", itemPrice='" + itemPrice + '\'' +
                ", itemRating='" + itemRating + '\'' +
                ", quantity='" + quantity + '\'' +
                ", itemImage='" + itemImage + '\'' +
                '}';
    }
}
