package com.restaurant.details.service;

import com.restaurant.details.model.Order;

import java.util.List;

public interface OrderService {
    Order placeOrder(Order order);
    List<Order> getOrderHistory(String emailId);
    Order updateOrderStatus(String orderId, String status);
    List<Order> getOwnerOrders(String ownerEmail);
    List<Order> getOwnerOrdersByStatus(String ownerEmail, String status);
}
