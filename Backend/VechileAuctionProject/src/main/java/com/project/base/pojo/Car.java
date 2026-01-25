package com.project.base.pojo;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.AssertFalse;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
    private String model;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private FuelType fuel_type; // fixed typo

    @Column(nullable = false)
    private String manufacturer;

    @Column(nullable = false)
    @PositiveOrZero
    private int km_driven;

    @Column(nullable = false)
    @PositiveOrZero
    private double price;

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
