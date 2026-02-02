package com.project.base.controller;

import com.project.base.dto.PaymentVerifyDto;
import com.project.base.pojo.Payment;
import com.project.base.pojo.PaymentFor;
import com.project.base.security.MyUserDetails;
import com.project.base.services.PaymentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@RestController
@RequestMapping("/user/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public Payment createOrder(@RequestParam Double amount,
                               @RequestParam PaymentFor paymentFor,
                               @RequestParam Long referenceId,
                               @AuthenticationPrincipal MyUserDetails user) throws Exception {

        return paymentService.createOrder(
                amount,
                user.getUser().getId(),
                paymentFor,
                referenceId
        );
    }

    @PostMapping("/verify")
    public String verify(@RequestBody PaymentVerifyDto dto,
                         @AuthenticationPrincipal MyUserDetails user) throws Exception {

        paymentService.verifyPayment(
                dto.getRazorpay_order_id(),
                dto.getRazorpay_payment_id(),
                dto.getRazorpay_signature(),
                user.getUser().getId()
        );

        return "Payment Success";
    }
}
