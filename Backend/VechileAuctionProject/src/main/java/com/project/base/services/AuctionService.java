package com.project.base.services;

import java.util.List;

import com.project.base.dto.AuctionResponseDTO;
import com.project.base.pojo.User;

public interface AuctionService {

    List<AuctionResponseDTO> viewActiveAuctions();

    AuctionResponseDTO getAuctionById(Long auctionId);

    void startAuction(Long carId, Long sellerId);

    void closeExpiredAuctions();

    List<AuctionResponseDTO> getMyWonAuctions(User user);

    List<AuctionResponseDTO> getAllAuctionsForAdmin();

    void markAsPaid(Long auctionId);
}
