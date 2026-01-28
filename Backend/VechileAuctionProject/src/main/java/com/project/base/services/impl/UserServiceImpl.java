package com.project.base.services.impl;

import com.project.base.dto.UserDTO;
import com.project.base.pojo.User;
import com.project.base.repository.UserRepository;
import com.project.base.security.MyUserDetails;
import com.project.base.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service; // ✅ CRITICAL IMPORT

@Service // ✅ THIS ANNOTATION IS MANDATORY
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

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
    public String registerUser(UserDTO userDto) {
        // Your registration logic here
        return "User Registered";
    }
}