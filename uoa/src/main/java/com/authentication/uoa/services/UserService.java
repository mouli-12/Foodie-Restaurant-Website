package com.authentication.uoa.services;

import com.authentication.uoa.model.User;

import java.util.List;

public interface UserService {

    public User signup(User user);


    public User login(User user);

    public List<User> getAllUsers();

    List<User> getPendingOwners();

    User updateApprovalStatus(String email, String status);
}
