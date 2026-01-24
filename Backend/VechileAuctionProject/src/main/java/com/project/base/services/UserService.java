package com.project.base.services;

import com.project.base.dto.UserDTO;
import com.project.base.exception.ApiException;
import com.project.base.pojo.User;

public interface UserService {

    String registerUser(UserDTO userDto) throws ApiException;

    User getCurrentUser();   // ✅ ADD THIS
}
