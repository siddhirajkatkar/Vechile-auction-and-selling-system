package com.project.base.dto;

import com.project.base.pojo.*;
import lombok.*;

@Getter 
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarDto {
    // Matches: registration_no (Unique)
    private String registrationNo;

    // Matches: brand
    private String brand;

    // Matches: manufacturer (Database marked this as NO NULL)
    private String manufacturer;

    // Matches: model
    private String model;

    // Matches: manufacture_year
    private int manufactureYear;

    // Matches: fuel_type (Enum)
    private FuelType fuelType;

    // Matches: transmission (Enum)
    private Transmission transmission;

    // Matches: km_driven (Database marked this as NO NULL)
    private Integer kmDriven;

    // Matches: mileage (Optional in DB)
    private Integer mileage;

    // Matches: color
    private String color;

    // Matches: engine_cc
    private Integer engineCc;

    // Matches: price
    private double price;

    // Matches: description
    private String description;

    // Matches: sale_type (Enum)
    private SaleType saleType;
}