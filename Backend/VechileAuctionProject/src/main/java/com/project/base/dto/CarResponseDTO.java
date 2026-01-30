package com.project.base.dto;

import com.project.base.pojo.*;
import lombok.*;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarResponseDTO {
//    private Long id;
//    private String registrationNo;
//    private String brand;
//    private String model;
//    private int manufactureYear;
//    private double price;
//    private String status;
//    private String sellerName; // Just the name, not the whole User object
//    private List<String> imageUrls; // Just the strings/URLs
	
//	@Getter
//	@Setter
//	@NoArgsConstructor
//	@AllArgsConstructor
//	
		private Long id;
	    private String registrationNo;
	    private String brand;
	    private String manufacturer;
	    private String model;
	    private Status status;
	    private int manufactureYear;
	    private FuelType fuelType;
	    private Transmission transmission;
	    private Integer kmDriven;
	    private Integer mileage;
	    private String color;
	    private Integer engineCc;
	    private double price;
	    private String description;
	    private SaleType saleType;

	    // Add this for frontend to display images
	    private List<CarImage> images;	
	    
	    private String sellerName;
	    private String sellerEmail;
	    private String sellerPhone;
	    

}

