package com.project.base.services;

import java.util.List;

import com.project.base.dto.AuctionResponseDTO;
import com.project.base.pojo.User;

public interface AuctionService {

    // ================= BUYER =================

    /**
     * View all active auctions.
     * Subscription validation handled internally.
     */
    List<AuctionResponseDTO> viewActiveAuctions(Long userId);

    /**
     * View single auction (Auction Details page).
     */
    AuctionResponseDTO getAuctionById(Long auctionId);

    // ================= SELLER =================

    /**
     * Start auction for a car owned by the seller.
     * Applies status, cooldown, and attempt validations.
     */
    void startAuction(Long carId, Long sellerId);

    // ================= SYSTEM (SCHEDULER) =================

    /**
     * Automatically close expired auctions
     * and decide winners.
     * Executed by scheduler.
     */
    void closeExpiredAuctions();

    // ================= USER DASHBOARD =================

    /**
     * Fetch auctions won by logged-in user.
     */
    List<AuctionResponseDTO> getMyWonAuctions(User user);

	List<AuctionResponseDTO> getAllAuctionsForAdmin();
}
