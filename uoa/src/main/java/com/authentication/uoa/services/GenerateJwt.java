package com.authentication.uoa.services;

import com.authentication.uoa.model.User;

import java.util.Map;

public interface GenerateJwt {

    public abstract Map<String, String> generateToken (User user);

    public String generateTokenWithApprovalStatus(User user);
}
