package com.project.base.services.impl;

import com.project.base.dto.CarDto;
import com.project.base.dto.CarResponseDTO;
import com.project.base.pojo.Car;
import com.project.base.pojo.CarImage;
import com.project.base.pojo.Status;
import com.project.base.repository.CarRepository;
import com.project.base.repository.UserRepository;
import com.project.base.repository.CarImageRepository;
import com.project.base.services.CarService;
import com.project.base.services.ImageStorageService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepository carRepo;
    
    private final  CarImageRepository carImageRepository;

    @Autowired
    private UserRepository userRepo;

	private  final ImageStorageService imageStorageService;

    @Override
    public Car addNewCar(CarDto carDto, MultipartFile[] images, Long sellerId) {
        // 1️⃣ Create Car entity
        Car car = new Car();
        car.setRegistrationNo(carDto.getRegistrationNo());
        car.setBrand(carDto.getBrand());
        car.setManufacturer(carDto.getManufacturer());
        car.setModel(carDto.getModel());
        car.setManufactureYear(carDto.getManufactureYear());
        car.setFuelType(carDto.getFuelType());
        car.setTransmission(carDto.getTransmission());
        car.setKmDriven(carDto.getKmDriven());
        car.setSaleType(carDto.getSaleType());
        car.setMileage(carDto.getMileage());
        car.setEngineCc(carDto.getEngineCc());
        car.setPrice(carDto.getPrice());
        car.setColor(carDto.getColor());
        car.setDescription(carDto.getDescription());
        car.setStatus(Status.PENDING_APPROVAL);

        car.setSeller(userRepo.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller not found")));

        Car savedCar = carRepo.save(car); // Save car first

        // 2️⃣ Save Images and link to car
        if (images != null && images.length > 0) {
            try {
                List<String> imageUrls = imageStorageService.storeImages(images);

                for (String url : imageUrls) {
                    CarImage carImage = new CarImage();
                    carImage.setCar(savedCar);
                    carImage.setImageUrl(url); // Store the path returned by ImageStorageService
                   carImageRepository.save(carImage); // Save image record in DB
                }
            } catch (IOException e) {
                throw new RuntimeException("Failed to store images", e);
            }
        }

        return savedCar;
    }


    @Override
    public List<CarResponseDTO> getPendingCars() {
        return carRepo.findByStatus(Status.PENDING_APPROVAL).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Car approveCar(Long carId) {
        Car car = carRepo.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found"));
        car.setStatus(Status.AVAILABLE);
        return carRepo.save(car);
    }

    @Override
    public Car rejectCar(Long carId) {
        Car car = carRepo.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found"));
        car.setStatus(Status.CANCELLED);
        return carRepo.save(car);
    }

    @Override
    public List<CarResponseDTO> getAllAvailableCars() {
        return carRepo.findByStatus(Status.AVAILABLE).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CarResponseDTO> getAllCars() {
        return carRepo.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Helper method to convert Car Entity to CarResponseDTO.
     * This ensures all Lazy-loaded fields are accessed within the transaction.
     */
    private CarResponseDTO convertToDto(Car car) {
        CarResponseDTO dto = new CarResponseDTO();
        dto.setId(car.getId());
        dto.setRegistrationNo(car.getRegistrationNo());
        dto.setBrand(car.getBrand());
        dto.setModel(car.getModel());
        dto.setManufactureYear(car.getManufactureYear());
        dto.setPrice(car.getPrice());
//        dto.setStatus(car.getStatus().name());

        if (car.getSeller() != null) {
//            dto.setSellerName(car.getSeller().getFirstName() + " " + car.getSeller().getLastName());
        }

//        if (car.getImages() != null) {
////            dto.setImageUrls(car.getImages().stream()
//                    .map(img -> img.getImageUrl())
//                    .collect(Collectors.toList()));
//        }

        return dto;
    }
}