package com.project.base.services;

import com.project.base.dto.AuthRequestDto;
import com.project.base.dto.AuthResponseDto;

public interface UserService {
	AuthResponseDto authenticate(AuthRequestDto dto);
	

}
