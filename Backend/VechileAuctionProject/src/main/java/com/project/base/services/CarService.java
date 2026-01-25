package com.project.base.services;

import com.project.base.dto.ApiResponse;
import com.project.base.dto.CarDto;

//import io.swagger.v3.oas.annotat/ions.responses.ApiResponse;

public interface CarService {
		ApiResponse addNewCar(CarDto carDto);
}
