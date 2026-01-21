package com.project.base.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.base.dto.UserDTO;
import com.project.base.services.UserService;
import com.project.base.services.UserServicesImpl;

@RestController
public class UserController {
	@Autowired
	private UserService userService;
	@PostMapping
	public ResponseEntity<?> RegisterUser(@RequestBody UserDTO userDto){
		
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(userService.RegisterUser(userDto));
		
	}
		
}
