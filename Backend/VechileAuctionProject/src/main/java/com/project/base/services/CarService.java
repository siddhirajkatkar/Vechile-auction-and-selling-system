package com.project.base.services;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.project.base.dto.ApiResponse;
import com.project.base.dto.CarDto;

//import io.swagger.v3.oas.annotat/	ions.responses.ApiResponse;

public interface CarService {
	public ApiResponse addNewCar(CarDto carDto,MultipartFile[] images) throws IOException ;
	}
