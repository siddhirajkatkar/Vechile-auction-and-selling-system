package com.project.base.dto;

import com.project.base.pojo.FuelType;
import com.project.base.pojo.SaleType;
import com.project.base.pojo.Status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarDto {
	
	    private String registration_no;
	    private String model;
	    private FuelType fuel_type;
	    private String manufacturer;
	    private int km_driven;
	    private double price;
	    private SaleType sale_type;
	    private Status status;   // <--- enum
	}



