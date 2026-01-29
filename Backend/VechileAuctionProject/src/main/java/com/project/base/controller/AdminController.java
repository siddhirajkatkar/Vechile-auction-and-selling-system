package com.project.base.controller;

import com.project.base.dto.ApiResponse;
import com.project.base.dto.CarResponseDTO;
import com.project.base.services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')") // ✅ Class-level security for all admin routes
public class AdminController {

    @Autowired
    private CarService carService;

    /**
     * Fetch all cars that are currently waiting for admin approval.
     */
    @GetMapping("/cars/pending")
    public ResponseEntity<List<CarResponseDTO>> getPendingCars() {
        List<CarResponseDTO> pendingCars = carService.getPendingCars();
        return ResponseEntity.ok(pendingCars);
    }

    /**
     * Approve a car listing to make it visible in the marketplace (Status: AVAILABLE).
     */
    @PutMapping("/cars/approve/{id}")
    public ResponseEntity<ApiResponse> approveCar(@PathVariable Long id) {
        carService.approveCar(id);
        return ResponseEntity.ok(new ApiResponse("Car approved successfully. It is now live on the marketplace."));
    }

    /**
     * Reject a car listing (Status: CANCELLED).
     */
    @PutMapping("/cars/reject/{id}")
    public ResponseEntity<ApiResponse> rejectCar(@PathVariable Long id) {
        carService.rejectCar(id);
        return ResponseEntity.ok(new ApiResponse("Car rejected. Status has been set to CANCELLED."));
    }

    /**
     * View every car in the database regardless of status.
     */
    @GetMapping("/cars/all")
    public ResponseEntity<List<CarResponseDTO>> getAllCars() {
        return ResponseEntity.ok(carService.getAllCars());
    }
}