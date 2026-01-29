package com.project.base.services.impl;

import com.project.base.dto.BidResponseDTO;
import com.project.base.dto.MyBidResponseDTO;
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
    public void placeBid(Long auctionId, Long buyerId, double bidAmount) {

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

        // 3️⃣ LOCK auction row (CRITICAL)
        Auction auction = auctionRepo.findByIdForUpdate(auctionId)
                .orElseThrow(() -> new RuntimeException("Auction not found"));

        // 4️⃣ Auction validations
        if (auction.getStatus() != AuctionStatus.ACTIVE) {
            throw new RuntimeException("Auction is not active");
        }

        if (LocalDateTime.now().isAfter(auction.getEndTime())) {
            throw new RuntimeException("Auction has already ended");
        }

        // 🚫 Seller cannot bid
        if (auction.getCar().getSeller().getId().equals(buyerId)) {
            throw new RuntimeException("Seller cannot bid on own car");
        }

        // 5️⃣ Highest bid (safe fallback)
        BigDecimal highestBid = bidRepo
                .findHighestBidAmount(auctionId)
                .orElse(auction.getCurrentPrice());

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

        // 7️⃣ Update auction price
        auction.setCurrentPrice(bidAmountBD);
        auctionRepo.save(auction);

        // 8️⃣ Decrease remaining bids
        subscription.setBidsRemaining(
                subscription.getBidsRemaining() - 1
        );
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
