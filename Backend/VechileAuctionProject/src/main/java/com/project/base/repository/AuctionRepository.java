package com.project.base.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.persistence.LockModeType;

import com.project.base.pojo.Auction;
import com.project.base.pojo.AuctionStatus;
import com.project.base.pojo.User;

public interface AuctionRepository extends JpaRepository<Auction, Long> {

    // ===============================
    // BASIC AUCTION QUERIES
    // ===============================

    // All auctions by status (ACTIVE / ENDED)
    List<Auction> findByStatus(AuctionStatus status);

    // Safety check: prevent multiple active auctions for same car
    boolean existsByCarIdAndStatus(Long carId, AuctionStatus status);

    // ===============================
    // AUCTION AUTO-CLOSE SUPPORT
    // ===============================

    // Find auctions that should be closed by scheduler
    List<Auction> findByStatusAndEndTimeBefore(
            AuctionStatus status,
            LocalDateTime time
    );

    // ===============================
    // WINNER / DASHBOARD
    // ===============================

    // Fetch auctions won by logged-in user
    //List<Auction> findByWinner(User winner);

    // ===============================
    // ROW-LEVEL LOCKING
    // ===============================

    // Lock auction row (used during bid placement / start auction)
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT a FROM Auction a WHERE a.id = :id")
    Optional<Auction> findByIdForUpdate(@Param("id") Long id);
}
