package com.project.base.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.project.base.dto.CarDto;
import com.project.base.pojo.Car;

public interface CarService {

    // USER
    Car addNewCar(CarDto carDto, MultipartFile[] images, Long sellerId);

    // ADMIN
    List<Car> getPendingCars();

    Car approveCar(Long carId);

    Car rejectCar(Long carId);
}
