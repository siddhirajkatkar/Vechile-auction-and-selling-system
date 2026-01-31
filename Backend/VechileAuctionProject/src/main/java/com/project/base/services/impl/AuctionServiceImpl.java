package com.project.base.services.impl;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.base.dto.AuctionResponseDTO;
import com.project.base.pojo.Auction;
import com.project.base.pojo.AuctionStatus;
import com.project.base.pojo.Bid;
import com.project.base.pojo.Car;
import com.project.base.pojo.Status;
import com.project.base.pojo.User;
import com.project.base.repository.AuctionRepository;
import com.project.base.repository.BidRepository;
import com.project.base.repository.CarRepository;
import com.project.base.services.AuctionService;

@Service
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    private AuctionRepository auctionRepo;

    @Autowired
    private CarRepository carRepo;

    @Autowired
    private BidRepository bidRepo;

    // ================= BUYER =================

    @Override
    @Transactional(readOnly = true)
    public List<AuctionResponseDTO> viewActiveAuctions(Long userId) {

        return auctionRepo.findByStatus(AuctionStatus.ACTIVE)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AuctionResponseDTO getAuctionById(Long auctionId) {

        Auction auction = auctionRepo.findById(auctionId)
                .orElseThrow(() -> new RuntimeException("Auction not found"));

        return mapToDto(auction);
    }

    // ================= SELLER =================

    @Override
    @Transactional
    public void startAuction(Long carId, Long sellerId) {

        Car car = carRepo.findByIdForUpdate(carId)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        if (!car.getSeller().getId().equals(sellerId)) {
            throw new RuntimeException("You are not the owner of this car");
        }

        if (car.getStatus() != Status.AVAILABLE) {
            throw new RuntimeException("Car must be approved before auction");
        }

        if (car.getAuctionAttempts() >= 3) {
            throw new RuntimeException("Maximum auction attempts reached");
        }

        if (car.getLastAuctionEndedAt() != null) {
            long hours = Duration.between(
                    car.getLastAuctionEndedAt(),
                    LocalDateTime.now()
            ).toHours();

            if (hours < 24) {
                throw new RuntimeException("Cooldown period not completed");
            }
        }

        if (auctionRepo.existsByCarIdAndStatus(carId, AuctionStatus.ACTIVE)) {
            throw new RuntimeException("Active auction already exists");
        }

        Auction auction = new Auction();
        auction.setCar(car);
        auction.setStartTime(LocalDateTime.now());
        auction.setEndTime(LocalDateTime.now().plusMinutes(10));
        auction.setStatus(AuctionStatus.ACTIVE);
        auction.setStartPrice(BigDecimal.valueOf(car.getPrice()));
        auction.setCurrentPrice(BigDecimal.valueOf(car.getPrice()));

        auctionRepo.save(auction);

        car.setStatus(Status.UNDER_AUCTION);
        car.setAuctionAttempts(car.getAuctionAttempts() + 1);
        carRepo.save(car);
    }

    // ================= SYSTEM =================

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void closeExpiredAuctions() {

        System.out.println("⏰ Scheduler running at " + LocalDateTime.now());

        List<Auction> expiredAuctions =
                auctionRepo.findByStatusAndEndTimeBefore(
                        AuctionStatus.ACTIVE,
                        LocalDateTime.now()
                );

        System.out.println("Expired auctions found: " + expiredAuctions.size());

        for (Auction auction : expiredAuctions) {
            auction.setStatus(AuctionStatus.COMPLETED);
            auctionRepo.save(auction);

            Car car = auction.getCar();
            car.setStatus(Status.AVAILABLE);
            car.setLastAuctionEndedAt(LocalDateTime.now());
            carRepo.save(car);

            System.out.println("✅ Auction COMPLETED: " + auction.getId());
        }
    }

    // ================= USER DASHBOARD =================

    @Override
    @Transactional(readOnly = true)
    public List<AuctionResponseDTO> getMyWonAuctions(User user) {

        return bidRepo.findWonAuctionsByUser(user)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // ================= ENTITY → DTO =================

    private AuctionResponseDTO mapToDto(Auction auction) {

        AuctionResponseDTO dto = new AuctionResponseDTO();

        dto.setAuctionId(auction.getId());
        dto.setCarId(auction.getCar().getId());

        dto.setBrand(auction.getCar().getBrand());
        dto.setModel(auction.getCar().getModel());

        dto.setCurrentPrice(
                auction.getCurrentPrice() != null
                        ? auction.getCurrentPrice()
                        : BigDecimal.valueOf(auction.getCar().getPrice())
        );

        dto.setEndTime(auction.getEndTime());
        dto.setStatus(auction.getStatus().name());

        // 🔥 ADD THIS BLOCK (WINNER LOGIC)
        if (auction.getStatus() == AuctionStatus.COMPLETED) {

            Bid topBid =
                    bidRepo.findTopByAuctionOrderByBidAmountDesc(auction);

            if (topBid != null) {
                dto.setWinnerId(topBid.getBidder().getId());
                dto.setWinnerName(topBid.getBidder().getFirstName());
                dto.setFinalPrice(topBid.getBidAmount());
            }
        }

        return dto;
    }
    @Override
    @Transactional(readOnly = true)
    public List<AuctionResponseDTO> getAllAuctionsForAdmin() {

        return auctionRepo.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }


}
