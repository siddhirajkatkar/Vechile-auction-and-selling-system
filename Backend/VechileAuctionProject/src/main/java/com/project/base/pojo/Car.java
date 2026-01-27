package com.project.base.pojo;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.AssertFalse;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//@Entity
//@Table(name = "cars")
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//@AttributeOverride(name="id", column=@Column(name="car_id"))
//public class Car extends BaseEntity {
//
//    @Column(nullable = false, unique = true)
//    private String registration_no;
//
//    @Column(nullable = false)
//    private String model;
//
//    @Column(nullable = false)
//    @Enumerated(EnumType.STRING)
//    private FuelType fuel_type; // fixed typo
//
//    @Column(nullable = false)
//    private String manufacturer;
//
//    @Column(nullable = false)
//    @PositiveOrZero
//    private int km_driven;
//
//    @Column(nullable = false)
//    @PositiveOrZero
//    private double price;
//
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private SaleType sale_type;
//
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private Status status;
//    
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "seller_id", nullable = false)
//    private User seller;
//
//}

// ... existing imports
@Entity
@Table(name = "cars")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@AttributeOverride(name="id", column=@Column(name="car_id"))
public class Car extends BaseEntity {
    @Column(nullable = false, unique = true)
    private String registration_no;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @Column
    private int manufacture_year;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FuelType fuel_type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Transmission transmission;

    @Column
    private Integer mileage;

    @Column
    private String color;

    @Column
    private Integer engine_cc;

    @Column(nullable = false)
    @PositiveOrZero
    private double price;

    @Column(columnDefinition = "TEXT")
    private String description;

//    @Column(name = "image_url")
//    private String imageUrl;

	@OneToMany(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<CarImage> images = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SaleType sale_type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;
}

