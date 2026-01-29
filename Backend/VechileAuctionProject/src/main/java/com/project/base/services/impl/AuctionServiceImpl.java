package com.project.base.services.impl;

import com.project.base.pojo.Auction;
import com.project.base.pojo.AuctionStatus;
import com.project.base.pojo.Car;
import com.project.base.pojo.Status;
import com.project.base.pojo.SubscriptionStatus;
import com.project.base.pojo.User;
import com.project.base.pojo.UserSubscription;
import com.project.base.repository.AuctionRepository;
import com.project.base.repository.CarRepository;
import com.project.base.repository.UserRepository;
import com.project.base.repository.UserSubscriptionRepository;
import com.project.base.services.AuctionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
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

    @Autowired
    private CarRepository carRepo;

    // ================= BUYER =================

    @Override
    public List viewActiveAuctions(Long userId) {

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

    // ================= SELLER =================

    @Override
    public void startAuction(Long carId, Long sellerId) {

        // 🔒 Lock car row to prevent race conditions
        Car car = carRepo.findByIdForUpdate(carId)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        // 1️⃣ Ownership check
        if (!car.getSeller().getId().equals(sellerId)) {
            throw new RuntimeException("You are not the owner of this car");
        }

        // 2️⃣ Status check
        if (car.getStatus() != Status.AVAILABLE) {
            throw new RuntimeException("Car is not eligible for auction");
        }

        // 3️⃣ Max auction attempts check
        if (car.getAuctionAttempts() >= 3) {
            throw new RuntimeException("Maximum auction attempts reached");
        }

        // 4️⃣ Cooldown check (24 hours)
        if (car.getLastAuctionEndedAt() != null) {

            long hoursSinceLastAuction =
                    Duration.between(
                            car.getLastAuctionEndedAt(),
                            LocalDateTime.now()
                    ).toHours();

            if (hoursSinceLastAuction < 24) {
                throw new RuntimeException(
                        "Cooldown period not completed");
            }
        }

        // 5️⃣ Active auction safety check
        boolean activeAuctionExists =
                auctionRepo.existsByCarIdAndStatus(
                        carId, AuctionStatus.ACTIVE);

        if (activeAuctionExists) {
            throw new RuntimeException(
                    "An active auction already exists for this car");
        }

        // 6️⃣ Create auction
        Auction auction = new Auction();
        auction.setCar(car);
        auction.setStartTime(LocalDateTime.now());
        auction.setStatus(AuctionStatus.ACTIVE);

        auctionRepo.save(auction);

        // 7️⃣ Update car status
        car.setStatus(Status.UNDER_AUCTION);
        carRepo.save(car);
    }
}
