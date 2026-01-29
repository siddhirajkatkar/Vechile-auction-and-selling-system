package com.project.base.services.impl;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.base.dto.AuctionResponseDTO;
import com.project.base.pojo.Auction;
import com.project.base.pojo.AuctionStatus;
import com.project.base.pojo.Car;
import com.project.base.pojo.Status;
import com.project.base.repository.AuctionRepository;
import com.project.base.repository.CarRepository;
import com.project.base.services.AuctionService;

@Service
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    private AuctionRepository auctionRepo;

    @Autowired
    private CarRepository carRepo;

    // ===============================
    // BUYER / SELLER
    // ===============================

    /**
     * View all active auctions
     */
    @Override
    @Transactional(readOnly = true)
    public List<AuctionResponseDTO> viewActiveAuctions(Long userId) {

        return auctionRepo.findByStatus(AuctionStatus.ACTIVE)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    /**
     * View single auction (View Auction page)
     */
    @Override
    @Transactional(readOnly = true)
    public AuctionResponseDTO getAuctionById(Long auctionId) {

        Auction auction = auctionRepo.findById(auctionId)
                .orElseThrow(() ->
                        new RuntimeException("Auction not found"));

        return mapToDto(auction);
    }

    // ===============================
    // SELLER
    // ===============================

    /**
     * Start auction for approved car
     */
    @Override
    @Transactional
    public void startAuction(Long carId, Long sellerId) {

        // 🔒 Lock car row
        Car car = carRepo.findByIdForUpdate(carId)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        // Ownership check
        if (!car.getSeller().getId().equals(sellerId)) {
            throw new RuntimeException("You are not the owner of this car");
        }

        // Status check
        if (car.getStatus() != Status.AVAILABLE) {
            throw new RuntimeException("Car must be approved before auction");
        }

        // Max auction attempts
        if (car.getAuctionAttempts() >= 3) {
            throw new RuntimeException("Maximum auction attempts reached");
        }

        // Cooldown (24h)
        if (car.getLastAuctionEndedAt() != null) {
            long hours =
                    Duration.between(
                            car.getLastAuctionEndedAt(),
                            LocalDateTime.now()
                    ).toHours();

            if (hours < 24) {
                throw new RuntimeException("Cooldown period not completed");
            }
        }

        // Safety: active auction check
        if (auctionRepo.existsByCarIdAndStatus(
                carId, AuctionStatus.ACTIVE)) {

            throw new RuntimeException(
                    "Active auction already exists");
        }

        // Create auction
        Auction auction = new Auction();
        auction.setCar(car);
        auction.setStartTime(LocalDateTime.now());
        auction.setEndTime(LocalDateTime.now().plusHours(24));
        auction.setStatus(AuctionStatus.ACTIVE);
        auction.setCurrentPrice(
                BigDecimal.valueOf(car.getPrice())
        );

        auctionRepo.save(auction);

        // Update car
        car.setStatus(Status.UNDER_AUCTION);
        car.setAuctionAttempts(car.getAuctionAttempts() + 1);
        carRepo.save(car);
    }

    // ===============================
    // ENTITY → DTO (SINGLE SOURCE)
    // ===============================

    private AuctionResponseDTO mapToDto(Auction auction) {

        AuctionResponseDTO dto = new AuctionResponseDTO();

        dto.setAuctionId(auction.getId());
        dto.setCarId(auction.getCar().getId());

        dto.setBrand(auction.getCar().getBrand());
        dto.setModel(auction.getCar().getModel());

        dto.setCurrentPrice(
                auction.getCurrentPrice() != null
                        ? auction.getCurrentPrice()
                        : BigDecimal.valueOf(
                                auction.getCar().getPrice())
        );

        dto.setEndTime(auction.getEndTime());
        dto.setStatus(auction.getStatus().name());

        return dto;
    }
}
