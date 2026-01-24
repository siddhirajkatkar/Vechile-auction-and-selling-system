package com.project.base.services.impl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.base.dto.UserDTO;
import com.project.base.exception.ApiException;
import com.project.base.pojo.Role;
import com.project.base.pojo.RoleName;
import com.project.base.pojo.User;
import com.project.base.pojo.UserStatus;
import com.project.base.repository.RoleRepository;
import com.project.base.repository.UserRepository;
import com.project.base.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String registerUser(UserDTO userDto) {

        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new ApiException("Email already exists");
        }

        RoleName roleName =
                userDto.getRole() != null
                        ? userDto.getRole()
                        : RoleName.ROLE_BUYER;

        if (roleName == RoleName.ROLE_ADMIN) {
            throw new ApiException("Admin registration not allowed");
        }

        Role role = roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new ApiException("Role not found"));

        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setStatus(UserStatus.ACTIVE);
        user.getRoles().add(role);

        userRepository.save(user);

        return "User registered successfully";
    }

    @Override
    @Transactional(readOnly = true)
    public User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
