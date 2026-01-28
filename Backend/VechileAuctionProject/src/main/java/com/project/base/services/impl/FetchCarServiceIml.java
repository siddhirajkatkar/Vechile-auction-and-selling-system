package com.project.base.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.base.dto.CarResponseDto;
import com.project.base.pojo.Car;
import com.project.base.pojo.CarImage;
import com.project.base.repository.CarRepository;
import com.project.base.services.FetchCarService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FetchCarServiceIml implements FetchCarService  {
		
	private final CarRepository carRepository;
	@Override
	@Transactional(readOnly = true)
	public List<CarResponseDto> getAllCars() {
	    return carRepository.findAll().stream().map(car -> {
	        CarResponseDto dto = new CarResponseDto();
	        dto.setId(car.getId());
	        dto.setRegistration_no(car.getRegistration_no());
	        dto.setBrand(car.getBrand());
	        dto.setModel(car.getModel());
	        dto.setManufacture_year(car.getManufacture_year());
	        dto.setFuel_type(car.getFuel_type());
	        dto.setTransmission(car.getTransmission());
	        dto.setMileage(car.getMileage());
	        dto.setColor(car.getColor());
	        dto.setEngine_cc(car.getEngine_cc());
	        dto.setPrice(car.getPrice());
	        dto.setDescription(car.getDescription());
	        dto.setSale_type(car.getSale_type());

	        List<CarImage> imageDtos = car.getImages().stream().map(img -> {
	            CarImage imgDto = new CarImage();
	            imgDto.setId(img.getId());
	            imgDto.setImageUrl(img.getImageUrl());
	            return imgDto;
	        }).toList();

	        dto.setImages(imageDtos);

	        return dto;
	    }).toList();
	}

	
}
