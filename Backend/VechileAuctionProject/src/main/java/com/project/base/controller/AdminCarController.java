package com.project.base.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.base.pojo.Car;
import com.project.base.services.CarService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/cars")
@RequiredArgsConstructor
public class AdminCarController {

    private final CarService carService;

    @GetMapping("/pending")
    public ResponseEntity<List<Car>> getPendingCars() {
        return ResponseEntity.ok(carService.getPendingCars());
    }

    @PutMapping("/{carId}/approve")
    public ResponseEntity<Car> approveCar(@PathVariable Long carId) {
        return ResponseEntity.ok(carService.approveCar(carId));
    }

    @PutMapping("/{carId}/reject")
    public ResponseEntity<Car> rejectCar(@PathVariable Long carId) {
        return ResponseEntity.ok(carService.rejectCar(carId));
    }
}
