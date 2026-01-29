package com.project.base.services.impl;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.project.base.dto.CarDto;
import com.project.base.dto.CarResponseDTO;
import com.project.base.pojo.Car;
import com.project.base.pojo.CarImage;
import com.project.base.repository.CarRepository;
import com.project.base.repository.UserRepository;
import com.project.base.services.ImageStorageService;
import com.project.base.services.UserCarService;

@Service
@Transactional
public class UserCarServiceImpl implements UserCarService{

	 @Autowired
	    private CarRepository carRepo;

	    @Autowired
	    private UserRepository userRepo;

	    @Autowired
	    private ImageStorageService carImageService;

//	    @Override
//	    public Car addNewCar(CarDto carDto, MultipartFile[] images, Long sellerId) {
//	        // existing addNewCar code...
//	    }

	    @Override
	    public List<CarResponseDTO> getCarsBySeller(Long sellerId) {

	        List<Car> cars = carRepo.findBySellerId(sellerId);

	        return cars.stream().map(car -> {

	            CarResponseDTO dto = new CarResponseDTO();
	            dto.setId(car.getId());
	            dto.setRegistrationNo(car.getRegistrationNo());
	            dto.setBrand(car.getBrand());
	            dto.setManufacturer(car.getManufacturer());
	            dto.setModel(car.getModel());
	            dto.setManufactureYear(car.getManufactureYear());
	            dto.setFuelType(car.getFuelType());
	            dto.setTransmission(car.getTransmission());
	            dto.setKmDriven(car.getKmDriven());
	            dto.setMileage(car.getMileage());
	            dto.setColor(car.getColor());
	            dto.setEngineCc(car.getEngineCc());
	            dto.setPrice(car.getPrice());
	            dto.setDescription(car.getDescription());
	            dto.setSaleType(car.getSaleType());

	            // ✅ VERY IMPORTANT
	            dto.setStatus(car.getStatus());

	            // Images
	            dto.setImages(car.getImages());

	            return dto;
	        }).collect(Collectors.toList());
	    }

}
