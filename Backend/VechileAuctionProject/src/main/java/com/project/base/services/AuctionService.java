package com.project.base.services;

import com.project.base.dto.AuctionResponseDTO;
import com.project.base.pojo.Auction;

import java.util.List;

public interface AuctionService {

    // ================= BUYER =================

    /**
     * View all active auctions.
     * Subscription validation handled internally.
     */
    List<AuctionResponseDTO> viewActiveAuctions(Long userId);

    // ================= SELLER =================

    /**
     * Start auction for a car owned by the seller.
     * Applies status, cooldown, and attempt validations.
     */
    void startAuction(Long carId, Long sellerId);
    
    AuctionResponseDTO getAuctionById(Long auctionId);

}
