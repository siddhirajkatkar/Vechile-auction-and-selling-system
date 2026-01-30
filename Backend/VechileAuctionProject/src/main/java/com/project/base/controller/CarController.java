package com.project.base.controller;

import com.project.base.dto.CarDto;
import com.project.base.dto.CarResponseDTO;
import com.project.base.dto.ApiResponse;
import com.project.base.pojo.Car;
import com.project.base.services.CarService;
import com.project.base.services.UserService;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private UserService userService;

    @Autowired
    private CarService carService;

    // ================= SELLER =================

    /**
     * Seller adds a new car (saved as DRAFT)
     */
    @PostMapping(
        value = "/add",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @PreAuthorize("hasAnyAuthority('ROLE_SELLER', 'ROLE_BUYER')")
    public ResponseEntity<ApiResponse> addCar(
            @RequestPart("carData") String carDataJson,
            @RequestPart(value = "images", required = false) MultipartFile[] images
    ) throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();
        CarDto carDto = objectMapper.readValue(carDataJson, CarDto.class);

        Long sellerId = userService.getCurrentUser().getId();
        Car savedCar = carService.addNewCar(carDto, images, sellerId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse(
                        "Car saved as DRAFT with ID: " + savedCar.getId()
                ));
    }

    /**
     * Seller submits car for admin approval
     */
    @PutMapping("/submit/{carId}")
    @PreAuthorize("hasAuthority('ROLE_SELLER')")
    public ResponseEntity<ApiResponse> submitForApproval(
            @PathVariable Long carId) {

        Long sellerId = userService.getCurrentUser().getId();
        carService.submitForApproval(carId, sellerId);

        return ResponseEntity.ok(
                new ApiResponse("Car submitted for admin approval")
        );
    }

    // ================= BUYER / PUBLIC =================

    /**
     * Get all approved & available cars
     */
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CarResponseDTO>> getAvailableCars() {
        return ResponseEntity.ok(carService.getAllAvailableCars());
    }
}
