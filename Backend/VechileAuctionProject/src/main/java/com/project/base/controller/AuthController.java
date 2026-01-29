package com.project.base.controller;

import com.project.base.dto.*;
import com.project.base.pojo.*;
import com.project.base.repository.*;
import com.project.base.security.JwtUtil;
import com.project.base.security.MyUserDetails;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.AuthenticationException;


@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    @Autowired private AuthenticationManager authManager;
    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private RoleRepository roleRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequestDto request) {
        try {
            log.info("🔐 LOGIN attempt for email={}", request.getEmail());

            Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
                )
            );

            MyUserDetails userDetails = (MyUserDetails) auth.getPrincipal();
            User user = userDetails.getUser();

            log.info("✅ Authentication successful for {}", user.getEmail());
            log.info("🛡️ Authorities = {}", userDetails.getAuthorities());

            String token = jwtUtil.generateToken(auth);

            // 🔎 VERY IMPORTANT DEBUG
            log.info("🎟️ JWT TOKEN = {}", token);
            log.info("🎟️ JWT PARTS = {}", token.split("\\.").length);

            return ResponseEntity.ok(
                new AuthResponseDto(
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getRoles()
                        .stream()
                        .findFirst()
                        .map(r -> r.getRoleName().name())
                        .orElse("ROLE_UNKNOWN"),
                    token,
                    "Login Successful"
                )
            );

        } catch (BadCredentialsException e) {
            log.warn("❌ Bad credentials for {}", request.getEmail());
            return ResponseEntity
                .status(401)
                .body(new ApiResponse("Invalid Email or Password"));

        } catch (AuthenticationException e) {
            log.error("❌ Authentication failed: {}", e.getMessage());
            return ResponseEntity
                .status(401)
                .body(new ApiResponse("Authentication failed: " + e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        // 1️⃣ Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 2️⃣ FORCE DEFAULT ROLE = ROLE_BUYER
        Role buyerRole = roleRepository
                .findByRoleName(RoleName.ROLE_BUYER)
                .orElseThrow(() ->
                    new RuntimeException("Error: ROLE_BUYER not found in DB")
                );

        Set<Role> roles = new HashSet<>();
        roles.add(buyerRole);
        user.setRoles(roles);

        // 3️⃣ Save user
        userRepo.save(user);

        return ResponseEntity.ok(
                new ApiResponse("User registered successfully as BUYER")
        );
    }

    @GetMapping("/ping")
    @PreAuthorize("hasAuthority('ROLE_BUYER')")
    public String ping() {

        log.info("📡 /ping HIT");

        log.info("👤 Authenticated principal = {}",
            SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal()
        );

        log.info("🛡️ Current Authorities = {}",
            SecurityContextHolder.getContext()
                .getAuthentication()
                .getAuthorities()
        );

        return "Server is running!";
    }
}
