package com.project.base.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.base.dto.AuthRequestDto;
import com.project.base.services.UserService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
@Validated
@Slf4j
public class UserController {
	@Autowired
	private UserService userService;
	@PostMapping("/login")
	public ResponseEntity<?>authUser(@Valid @RequestBody AuthRequestDto user){
		System.out.println("LOGIN REQUEST RECEIVED: " + user.getEmail());
		return ResponseEntity.ok(userService.authenticate(user));
		
	}
	@GetMapping("/ping")
	public String ping() {
	    return "Server is running!";
	}

	

}
