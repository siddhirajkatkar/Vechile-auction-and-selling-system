package com.project.base.controller;

import com.project.base.pojo.Auction;
import com.project.base.services.AuctionService;
import com.project.base.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auctions")
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @Autowired
    private UserService userService;

    // BUYER can view auctions only if subscription is valid
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_BUYER')")
    public ResponseEntity<List<Auction>> viewAuctions() {

        Long userId = userService.getCurrentUser().getId();

        return ResponseEntity.ok(
                auctionService.viewActiveAuctions(userId)
        );
    }
}
