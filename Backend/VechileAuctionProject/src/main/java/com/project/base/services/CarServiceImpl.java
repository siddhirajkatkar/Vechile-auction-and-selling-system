package com.project.base.services;

import java.io.IOException;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.project.base.dto.ApiResponse;
import com.project.base.dto.CarDto;
import com.project.base.exception.ApiException;
import com.project.base.pojo.Car;
import com.project.base.pojo.CarImage;
import com.project.base.pojo.Status;
import com.project.base.pojo.User;
import com.project.base.repository.CarRepository;
import com.project.base.repository.UserRepository;
import com.project.base.services.impl.ImageStorageService;

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
	private final ImageStorageService imageService;
	
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
	
	public ApiResponse addNewCar(CarDto carDto,MultipartFile[] images) throws IOException {

	    Authentication auth =
	        SecurityContextHolder.getContext().getAuthentication();

	    String email = auth.getName();

	    User seller = userRepository.findByEmail("sanketpawar1518@gmail.com")
	        .orElseThrow(() -> new ApiException("User not found"));

	    Car car = modelMapper.map(carDto, Car.class);
	    car.setSeller(seller);
	    car.setStatus(Status.PENDING_APPROVAL);

	    carRepository.save(car);
	    
	    List<String> imageUrls = imageService.storeImages(images);
	    // loop attach or store as needed
	    for (String url : imageUrls) {
	        CarImage ci = new CarImage(); ci.setImageUrl(url); ci.setCar(car);
	        car.getImages().add(ci);
	    }

	    return new ApiResponse("Car added successfully");
	}

	
	

}
