package com.project.base.services.impl;

import java.util.Set;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.base.dto.AuthRequestDto;
import com.project.base.dto.AuthResponseDto;
import com.project.base.pojo.Role;
import com.project.base.pojo.RoleName;
import com.project.base.pojo.User;
import com.project.base.repository.RoleRepository;
import com.project.base.repository.UserRepository;
import com.project.base.security.JwtUtil;
import com.project.base.services.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
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
                        new RuntimeException("User not found")
                );

        String role = user.getRoles()
                .stream()
                .findFirst()
                .map(r -> r.getRoleName().name())
                .orElse("ROLE_UNKNOWN");

        return new AuthResponseDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                role,
                token,
                "Login successful"
        );
    }

    @Override
    public void register(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role buyerRole = roleRepository
                .findByRoleName(RoleName.ROLE_BUYER)
                .orElseThrow(() ->
                        new RuntimeException("ROLE_BUYER not found")
                );

        user.setRoles(Set.of(buyerRole));
        userRepository.save(user);
    }
}
