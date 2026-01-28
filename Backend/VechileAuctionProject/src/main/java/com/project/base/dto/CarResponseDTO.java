package com.project.base.dto;

import com.project.base.pojo.*;
import lombok.*;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarResponseDTO {
    private Long id;
    private String registrationNo;
    private String brand;
    private String model;
    private int manufactureYear;
    private double price;
    private String status;
    private String sellerName; // Just the name, not the whole User object
    private List<String> imageUrls; // Just the strings/URLs
}