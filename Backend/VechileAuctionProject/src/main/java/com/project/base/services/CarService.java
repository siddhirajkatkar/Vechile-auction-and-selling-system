package com.project.base.services;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.project.base.dto.CarDto;
import com.project.base.pojo.Car;
import com.project.base.dto.CarResponseDTO; // ✅ Ensure DTO is imported

public interface CarService {

    /**
     * SELLER/USER FUNCTIONALITY
     * Logic: Create car, link to seller, handle image uploads, and set status to PENDING_APPROVAL
     */
    Car addNewCar(CarDto carDto, MultipartFile[] images, Long sellerId);

    /**
     * ADMIN FUNCTIONALITY
     * Logic: Fetch all cars currently waiting for approval
     */
    List<Car> getPendingCars();

    /**
     * ADMIN FUNCTIONALITY
     * Logic: Change car status to AVAILABLE so it appears on the marketplace
     */
    Car approveCar(Long carId);

    /**
     * ADMIN FUNCTIONALITY
     * Logic: Change car status to CANCELLED or REJECTED
     */
    Car rejectCar(Long carId);
    
    /**
     * PUBLIC FUNCTIONALITY (Optional addition for your controller)
     * Logic: Fetch all approved/available cars
     */
    List<CarResponseDTO> getAllAvailableCars();
    
    List<CarResponseDTO> getAllCars(); 

}