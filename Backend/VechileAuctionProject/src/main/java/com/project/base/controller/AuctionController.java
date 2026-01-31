package com.project.base.controller;

import com.project.base.dto.AuctionResponseDTO;
import com.project.base.dto.ApiResponse;
import com.project.base.pojo.User;
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
    @PreAuthorize("hasAnyAuthority('ROLE_BUYER','ROLE_SELLER','ROLE_ADMIN')")
    public ResponseEntity<List<AuctionResponseDTO>> viewAuctions() {

        Long userId = userService.getCurrentUser().getId();

        return ResponseEntity.ok(
                auctionService.viewActiveAuctions(userId)
        );
    }

    @GetMapping("/{auctionId}")
    @PreAuthorize("hasAuthority('ROLE_BUYER') or hasAuthority('ROLE_SELLER')")
    public ResponseEntity<AuctionResponseDTO> getAuctionById(
            @PathVariable Long auctionId) {

        return ResponseEntity.ok(
                auctionService.getAuctionById(auctionId)
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

    // ================= USER DASHBOARD =================

    /**
     * Get auctions won by the logged-in user
     */
    @GetMapping("/my-wins")
    @PreAuthorize("hasAuthority('ROLE_BUYER')")
    public ResponseEntity<List<AuctionResponseDTO>> getMyWonAuctions() {

        User user = userService.getCurrentUser();

        return ResponseEntity.ok(
                auctionService.getMyWonAuctions(user)
        );
    }
    @GetMapping("/admin/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<AuctionResponseDTO>> getAllAuctionsForAdmin() {

        return ResponseEntity.ok(
                auctionService.getAllAuctionsForAdmin()
        );
    }

}
