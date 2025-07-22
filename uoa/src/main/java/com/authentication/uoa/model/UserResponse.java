package com.authentication.uoa.model;

public class UserResponse {
    private String emailId;
    private String address;
    private String phNumber;
    private String role;
    private String userName;

    public UserResponse() {
    }

    public UserResponse(String emailId, String address, String phNumber, String role, String userName) {
        this.emailId = emailId;
        this.address = address;
        this.phNumber = phNumber;
        this.role = role;
        this.userName = userName;
    }

    // Getters
    public String getEmailId() {
        return emailId;
    }

    public String getAddress() {
        return address;
    }

    public String getPhNumber() {
        return phNumber;
    }

    public String getRole() {
        return role;
    }

    public String getUserName() {
        return userName;
    }
}
