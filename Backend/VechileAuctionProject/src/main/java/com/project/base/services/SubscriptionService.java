package com.project.base.services;

import com.project.base.pojo.PlanName;
import com.project.base.pojo.UserSubscription;

public interface SubscriptionService {

    UserSubscription subscribeUser(Long userId, PlanName planName);

    UserSubscription getActiveSubscription(Long userId);
    
    
}
