package com.restaurant.details.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.web.filter.GenericFilterBean;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;

public class JwtFilter extends GenericFilterBean {

    private static final String SECRET_KEY = "secretKey";

    @Override
    public void doFilter(ServletRequest servletRequest,
                         ServletResponse servletResponse,
                         FilterChain filterChain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;


        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }
        System.out.println("request"+request.toString());
        String authHeader = request.getHeader("Authorization");
        System.out.println("authHeader"+authHeader);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ServletException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);

        // Use parser() if parserBuilder() isn't available in your version
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)      // String key is okay in 0.9.x
                .parseClaimsJws(token)
                .getBody();

        String presentUserEmailId = claims.get("userEmailId", String.class);
        String presentUserRole    = claims.get("userRole", String.class);

        request.setAttribute("presentUserEmailId", presentUserEmailId);
        request.setAttribute("presentUserRole", presentUserRole);

        filterChain.doFilter(servletRequest, servletResponse);
    }


}
