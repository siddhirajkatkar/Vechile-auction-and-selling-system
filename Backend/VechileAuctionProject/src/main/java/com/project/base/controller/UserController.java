package com.project.base.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.base.dto.UserDTO;
import com.project.base.exception.ApiException;
import com.project.base.services.UserService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
@Validated
@Slf4j
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDTO userDto)
            throws ApiException {

        log.info("REGISTER REQUEST RECEIVED FOR EMAIL: {}", userDto.getEmail());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.registerUser(userDto));
    }

    @GetMapping("/ping")
    public String ping() {
        return "Server is running!";
    }
}
