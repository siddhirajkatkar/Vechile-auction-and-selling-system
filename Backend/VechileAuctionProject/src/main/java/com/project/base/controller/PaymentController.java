package com.project.base.controller;

import com.project.base.pojo.Payment;
import com.project.base.security.MyUserDetails;
import com.project.base.services.PaymentService;
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
                               @AuthenticationPrincipal MyUserDetails user) throws Exception {

        return paymentService.createOrder(amount, user.getUser().getId());
    }

    @PostMapping("/verify")
    public String verify(@RequestBody Map<String, String> data,
                         @AuthenticationPrincipal MyUserDetails user) throws Exception {

        paymentService.verifyPayment(
                data.get("razorpay_order_id"),
                data.get("razorpay_payment_id"),
                data.get("razorpay_signature"),
                user.getUser().getId()
        );

        return "Payment Success";
    }
}
