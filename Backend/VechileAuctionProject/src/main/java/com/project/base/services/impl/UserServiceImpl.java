package com.project.base.services.impl;

import com.project.base.dto.UserDTO;
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
@Transactional // Ensures database changes are committed
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository; // Needed to fetch the Role object

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
        // This feeds your React 'users' state
        return userRepository.findAll();
    }

    @Override
    public void promoteToAdmin(Long userId) {
        // 1. Find user
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Fetch Role entity (RoleName.ROLE_ADMIN matches your enum)
        Role adminRole = roleRepository.findByRoleName(RoleName.ROLE_ADMIN)
            .orElseThrow(() -> new RuntimeException("Role ROLE_ADMIN not found in database"));

        // 3. Add Role object to the Set<Role> (Fixes your Type Mismatch error)
        user.getRoles().add(adminRole);

        // 4. Save
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
        // Implement logic to map DTO to Entity and save
        return "User Registered";
    }
}