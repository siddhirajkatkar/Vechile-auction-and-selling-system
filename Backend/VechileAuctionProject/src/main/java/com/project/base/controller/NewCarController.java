package com.project.base.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.base.dto.CarDto;
import com.project.base.pojo.Car;
import com.project.base.security.MyUserDetails;
import com.project.base.services.CarService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user/cars")
@RequiredArgsConstructor
public class NewCarController {
		
	private final CarService carService;
//	@PostMapping("/addCar")
//	public ResponseEntity<?> addNewCar(@Valid @RequestBody CarDto carDto,@AuthenticationPrincipal MyUserDetails myUserDetaiService){
//		
//		Long sellerId=myUserDetaiService.getId();
//		
//		return ResponseEntity.status(HttpStatus.CREATED)
//				.body(carService.addNewCar(carDto,sellerId));
//		
//	}
	
	@PostMapping("/addcar")
	public ResponseEntity<?> addNewCar(
	        @Valid @RequestBody CarDto carDto) {

	    return ResponseEntity.status(HttpStatus.CREATED)
	            .body(carService.addNewCar(carDto));
	}

}
