package com.project.base.services;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.base.dto.AuthRequestDto;
import com.project.base.dto.AuthResponseDto;
import com.project.base.pojo.User;
import com.project.base.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServicesImpl implements UserService {
	
	public UserRepository userRepo;
	private final ModelMapper modelMapper;
	private PasswordEncoder passwordEncoder;

	@Override
	public AuthResponseDto authenticate(AuthRequestDto dto) {
		// TODO Auto-generated method stub
		User user=userRepo.findByEmail(dto.getEmail()).orElseThrow();
		
		AuthResponseDto authresp=modelMapper.map(user, AuthResponseDto.class);
		authresp.setMessage("Logged in Successfull");
		return authresp;
	}
	
	

}
