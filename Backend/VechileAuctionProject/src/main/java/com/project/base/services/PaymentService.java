package com.project.base.services;

import com.project.base.pojo.Payment;

public interface PaymentService {
    Payment createOrder(Double amount, Long userId) throws Exception;
    void verifyPayment(String orderId, String paymentId, String signature, Long userId) throws Exception;
}
