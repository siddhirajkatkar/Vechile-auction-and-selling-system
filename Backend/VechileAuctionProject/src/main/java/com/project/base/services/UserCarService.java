package com.project.base.services;

import java.util.List;

import com.project.base.dto.ApiResponse;
import com.project.base.dto.CarDto;
import com.project.base.dto.CarResponseDTO;

public interface UserCarService {
//Car addNewCar(CarDto carDto, MultipartFile[] images, Long sellerId);
    
    List<CarResponseDTO> getCarsBySeller(Long sellerId);

	ApiResponse deleteCar(Long carId, Long sellerId);
}
