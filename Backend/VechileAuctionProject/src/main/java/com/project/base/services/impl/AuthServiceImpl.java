package com.project.base.services.impl;

import java.util.Set;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.base.dto.AuthRequestDto;
import com.project.base.dto.AuthResponseDto;
import com.project.base.pojo.Role;
import com.project.base.pojo.User;
import com.project.base.repository.UserRepository;
import com.project.base.security.JwtUtil;
import com.project.base.services.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Override
    public AuthResponseDto authenticate(AuthRequestDto request) {

        // 1️⃣ Authenticate credentials using Spring Security
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        // 2️⃣ Generate JWT after successful authentication
        String token = jwtUtil.createToken(authentication);

        // 3️⃣ Load full User entity from DB
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found with email: " + request.getEmail())
                );

        // 4️⃣ Extract primary role (for navigation / response)
        Role role = user.getRoles()
                .stream()
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException("Role not assigned to user")
                );

        // 5️⃣ Build and return response DTO
        return new AuthResponseDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                role.getRoleName().name(),
                "Login successful"
        );
    }
}
