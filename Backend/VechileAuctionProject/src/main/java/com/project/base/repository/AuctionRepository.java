package com.project.base.repository;

import com.project.base.pojo.Auction;
import com.project.base.pojo.AuctionStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuctionRepository extends JpaRepository<Auction, Long> {

    // Fetch all active auctions
    List<Auction> findByStatus(AuctionStatus status);
    boolean existsByCarIdAndStatus(Long carId, AuctionStatus status);

}
