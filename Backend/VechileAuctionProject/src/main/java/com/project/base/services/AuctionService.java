package com.project.base.services;

import com.project.base.pojo.Auction;

import java.util.List;

public interface AuctionService {

    List<Auction> viewActiveAuctions(Long userId);
}
