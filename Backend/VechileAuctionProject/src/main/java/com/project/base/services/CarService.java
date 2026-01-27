package com.project.base.services;

import org.springframework.web.multipart.MultipartFile;
import com.project.base.dto.CarDto;
import com.project.base.pojo.Car;

public interface CarService {

    Car addNewCar(
            CarDto carDto,
            MultipartFile[] images,
            Long sellerId
    );
}
