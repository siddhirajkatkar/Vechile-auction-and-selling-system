package com.project.base.services.impl;

import com.project.base.pojo.*;
import com.project.base.repository.*;
import com.project.base.services.BidService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@Transactional
public class BidServiceImpl implements BidService {

    @Autowired
    private AuctionRepository auctionRepo;

    @Autowired
    private BidRepository bidRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserSubscriptionRepository subscriptionRepo;

    @Override
    public void placeBid(Long auctionId, Long buyerId, double bidAmount) {

        // 🔹 Convert ONCE at the boundary
        BigDecimal bidAmountBD = BigDecimal.valueOf(bidAmount);

        // 1️⃣ Validate buyer
        User buyer = userRepo.findById(buyerId)
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        // 2️⃣ Validate active subscription
        UserSubscription subscription = subscriptionRepo
                .findAllByUserAndStatus(buyer, SubscriptionStatus.ACTIVE)
                .stream()
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException("Active subscription required"));

        if (subscription.getBidsRemaining() <= 0) {
            throw new RuntimeException("No bids remaining");
        }

        // 3️⃣ Validate auction
        Auction auction = auctionRepo.findById(auctionId)
                .orElseThrow(() -> new RuntimeException("Auction not found"));

        if (auction.getStatus() != AuctionStatus.ACTIVE) {
            throw new RuntimeException("Auction is not active");
        }

        if (LocalDateTime.now().isAfter(auction.getEndTime())) {
            throw new RuntimeException("Auction has already ended");
        }

        // 4️⃣ Get current highest bid (fallback = start price)
        BigDecimal highestBid = bidRepo
                .findHighestBidAmount(auctionId)
                .orElse(auction.getStartPrice());

        // 5️⃣ Validate bid amount
        if (bidAmountBD.compareTo(highestBid) <= 0) {
            throw new RuntimeException(
                    "Bid must be higher than current highest bid");
        }

        // 6️⃣ Save bid
        Bid bid = new Bid();
        bid.setAuction(auction);
        bid.setBidder(buyer);
        bid.setBidAmount(bidAmountBD);
        bid.setBidTime(LocalDateTime.now());

        bidRepo.save(bid);

        // 7️⃣ Update auction current price
        auction.setCurrentPrice(bidAmountBD);
        auctionRepo.save(auction);

        // 8️⃣ Decrease remaining bids
        subscription.setBidsRemaining(
                subscription.getBidsRemaining() - 1
        );
        subscriptionRepo.save(subscription);
    }
}
