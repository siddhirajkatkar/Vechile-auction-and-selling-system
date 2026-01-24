package com.project.base.services;

import com.project.base.dto.AuthRequestDto;
import com.project.base.dto.AuthResponseDto;

public interface AuthService {
    AuthResponseDto authenticate(AuthRequestDto request);


}
