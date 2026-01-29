package com.project.base.controller;

import com.project.base.dto.AuctionResponseDTO;
import com.project.base.dto.ApiResponse;
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

    // ================= BUYER =================

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_BUYER')")
    public ResponseEntity<List<AuctionResponseDTO>> viewAuctions() {

        Long userId = userService.getCurrentUser().getId();

        return ResponseEntity.ok(
                auctionService.viewActiveAuctions(userId)
        );
    }

    // ================= SELLER =================

    @PostMapping("/start/{carId}")
    @PreAuthorize("hasAuthority('ROLE_SELLER')")
    public ResponseEntity<ApiResponse> startAuction(
            @PathVariable Long carId) {

        Long sellerId = userService.getCurrentUser().getId();

        auctionService.startAuction(carId, sellerId);

        return ResponseEntity.ok(
                new ApiResponse("Auction started successfully")
        );
    }
}
