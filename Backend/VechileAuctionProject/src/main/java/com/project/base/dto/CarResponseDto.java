package com.project.base.dto;

import java.util.List;

import com.project.base.pojo.CarImage;
import com.project.base.pojo.FuelType;
import com.project.base.pojo.SaleType;
import com.project.base.pojo.Transmission;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarResponseDto {
    private Long id;
    private String registration_no;
    private String brand;
    private String model;
    private Integer manufacture_year;
    private FuelType fuel_type;
    private Transmission transmission;
    private Integer mileage;
    private String color;
    private Integer engine_cc;
    private double price;
    private String description;
    private List<CarImage> images;
    private SaleType sale_type;
}
