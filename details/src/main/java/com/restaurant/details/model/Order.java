package com.restaurant.details.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {
    @Id
    private String orderId;

    private String emailId;
    private String restaurantId;
    private String restaurantName;
    private List<OrderItem> items;
    private double totalAmount;
    private LocalDateTime orderTime;
    private String status; // e.g., PLACED, PAID, CANCELLED


}
