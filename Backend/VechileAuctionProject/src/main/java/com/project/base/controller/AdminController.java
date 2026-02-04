package com.project.base.controller;

import com.project.base.dto.ApiResponse;
import com.project.base.dto.CarResponseDTO;
import com.project.base.services.CarService;
import com.project.base.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private CarService carService;
    
    @Autowired
    private UserService userService;


    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/users/{userId}/make-admin")
    public ResponseEntity<ApiResponse> promoteToAdmin(@PathVariable Long userId) {
        userService.promoteToAdmin(userId);
        return ResponseEntity.ok(
                new ApiResponse("User promoted to Admin successfully.")
        );
    }


    @GetMapping("/vehicles/pending")
    public ResponseEntity<List<CarResponseDTO>> getPendingCars() {
        return ResponseEntity.ok(carService.getPendingCars());
    }

    @PutMapping("/vehicles/approve/{id}")
    public ResponseEntity<ApiResponse> approveCar(@PathVariable Long id) {
        carService.approveCar(id);
        return ResponseEntity.ok(
                new ApiResponse("Car approved successfully.")
        );
    }

    @PutMapping("/vehicles/reject/{id}")
    public ResponseEntity<ApiResponse> rejectCar(@PathVariable Long id) {
        carService.rejectCar(id);
        return ResponseEntity.ok(
                new ApiResponse("Car rejected.")
        );
    }

    @GetMapping("/vehicles/all")
    public ResponseEntity<List<CarResponseDTO>> getAllCars() {
        return ResponseEntity.ok(carService.getAllCars());
    }
}
