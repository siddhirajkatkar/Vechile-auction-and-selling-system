package com.project.base.services.impl;

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

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        String token = jwtUtil.generateToken(authentication);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found with email: " + request.getEmail())
                );

        Role role = user.getRoles()
                .stream()
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException("Role not assigned to user")
                );

        return new AuthResponseDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                role.getRoleName().name(),
                token,
                "Login successful"
        );
    }
}
