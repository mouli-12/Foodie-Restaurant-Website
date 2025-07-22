package com.restaurant.details.controller;

import com.restaurant.details.model.Order;
import com.restaurant.details.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.placeOrder(order));
    }

    @GetMapping("/history/{emailId}")
    public ResponseEntity<List<Order>> getOrderHistory(@PathVariable String emailId) {
        return ResponseEntity.ok(orderService.getOrderHistory(emailId));
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable String orderId, @RequestParam String status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, status));
    }

    @GetMapping("/owner")
    public ResponseEntity<List<Order>> getOwnerOrders(
            @RequestParam String ownerEmail,
            @RequestParam(required = false) String status) {

        if (status != null) {
            return ResponseEntity.ok(orderService.getOwnerOrdersByStatus(ownerEmail, status));
        }
        return ResponseEntity.ok(orderService.getOwnerOrders(ownerEmail));
    }
}
