package com.project.base.services.impl;

import com.project.base.pojo.Auction;
import com.project.base.pojo.AuctionStatus;
import com.project.base.pojo.SubscriptionStatus;
import com.project.base.pojo.User;
import com.project.base.pojo.UserSubscription;
import com.project.base.repository.AuctionRepository;
import com.project.base.repository.UserRepository;
import com.project.base.repository.UserSubscriptionRepository;
import com.project.base.services.AuctionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    private AuctionRepository auctionRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserSubscriptionRepository subscriptionRepo;

    @Override
    public List<Auction> viewActiveAuctions(Long userId) {

        // 1️⃣ Validate user
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2️⃣ Validate active subscription
        UserSubscription subscription = subscriptionRepo
                .findAllByUserAndStatus(user, SubscriptionStatus.ACTIVE)
                .stream()
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException("No active subscription"));

        // 3️⃣ Check remaining bids
        if (subscription.getBidsRemaining() <= 0) {
            throw new RuntimeException(
                    "No bids remaining. Please upgrade your plan.");
        }

        // 4️⃣ Return active auctions
        return auctionRepo.findByStatus(AuctionStatus.ACTIVE);
    }
}
