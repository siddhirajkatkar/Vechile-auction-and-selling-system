package com.project.base.dto;

import com.project.base.pojo.FuelType;
import com.project.base.pojo.SaleType;
import com.project.base.pojo.Status;
import com.project.base.pojo.Transmission;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarDto {

    @NotBlank(message = "Registration number is required")
    private String registration_no;

    @NotBlank(message = "Brand is required")
    private String brand;

    @NotBlank(message = "Model is required")
    private String model;

    @NotNull(message = "Fuel type must be provided")
    private FuelType fuel_type;


//    @PositiveOrZero(message = "KM driven must be 0 or greater")
//    private int km_driven;

    @PositiveOrZero(message = "Price must be 0 or greater")
    private double price;
    @Column(nullable = false)
    private Transmission transmission;
    
    @NotNull(message = "Sale type must be provided")
    private SaleType sale_type;
    @Column
    private Integer mileage;
    
//    @NotBlank(message = "Manufacturer is required")
//    private String manufacturer;

//    @NotNull(message = "Status must be provided")
//    private Status status;

    // Optional fields — can be validated further if needed
    private Integer manufacture_year;
    private String color;
    private Integer engine_cc;
    private String description;
}
