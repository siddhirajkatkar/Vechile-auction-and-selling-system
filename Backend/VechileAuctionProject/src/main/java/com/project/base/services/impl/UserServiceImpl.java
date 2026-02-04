package com.project.base.services.impl;

import com.project.base.dto.UserDTO;
import com.project.base.exception.ApiException;
import com.project.base.pojo.Role;
import com.project.base.pojo.RoleName;
import com.project.base.pojo.User;
import com.project.base.pojo.UserStatus;
import com.project.base.repository.RoleRepository;
import com.project.base.repository.UserRepository;
import com.project.base.security.MyUserDetails;
import com.project.base.services.UserService;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service; // ✅ CRITICAL IMPORT

@Service
@Transactional 
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository; 

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof MyUserDetails) {
            return ((MyUserDetails) authentication.getPrincipal()).getUser();
        }
        return null;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void promoteToAdmin(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Role adminRole = roleRepository.findByRoleName(RoleName.ROLE_ADMIN)
            .orElseThrow(() -> new RuntimeException("Role ROLE_ADMIN not found in database"));

        user.getRoles().add(adminRole);

        userRepository.save(user);
    }

    @Override
    public void resetPassword(String email, String newPassword) throws ApiException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public void updateUserStatus(Long userId, UserStatus status) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus(status);
        userRepository.save(user);
    }

    @Override
    public String registerUser(UserDTO userDto) {
        return "User Registered";
    }
}