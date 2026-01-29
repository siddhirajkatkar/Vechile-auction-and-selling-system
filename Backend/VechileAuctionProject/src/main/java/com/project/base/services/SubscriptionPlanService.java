package com.project.base.services;

import com.project.base.pojo.PlanName;
import com.project.base.pojo.SubscriptionPlan;

import java.util.List;

public interface SubscriptionPlanService {

    // View all available plans (View Plan page)
    List<SubscriptionPlan> getAllPlans();

    // Fetch a plan by name (used while buying)
    SubscriptionPlan getPlanByName(PlanName planName);
}
	