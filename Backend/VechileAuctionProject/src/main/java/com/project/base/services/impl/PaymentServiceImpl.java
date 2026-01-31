package com.project.base.services.impl;

import com.project.base.pojo.*;
import com.project.base.pojo.Payment;
import com.project.base.repository.PaymentRepository;
import com.project.base.repository.UserRepository;
import com.project.base.services.PaymentService;
import com.razorpay.*;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepo;
    private final UserRepository userRepo;

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Override
    public Payment createOrder(Double amount, Long userId) throws Exception {

        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        JSONObject options = new JSONObject();
        options.put("amount", amount * 100); // paise
        options.put("currency", "INR");
        options.put("receipt", "txn_" + System.currentTimeMillis());

        Order order = client.orders.create(options);

        User user = userRepo.findById(userId).orElseThrow();

        Payment payment = Payment.builder()
                .razorpayOrderId(order.get("id"))
                .amount(amount)
                .status(PaymentStatus.CREATED)
                .paymentTime(LocalDateTime.now())
                .user(user)
                .build();

        return paymentRepo.save(payment);
    }

    @Override
    public void verifyPayment(String orderId, String paymentId, String signature, Long userId) throws Exception {

        String payload = orderId + "|" + paymentId;
        String generatedSignature = Utils.getHash(payload, keySecret);

        if (!generatedSignature.equals(signature)) {
            throw new RuntimeException("Invalid payment signature");
        }

        Payment payment = paymentRepo.findAll().stream()
                .filter(p -> p.getRazorpayOrderId().equals(orderId))
                .findFirst()
                .orElseThrow();

        payment.setRazorpayPaymentId(paymentId);
        payment.setRazorpaySignature(signature);
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setPaymentTime(LocalDateTime.now());

        paymentRepo.save(payment);
    }
}
