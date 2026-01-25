package com.project.base.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.base.dto.ApiResponse;
import com.project.base.dto.CarDto;
import com.project.base.exception.ApiException;
import com.project.base.pojo.Car;
import com.project.base.pojo.User;
import com.project.base.repository.CarRepository;
import com.project.base.repository.UserRepository;

//import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor

public class CarServiceImpl implements CarService{
	@Autowired
	private  ModelMapper modelMapper;
	private final UserRepository userRepository;
	private final CarRepository carRepository;
	
	
//	public ApiResponse addNewCar(CarDto carDto,Long sellerId) {
//		
//		Car car=modelMapper.map(carDto, Car.class);
//		User seller=userRepository.findById(sellerId)
//				.orElseThrow(()->new ApiException("User Not found") );
//		car.setSeller(seller);
//		carRepository.save(car);
//		
//		return null;
//	}
	
	public ApiResponse addNewCar(CarDto carDto) {

	    Authentication auth =
	        SecurityContextHolder.getContext().getAuthentication();

	    String email = auth.getName();

	    User seller = userRepository.findByEmail(email)
	        .orElseThrow(() -> new ApiException("User not found"));

	    Car car = modelMapper.map(carDto, Car.class);
	    car.setSeller(seller);

	    carRepository.save(car);

	    return new ApiResponse("Car added successfully");
	}

	
	

}
