package com.authentication.uoa.model;

import jakarta.persistence.*;

@Entity
public class User {

    public enum ApprovalStatus {
        PENDING,
        ACCEPTED,
        DECLINED
    }

    @Id
    @Column(nullable = false, unique = true)
    private String emailId;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String password;

    private String address;

    @Column(nullable = false)
    private String role;

    @Column(name = "phone_number", length = 15)
    private String phNumber;

    @Enumerated(EnumType.STRING)
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING;

    public User() {
    }

    public User(String emailId, String userName, String password, String address, String role, String phNumber, ApprovalStatus approvalStatus) {
        this.emailId = emailId;
        this.userName = userName;
        this.password = password;
        this.address = address;
        this.role = role;
        this.phNumber = phNumber;
        this.approvalStatus = approvalStatus;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPhNumber() {
        return phNumber;
    }

    public void setPhNumber(String phNumber) {
        this.phNumber = phNumber;
    }

    public ApprovalStatus getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(ApprovalStatus approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    @Override
    public String toString() {
        return "User{" +
                "emailId='" + emailId + '\'' +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", address='" + address + '\'' +
                ", role='" + role + '\'' +
                ", phNumber='" + phNumber + '\'' +
                ", approvalStatus=" + approvalStatus +
                '}';
    }
}
