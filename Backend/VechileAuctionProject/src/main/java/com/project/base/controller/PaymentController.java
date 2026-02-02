package com.project.base.controller;

import com.project.base.dto.PaymentVerifyDto;
import com.project.base.pojo.Payment;
import com.project.base.pojo.PaymentFor;
import com.project.base.security.MyUserDetails;
import com.project.base.services.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    // =========================
    // CREATE ORDER (JWT REQUIRED)
    // =========================
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

    // =========================
    // VERIFY PAYMENT (NO JWT)
    // =========================
    @PostMapping("/razorpay/verify")
    public ResponseEntity<String> verifyPayment(
            @RequestBody PaymentVerifyDto dto) {

        paymentService.verifyPayment(
                dto.getRazorpayOrderId(),
                dto.getRazorpayPaymentId(),
                dto.getRazorpaySignature()
        );

        return ResponseEntity.ok("Payment Success");
    }
}
