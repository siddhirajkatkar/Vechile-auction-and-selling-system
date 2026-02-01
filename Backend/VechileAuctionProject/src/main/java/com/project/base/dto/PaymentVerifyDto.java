package com.project.base.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentVerifyDto {

    @NotBlank
    private String razorpay_order_id;

    @NotBlank
    private String razorpay_payment_id;

    @NotBlank
    private String razorpay_signature;
}
