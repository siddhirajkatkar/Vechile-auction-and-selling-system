package com.project.base.pojo;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "cars")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "car_id"))
public class Car extends BaseEntity {

    @NotBlank
    @Column(name = "registration_no", nullable = false, unique = true, length = 20)
    private String registrationNo;

    @NotBlank
    @Column(nullable = false, length = 50)
    private String brand;

    @NotBlank
    @Column(nullable = false, length = 50)
    private String model;

    @Min(1900)
    @Column(name = "manufacture_year")
    private int manufactureYear;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "fuel_type", nullable = false, length = 20) // ✅ Added length
    private FuelType fuelType;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20) // ✅ Added length
    private Transmission transmission;

    @PositiveOrZero
    private Integer mileage;

    @Column(length = 30)
    private String color;

    @PositiveOrZero
    @Column(name = "engine_cc")
    private Integer engineCc;

    @PositiveOrZero
    @Column(nullable = false)
    private double price;

    @Column(columnDefinition = "TEXT")
    private String description;

 // In Car.java
    @JsonManagedReference // ✅ Tells Jackson to fetch the images
    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER) 
    private List<CarImage> images = new ArrayList<>();

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "sale_type", nullable = false, length = 20) // ✅ Added length
    private SaleType saleType;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30) // ✅ Fix: Length 30 accommodates "PENDING_APPROVAL"
    private Status status;

 // In Car.java

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "password", "roles"}) // ✅ Add this
    private User seller;
    
 // Inside Car.java

    @NotBlank
    @Column(nullable = false) // Matches the 'NO' in your DB Null column
    private String manufacturer; // ✅ Add this field

    @PositiveOrZero
    @Column(name = "km_driven", nullable = false) // ✅ Ensure this matches the DB too
    private Integer kmDriven;
}
