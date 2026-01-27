package com.project.base.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.project.base.dto.CarDto;
import com.project.base.exception.ApiException;
import com.project.base.pojo.Car;
import com.project.base.pojo.CarImage;
import com.project.base.pojo.Status;
import com.project.base.pojo.User;
import com.project.base.repository.CarRepository;
import com.project.base.repository.UserRepository;
import com.project.base.services.impl.ImageStorageService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final ImageStorageService imageStorageService;

    @Override
    public Car addNewCar(
            CarDto carDto,
            MultipartFile[] images,
            Long sellerId
    ) {

        User seller = userRepository.findById(sellerId)
                .orElseThrow(() -> new ApiException("Seller not found"));

        Car car = modelMapper.map(carDto, Car.class);
        car.setSeller(seller);
        car.setStatus(Status.PENDING_APPROVAL);

        if (images != null && images.length > 0) {
            List<String> imageUrls;

            try {
                imageUrls = imageStorageService.storeImages(images);
            } catch (Exception ex) {
                throw new ApiException("Failed to store car images");
            }

            for (String url : imageUrls) {
                CarImage image = new CarImage();
                image.setImageUrl(url);
                image.setCar(car);
                car.getImages().add(image);
            }
        }

        return carRepository.save(car);
    }
}
