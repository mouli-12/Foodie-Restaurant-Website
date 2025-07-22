package com.restaurant.details.service;

import com.restaurant.details.model.Order;
import com.restaurant.details.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order placeOrder(Order order) {
        order.setOrderTime(LocalDateTime.now());
        order.setStatus("PENDING"); // Initially pending
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getOrderHistory(String emailId) {
        return orderRepository.findByEmailId(emailId);
    }

    @Override
    public Order updateOrderStatus(String orderId, String status) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus(status);
            return orderRepository.save(order);
        }
        return null;
    }

    @Override
    public List<Order> getOwnerOrders(String ownerEmail) {
        return orderRepository.findByRestaurantOwnerEmail(ownerEmail);
    }

    @Override
    public List<Order> getOwnerOrdersByStatus(String ownerEmail, String status) {
        return orderRepository.findByRestaurantNameAndStatus(ownerEmail, status);
    }
}
