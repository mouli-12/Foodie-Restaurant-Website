package com.authentication.uoa.services;


import com.authentication.uoa.model.User;
import com.authentication.uoa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User signup(User user) {
        if ("owner".equalsIgnoreCase(user.getRole())) {
            user.setApprovalStatus(User.ApprovalStatus.PENDING);
        } else {
            user.setApprovalStatus(User.ApprovalStatus.ACCEPTED);
        }
        return userRepository.save(user);
    }

    @Override
    public User login(User user) {
        User dbUser = userRepository.findByEmailIdAndPassword(user.getEmailId(), user.getPassword());
        if (dbUser != null) {
            if ("owner".equalsIgnoreCase(dbUser.getRole()) && dbUser.getApprovalStatus() != User.ApprovalStatus.ACCEPTED) {
                return null; // Owner needs admin approval
            }
        }
        return dbUser;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getPendingOwners() {
        return userRepository.findByRoleAndApprovalStatus("owner", User.ApprovalStatus.PENDING);
    }

    @Override
    public User updateApprovalStatus(String email, String status) {
        Optional<User> optionalUser = userRepository.findById(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setApprovalStatus(User.ApprovalStatus.valueOf(status.toUpperCase()));
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }
}
