package com.project.base.services.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.base.pojo.*;
import com.project.base.repository.*;
import com.project.base.services.PaymentService;
import com.project.base.utils.RazorpaySignatureUtil;
import com.razorpay.RazorpayClient;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepo;
    private final UserRepository userRepo;
    private final CartRepository cartRepo;
    private final OrderRepository orderRepo;
    private final SubscriptionPlanRepository planRepo;
    private final UserSubscriptionRepository userSubRepo;
    private final AuctionRepository auctionRepo;

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    // ================= CREATE ORDER =================
    @Override
    public Payment createOrder(
            Double amount,
            Long userId,
            PaymentFor paymentFor,
            Long referenceId
    ) throws Exception {

        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        JSONObject options = new JSONObject();
        options.put("amount", Math.round(amount * 100));
        options.put("currency", "INR");
        options.put("receipt", "txn_" + System.currentTimeMillis());

        com.razorpay.Order razorOrder = client.orders.create(options);

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Payment payment = Payment.builder()
                .razorpayOrderId(razorOrder.get("id"))
                .amount(amount)
                .status(PaymentStatus.CREATED)
                .paymentFor(paymentFor)
                .referenceId(referenceId) // planId / auctionId / etc
                .paymentTime(LocalDateTime.now())
                .user(user)
                .build();

        return paymentRepo.save(payment);
    }

    // ================= VERIFY PAYMENT =================
    @Override
    public void verifyPayment(
            String orderId,
            String paymentId,
            String signature
    ) {
        // 1️⃣ Fetch payment
        Payment payment = paymentRepo.findByRazorpayOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        // 2️⃣ IDEMPOTENCY CHECK
        if (payment.getStatus() == PaymentStatus.SUCCESS) {
            return;
        }

        // 3️⃣ Verify Razorpay signature
        boolean isValid = RazorpaySignatureUtil.verify(
                orderId,
                paymentId,
                signature,
                keySecret
        );

        if (!isValid) {
            payment.setStatus(PaymentStatus.FAILED);
            paymentRepo.save(payment);
            throw new RuntimeException("Invalid Razorpay signature");
        }

        // 4️⃣ Mark payment SUCCESS
        payment.setRazorpayPaymentId(paymentId);
        payment.setRazorpaySignature(signature);
        payment.setStatus(PaymentStatus.SUCCESS);
        paymentRepo.save(payment);

        // 5️⃣ Perform business action
        switch (payment.getPaymentFor()) {
            case CAR_PURCHASE -> handleCarPurchase(payment);
            case SUBSCRIPTION -> handleSubscription(payment);
            case AUCTION_WIN -> handleAuctionWin(payment);
        }
    }

    // ================= HANDLERS =================

    private void handleCarPurchase(Payment payment) {
        Cart cart = cartRepo.findByUser(payment.getUser())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Order newOrder = Order.builder()
                .user(payment.getUser())
                .payment(payment)
                .orderTime(LocalDateTime.now())
                .status(OrderStatus.SUCCESS)
                .build();

        Order savedOrder = orderRepo.save(newOrder);

        List<OrderItem> items = cart.getItems().stream()
                .map(ci -> OrderItem.builder()
                        .order(savedOrder)
                        .car(ci.getCar())
                        .brand(ci.getCar().getBrand())
                        .model(ci.getCar().getModel())
                        .priceAtPurchase(ci.getPriceAtAddTime())
                        .build())
                .toList();

        savedOrder.setItems(items);
        savedOrder.setTotalAmount(
                items.stream().mapToDouble(OrderItem::getPriceAtPurchase).sum()
        );
        orderRepo.save(savedOrder);

        cart.getItems().clear();
    }

    /**
     * ✅ ASSIGN SUBSCRIPTION PLAN TO USER
     */
    private void handleSubscription(Payment payment) {

        SubscriptionPlan plan = planRepo.findById(payment.getReferenceId())
                .orElseThrow(() -> new RuntimeException("Subscription plan not found"));

        // ✅ Expire existing ACTIVE subscriptions
        List<UserSubscription> activeSubs =
                userSubRepo.findByUserAndStatus(payment.getUser(), SubscriptionStatus.ACTIVE);

        for (UserSubscription sub : activeSubs) {
            sub.setStatus(SubscriptionStatus.EXPIRED);
            sub.setEndDate(LocalDateTime.now());
        }

        // ✅ Create new subscription
        UserSubscription newSub = new UserSubscription();
        newSub.setUser(payment.getUser());
        newSub.setPlan(plan);
        newSub.setStartDate(LocalDateTime.now());
        newSub.setEndDate(LocalDateTime.now().plusDays(plan.getValidityDays()));
        newSub.setBidsRemaining(plan.getTotalBids());
        newSub.setStatus(SubscriptionStatus.ACTIVE);

        userSubRepo.save(newSub);
    }


    private void handleAuctionWin(Payment payment) {
        Auction auction = auctionRepo.findById(payment.getReferenceId())
                .orElseThrow(() -> new RuntimeException("Auction not found"));

        auction.setPaymentStatus(PaymentStatus.SUCCESS);
        auctionRepo.save(auction);
    }
}
