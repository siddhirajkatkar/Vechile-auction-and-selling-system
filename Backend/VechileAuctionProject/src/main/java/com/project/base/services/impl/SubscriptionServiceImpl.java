package com.project.base.services.impl;

import com.project.base.pojo.*;
import com.project.base.repository.SubscriptionPlanRepository;
import com.project.base.repository.UserRepository;
import com.project.base.repository.UserSubscriptionRepository;
import com.project.base.services.SubscriptionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class SubscriptionServiceImpl implements SubscriptionService {

    @Autowired
    private SubscriptionPlanRepository planRepo;

    @Autowired
    private UserSubscriptionRepository userSubRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserSubscription subscribeUser(Long userId, PlanName planName) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        SubscriptionPlan plan = planRepo.findByPlanName(planName)
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        // 🔥 STEP 1: Expire ALL active subscriptions of user
        List<UserSubscription> activeSubs =
                userSubRepo.findAllByUserAndStatus(user, SubscriptionStatus.ACTIVE);

        for (UserSubscription sub : activeSubs) {
            sub.setStatus(SubscriptionStatus.EXPIRED);
        }
        userSubRepo.saveAll(activeSubs);

        // 🔥 STEP 2: Create new ACTIVE subscription
        UserSubscription subscription = new UserSubscription();
        subscription.setUser(user);
        subscription.setPlan(plan);
        subscription.setBidsRemaining(plan.getTotalBids());
        subscription.setStartDate(LocalDateTime.now());
        subscription.setEndDate(LocalDateTime.now().plusMonths(1)); // or plan validity
        subscription.setStatus(SubscriptionStatus.ACTIVE);

        return userSubRepo.save(subscription);
    }

    @Override
    public UserSubscription getActiveSubscription(Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return userSubRepo.findAllByUserAndStatus(user, SubscriptionStatus.ACTIVE)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No active subscription"));
    }
}
