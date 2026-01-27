package com.project.base.dto;

import com.project.base.pojo.FuelType;
import com.project.base.pojo.SaleType;
import com.project.base.pojo.Transmission;

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

    @NotNull(message = "Transmission must be provided")
    private Transmission transmission;

    @PositiveOrZero(message = "Price must be 0 or greater")
    private double price;

    @NotNull(message = "Sale type must be provided")
    private SaleType sale_type;

    @PositiveOrZero(message = "Mileage must be 0 or greater")
    private Integer mileage;

    @PositiveOrZero(message = "Manufacture year must be valid")
    private Integer manufacture_year;

    private String color;

    @PositiveOrZero(message = "Engine CC must be 0 or greater")
    private Integer engine_cc;

    private String description;
}
