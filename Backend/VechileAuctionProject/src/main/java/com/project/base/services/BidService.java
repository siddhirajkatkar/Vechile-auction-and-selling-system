package com.project.base.services;

public interface BidService {

    void placeBid(Long auctionId, Long buyerId, double bidAmount);
}
