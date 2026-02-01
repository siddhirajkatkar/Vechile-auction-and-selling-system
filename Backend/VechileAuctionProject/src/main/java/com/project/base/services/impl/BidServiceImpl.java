package com.project.base.services.impl;

import com.project.base.dto.BidResponseDTO;
import com.project.base.dto.MyBidResponseDTO;
import com.project.base.exception.BidException;
import com.project.base.pojo.*;
import com.project.base.repository.*;
import com.project.base.services.BidService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

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
    @Transactional
    public void placeBid(Long auctionId, Long buyerId, double bidAmount) {

        BigDecimal bidAmountBD = BigDecimal.valueOf(bidAmount);

        // 1️⃣ Validate buyer
        User buyer = userRepo.findById(buyerId)
                .orElseThrow(() ->
                        new BidException("Buyer account not found.")
                );

        // 2️⃣ Validate ACTIVE subscription
        UserSubscription subscription = subscriptionRepo
                .findAllByUserAndStatus(buyer, SubscriptionStatus.ACTIVE)
                .stream()
                .findFirst()
                .orElseThrow(() ->
                        new BidException(
                            "You do not have an active subscription. Please buy a plan to place bids."
                        )
                );

        // 🔒 Extra safety (future-proof)
        if (subscription.getStatus() != SubscriptionStatus.ACTIVE) {
            throw new BidException(
                    "Your subscription has expired. Please renew to continue bidding."
            );
        }

        if (subscription.getBidsRemaining() <= 0) {
            throw new BidException(
                    "You have exhausted all your bids. Upgrade or renew your plan."
            );
        }

        // 3️⃣ LOCK auction row (concurrency safe)
        Auction auction = auctionRepo.findByIdForUpdate(auctionId)
                .orElseThrow(() ->
                        new BidException("Auction not found.")
                );

        // 4️⃣ Auction validations
        if (auction.getStatus() != AuctionStatus.ACTIVE) {
            throw new BidException("This auction is not active.");
        }

        if (auction.getEndTime().isBefore(LocalDateTime.now())) {
            throw new BidException("This auction has already ended.");
        }

        // 🚫 Seller cannot bid on own car
        if (auction.getCar().getSeller().getId().equals(buyerId)) {
            throw new BidException("You cannot bid on your own car.");
        }

        // 5️⃣ Enforce bid limit per auction
        long userBidsInThisAuction =
                bidRepo.countByAuctionAndBidder(auction, buyer);

        if (userBidsInThisAuction >= subscription.getPlan().getBidsPerAuction()) {
            throw new BidException(
                    "You have reached the maximum bids allowed for this auction."
            );
        }

        // 6️⃣ Highest bid validation
        BigDecimal highestBid = bidRepo
                .findHighestBidAmount(auctionId)
                .orElse(auction.getCurrentPrice());

        if (bidAmountBD.compareTo(highestBid) <= 0) {
            throw new BidException(
                    "Your bid must be higher than the current highest bid."
            );
        }

        // 7️⃣ Save bid
        Bid bid = new Bid();
        bid.setAuction(auction);
        bid.setBidder(buyer);
        bid.setBidAmount(bidAmountBD);
        bid.setBidTime(LocalDateTime.now());
        bidRepo.save(bid);

        // 8️⃣ Update auction price
        auction.setCurrentPrice(bidAmountBD);
        auctionRepo.save(auction);

        // 9️⃣ Decrease remaining bids
        subscription.setBidsRemaining(subscription.getBidsRemaining() - 1);
        subscriptionRepo.save(subscription);
    }

	
    @Override
    @Transactional(readOnly = true)
    public List<BidResponseDTO> getBidHistory(Long auctionId) {

        return bidRepo.findBidsByAuctionOrderedDesc(auctionId)
                .stream()
                .map(bid -> {
                    BidResponseDTO dto = new BidResponseDTO();
                    dto.setBidAmount(bid.getBidAmount());
                    dto.setBidTime(bid.getBidTime());

                    // You can mask name if needed
                    dto.setBidderName(
                            bid.getBidder().getFirstName()
                    );

                    return dto;
                })
                .toList();
    }
    @Override
    public List<MyBidResponseDTO> getBidsByBuyer(Long buyerId) {

        User buyer = userRepo.findById(buyerId)
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        List<Bid> bids = bidRepo.findByBidderOrderByBidTimeDesc(buyer);

        return bids.stream().map(bid -> {

            MyBidResponseDTO dto = new MyBidResponseDTO();

            dto.setAuctionId(bid.getAuction().getId());
            dto.setBrand(bid.getAuction().getCar().getBrand());
            dto.setModel(bid.getAuction().getCar().getModel());
            dto.setBidAmount(bid.getBidAmount());
            dto.setBidTime(bid.getBidTime());
            dto.setAuctionStatus(bid.getAuction().getStatus().name());

            return dto;
        }).toList();
    }



    
}
