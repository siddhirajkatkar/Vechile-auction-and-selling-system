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

        UserSubscription subscription = new UserSubscription();
        subscription.setUser(user);
        subscription.setPlan(plan);
        subscription.setBidsRemaining(plan.getTotalBids());
        subscription.setStartDate(LocalDateTime.now());
        subscription.setEndDate(LocalDateTime.now().plusMonths(1));

        return userSubRepo.save(subscription);
    }

    @Override
    public UserSubscription getActiveSubscription(Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return userSubRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("No active subscription"));
    }
}
