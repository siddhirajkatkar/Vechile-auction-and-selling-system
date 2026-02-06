package com.project.base.services;

import com.project.base.dto.AuthRequestDto;
import com.project.base.dto.AuthResponseDto;
import com.project.base.pojo.User;

public interface AuthService {
    AuthResponseDto authenticate(AuthRequestDto request);
    void register(User user);



}
