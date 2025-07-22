package com.authentication.uoa.controller;


import com.authentication.uoa.model.User;
import com.authentication.uoa.model.UserResponse;
import com.authentication.uoa.services.GenerateJwt;
import com.authentication.uoa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    public GenerateJwt generateJwt;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        return new ResponseEntity<>(userService.signup(user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User resultUser = userService.login(user);
        if (resultUser != null) {
            // Adding approval status in the JWT payload
            return new ResponseEntity<>(generateJwt.generateTokenWithApprovalStatus(resultUser), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Login Failed or Need Admin Approval", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers()
                .stream()
                .map(user -> new UserResponse(
                        user.getEmailId(),
                        user.getAddress(),
                        user.getPhNumber(),
                        user.getRole(),
                        user.getUserName()
                ))
                .collect(Collectors.toList());

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/pending-owners")
    public ResponseEntity<List<User>> getPendingOwners() {
        return new ResponseEntity<>(userService.getPendingOwners(), HttpStatus.OK);
    }

    @PutMapping("/update-approval/{email}")
    public ResponseEntity<User> updateApprovalStatus(@PathVariable String email, @RequestParam String status) {
        return new ResponseEntity<>(userService.updateApprovalStatus(email, status), HttpStatus.OK);
    }



}
