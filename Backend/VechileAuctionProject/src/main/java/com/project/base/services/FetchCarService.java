package com.project.base.services;

import java.util.List;

import com.project.base.dto.CarResponseDto;
import com.project.base.pojo.Car;

//import com.project.base.pojo;
//import io.swagger.v3.oas.annotations.responses.ApiResponse;

public interface FetchCarService {

//		public List<Car> getAllCar();

		List<CarResponseDto> getAllCars();
}
