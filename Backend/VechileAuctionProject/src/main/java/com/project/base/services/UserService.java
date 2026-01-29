package com.project.base.services;

import java.util.List;

import com.project.base.dto.UserDTO;
import com.project.base.exception.ApiException;
import com.project.base.pojo.User;
import com.project.base.pojo.UserStatus;

public interface UserService {

    String registerUser(UserDTO userDto) throws ApiException;

    User getCurrentUser(); 
    List<User> getAllUsers();
    void updateUserStatus(Long userId, UserStatus status); // Active/InActive
}
    // ✅ ADD THIS


