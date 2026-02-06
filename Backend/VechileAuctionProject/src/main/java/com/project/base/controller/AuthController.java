package com.project.base.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.project.base.dto.*;
import com.project.base.pojo.*;
import com.project.base.repository.*;
import com.project.base.services.AuthService;
import com.project.base.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(
            @RequestBody @Valid AuthRequestDto request) {

        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(
            @RequestParam String email,
            @RequestParam String newPassword) {

        userService.resetPassword(email, newPassword);
        return ResponseEntity.ok(new ApiResponse("Password updated successfully"));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody User user) {

        authService.register(user);
        return ResponseEntity.ok(
                new ApiResponse("User registered successfully as BUYER")
        );
    }

    
}
