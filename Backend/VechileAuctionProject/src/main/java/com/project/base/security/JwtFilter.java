package com.project.base.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("🔐 JwtFilter HIT → "
                + request.getMethod() + " " + request.getRequestURI());

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("⛔ No Authorization header found");
            filterChain.doFilter(request, response);
            return;
        }

        if (!authHeader.startsWith("Bearer ")) {
            System.out.println("⛔ Authorization header does not start with Bearer");
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(7).replaceAll("\\s", "");
        System.out.println("✅ JWT extracted");

        try {
            String userEmail = jwtUtil.extractUsername(jwt);
            System.out.println("📧 Username extracted from token = " + userEmail);

            if (userEmail != null
                    && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(userEmail);

                System.out.println("👤 User loaded from DB = " + userDetails.getUsername());
                System.out.println("🛡️ Authorities = " + userDetails.getAuthorities());

                if (jwtUtil.isTokenValid(jwt)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("✅ Authentication set in SecurityContext");
                } else {
                    System.out.println("❌ JWT is NOT valid");
                }
            }

        } catch (Exception e) {
            System.err.println("❌ JWT Parse / Auth Error: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}
