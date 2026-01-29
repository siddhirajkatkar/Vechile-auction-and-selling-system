package com.project.base.repository;

import com.project.base.pojo.User;
import com.project.base.pojo.UserSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserSubscriptionRepository
        extends JpaRepository<UserSubscription, Long> {

    Optional<UserSubscription> findByUser(User user);
}
