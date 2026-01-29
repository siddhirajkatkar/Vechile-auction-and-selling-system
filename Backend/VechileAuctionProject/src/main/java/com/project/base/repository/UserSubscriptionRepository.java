package com.project.base.repository;

import com.project.base.pojo.SubscriptionStatus;
import com.project.base.pojo.User;
import com.project.base.pojo.UserSubscription;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserSubscriptionRepository
        extends JpaRepository<UserSubscription, Long> {

    // 🔥 Fetch ALL active/expired subscriptions of a user
    List<UserSubscription> findAllByUserAndStatus(
            User user,
            SubscriptionStatus status
    );

    // (Optional) if you ever need just one active subscription
    Optional<UserSubscription> findFirstByUserAndStatus(
            User user,
            SubscriptionStatus status
    );
}
