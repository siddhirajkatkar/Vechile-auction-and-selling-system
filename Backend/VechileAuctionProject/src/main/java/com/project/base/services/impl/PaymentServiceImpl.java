package com.project.base.services.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.base.pojo.Auction;
import com.project.base.pojo.Cart;
import com.project.base.pojo.Order;
//import com.project.base.pojo.Order;
import com.project.base.pojo.OrderItem;
import com.project.base.pojo.OrderStatus;
import com.project.base.pojo.Payment;
import com.project.base.pojo.PaymentFor;
import com.project.base.pojo.PaymentStatus;
import com.project.base.pojo.SubscriptionPlan;
import com.project.base.pojo.SubscriptionStatus;
import com.project.base.pojo.User;
import com.project.base.pojo.UserSubscription;
import com.project.base.repository.AuctionRepository;
import com.project.base.repository.CartRepository;
import com.project.base.repository.OrderRepository;
import com.project.base.repository.PaymentRepository;
import com.project.base.repository.SubscriptionPlanRepository;
import com.project.base.repository.UserRepository;
import com.project.base.repository.UserSubscriptionRepository;
import com.project.base.services.PaymentService;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;

import lombok.RequiredArgsConstructor;

//import com.razorpay.Order; 

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

    // =========================================
    
   
    
    public Payment createOrder(Double amount, Long userId,
                               PaymentFor paymentFor, Long referenceId) throws Exception {

        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        JSONObject options = new JSONObject();
        options.put("amount", Math.round(amount * 100));
        options.put("currency", "INR");
        options.put("receipt", "txn_" + System.currentTimeMillis());

        com.razorpay.Order razorOrder = client.orders.create(options);

        User user = userRepo.findById(userId).orElseThrow();

        Payment payment = Payment.builder()
                .razorpayOrderId(razorOrder.get("id"))
                .amount(amount)
                .status(PaymentStatus.CREATED)
                .paymentFor(paymentFor)
                .referenceId(referenceId)
                .paymentTime(LocalDateTime.now())
                .user(user)
                .build();

        return paymentRepo.save(payment);
    }

    // =========================================
    @Override
    public void verifyPayment(String orderId, String paymentId,
                              String signature, Long userId) throws Exception {

        String payload = orderId + "|" + paymentId;
        String generatedSignature = Utils.getHash(payload, keySecret);

        if (!generatedSignature.equals(signature))
            throw new RuntimeException("Invalid payment signature");

        Payment payment = paymentRepo.findByRazorpayOrderId(orderId).orElseThrow();

        payment.setRazorpayPaymentId(paymentId);
        payment.setRazorpaySignature(signature);
        payment.setStatus(PaymentStatus.SUCCESS);
        paymentRepo.save(payment);

        // ROUTER
        switch (payment.getPaymentFor()) {

            case CAR_PURCHASE -> handleCarPurchase(payment);

            case SUBSCRIPTION -> handleSubscription(payment);

            case AUCTION_WIN -> handleAuctionWin(payment);
        }
    }

    // =========================================
    private void handleCarPurchase(Payment payment) {

        Cart cart = cartRepo.findByUser(payment.getUser()).orElseThrow();

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

        double total = items.stream().mapToDouble(OrderItem::getPriceAtPurchase).sum();
        savedOrder.setTotalAmount(total);

        orderRepo.save(savedOrder);
        cart.getItems().clear();
    }


    // =========================================
    private void handleSubscription(Payment payment) {

        SubscriptionPlan plan = planRepo.findById(payment.getReferenceId()).orElseThrow();

        UserSubscription sub = new UserSubscription();
        sub.setUser(payment.getUser());
        sub.setPlan(plan);
        sub.setStartDate(LocalDateTime.now());
        sub.setEndDate(LocalDateTime.now().plusDays(plan.getValidityDays()));
        sub.setBidsRemaining(plan.getTotalBids());
        sub.setStatus(SubscriptionStatus.ACTIVE);

        userSubRepo.save(sub);
    }

    // =========================================
    private void handleAuctionWin(Payment payment) {

        Auction auction = auctionRepo.findById(payment.getReferenceId()).orElseThrow();
        auction.setPaymentStatus(PaymentStatus.SUCCESS);
    }
}
