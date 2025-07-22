package com.authentication.uoa.services;

import com.authentication.uoa.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class GenerateJwtImpl implements GenerateJwt {

    @Override
    public Map<String, String> generateToken(User user) {
        Map<String, String> result = new HashMap<>();

        String jwt = Jwts.builder()
                .setSubject(user.getEmailId())              // subject = user's emailId
                .setIssuer("auth-app")                       // issuer
                .claim("userEmailId", user.getEmailId())     // custom claim
                .claim("userRole", user.getRole()).claim("userName",user.getUserName())          // custom claim
                .signWith(SignatureAlgorithm.HS256, "secretKey") // secret key
                .compact();

        result.put("token", jwt);
        return result;
    }
    public String generateTokenWithApprovalStatus(User user) {
        // Create a JWT token and include the approval status in the payload
        String token = Jwts.builder()
                .setSubject(user.getEmailId())
                .claim("userRole", user.getRole())
                .claim("userName",user.getUserName())
                .claim("approvalStatus", user.getApprovalStatus().toString())  // Include approval status
                .claim("password",user.getPassword())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))  // 1 hour expiration
                .signWith(SignatureAlgorithm.HS256, "secretKey")
                .compact();

        return token;
    }

}
