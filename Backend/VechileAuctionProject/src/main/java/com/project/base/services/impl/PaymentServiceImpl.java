package com.project.base.services.impl;

import com.project.base.pojo.*;
import com.project.base.repository.PaymentRepository;
import com.project.base.repository.UserRepository;
import com.project.base.services.PaymentService;
import com.project.base.utils.RazorpaySignatureUtil;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
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

    // =========================
    // CREATE ORDER (JWT REQUIRED)
    // =========================
    @Override
    public Payment createOrder(Double amount, Long userId) throws Exception {

        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        JSONObject options = new JSONObject();
        options.put("amount", amount * 100); // paise
        options.put("currency", "INR");
        options.put("receipt", "txn_" + System.currentTimeMillis());

        Order order = client.orders.create(options);

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Payment payment = Payment.builder()
                .razorpayOrderId(order.get("id"))
                .amount(amount)
                .status(PaymentStatus.CREATED)
                .paymentTime(LocalDateTime.now()) // order creation time
                .user(user)
                .build();

        return paymentRepo.save(payment);
    }

    // =========================
    // VERIFY PAYMENT (NO JWT)
    // =========================
    @Override
    public void verifyPayment(String orderId,
                              String paymentId,
                              String signature) {

        // 🔐 1. Verify Razorpay signature
        boolean isValid = RazorpaySignatureUtil.verify(
                orderId,
                paymentId,
                signature,
                keySecret
        );

        if (!isValid) {
            throw new RuntimeException("Invalid Razorpay signature");
        }

        // 🔍 2. Fetch payment safely
        Payment payment = paymentRepo
                .findByRazorpayOrderId(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Payment not found for orderId: " + orderId)
                );

        // 🔁 3. Idempotency check
        if (payment.getStatus() == PaymentStatus.SUCCESS) {
            return; // already processed
        }

        // ✅ 4. Update payment
        payment.setRazorpayPaymentId(paymentId);
        payment.setRazorpaySignature(signature);
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setPaymentTime(LocalDateTime.now());

        paymentRepo.save(payment);
    }
}
