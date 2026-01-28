package com.project.base.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.base.services.FetchCarService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user/cars")
@CrossOrigin(origins = "*")

@RequiredArgsConstructor
public class FetchcarController {
	
	private final FetchCarService fetchAllCarRepository;
	
	
	 @GetMapping("/getcars")
	    public ResponseEntity<?> getAllCars(){
	        return ResponseEntity.ok(fetchAllCarRepository.getAllCars());
	    }
}
