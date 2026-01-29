package com.project.base.controller;

import com.project.base.services.BidService;
import com.project.base.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bids")
public class BidController {

    @Autowired
    private BidService bidService;

    @Autowired
    private UserService userService;

    @PostMapping("/place")
    @PreAuthorize("hasAuthority('ROLE_BUYER')")
    public ResponseEntity<String> placeBid(
            @RequestParam Long auctionId,
            @RequestParam double bidAmount) {

        Long buyerId = userService.getCurrentUser().getId();

        bidService.placeBid(auctionId, buyerId, bidAmount);

        return ResponseEntity.ok("Bid placed successfully");
    }
}
