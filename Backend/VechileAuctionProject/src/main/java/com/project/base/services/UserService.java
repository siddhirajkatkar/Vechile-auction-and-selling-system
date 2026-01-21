package com.project.base.services;

import com.project.base.dto.AuthRequestDto;
import com.project.base.dto.AuthResponseDto;
import com.project.base.dto.UserDTO;
import com.project.base.exception.ApiException;

public interface UserService {
	AuthResponseDto authenticate(AuthRequestDto dto);
	
	public String RegisterUser(UserDTO userDto) throws ApiException ;

}
