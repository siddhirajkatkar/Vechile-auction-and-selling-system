package com.project.base.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Car> addNewCar(
            @Valid @RequestPart("carDto") CarDto carDto,
            @RequestPart(value = "images", required = false) MultipartFile[] images,
            @AuthenticationPrincipal MyUserDetails userDetails
    ) {

        Long sellerId = userDetails.getId();
        Car savedCar = carService.addNewCar(carDto, images, sellerId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedCar);
    }
}
