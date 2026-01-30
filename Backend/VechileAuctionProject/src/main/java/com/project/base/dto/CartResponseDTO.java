package com.project.base.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartResponseDTO {

    private List<CarResponseDTO> cars;
    private double totalAmount;
}

