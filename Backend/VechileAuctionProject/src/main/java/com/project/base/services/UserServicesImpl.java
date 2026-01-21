package com.project.base.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.base.dto.AuthRequestDto;
import com.project.base.dto.AuthResponseDto;
import com.project.base.dto.UserDTO;
import com.project.base.exception.ApiException;
import com.project.base.pojo.User;
import com.project.base.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServicesImpl implements UserService {
	
	@Autowired
	public UserRepository userRepository;
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
	
	
	
	
	public String RegisterUser(UserDTO userDto) {
		
		if(userRepository.existsByEmail(userDto.getEmail()))
			throw new ApiException("Email Alredy Exist");
		
		User user=modelMapper.map(userDto,User.class);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		
		User userPersistentEntity=userRepository.save(user);
		
		return "successfully register";
		
	}
	
	

}
