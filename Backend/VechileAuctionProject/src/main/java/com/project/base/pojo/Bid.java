package com.project.base.pojo;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bids")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bid_id")
    private Long bidId;

    // ===============================
    // MANY BIDS → ONE AUCTION
    // ===============================
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "auction_id", nullable = false)
    private Auction auction;

    // ===============================
    // MANY BIDS → ONE USER (BIDDER)
    // ===============================
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "bidder_id", nullable = false)
    private User bidder;

    // ===============================
    // BID AMOUNT
    // ===============================
    @Column(name = "bid_amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal bidAmount;

    // ===============================
    // BID TIME
    // ===============================
    @Column(name = "bid_time", nullable = false)
    private LocalDateTime bidTime;
}
