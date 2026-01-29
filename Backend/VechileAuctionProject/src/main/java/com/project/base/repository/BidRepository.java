package com.project.base.repository;

import com.project.base.pojo.Bid;
import com.project.base.pojo.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface BidRepository extends JpaRepository<Bid, Long> {

    /**
     * Get highest bid amount in an auction
     */
    @Query("""
        SELECT MAX(b.bidAmount)
        FROM Bid b
        WHERE b.auction.id = :auctionId
    """)
    Optional<BigDecimal> findHighestBidAmount(
            @Param("auctionId") Long auctionId
    );

    /**
     * Get all distinct auction IDs where a user has placed bids
     */
    @Query("""
        SELECT DISTINCT b.auction.id
        FROM Bid b
        WHERE b.bidder.id = :bidderId
    """)
    List<Long> findDistinctAuctionIdsByBidderId(
            @Param("bidderId") Long bidderId
    );

    /**
     * Get highest bid amount by a specific user in a specific auction
     */
    @Query("""
        SELECT MAX(b.bidAmount)
        FROM Bid b
        WHERE b.bidder.id = :bidderId
          AND b.auction.id = :auctionId
    """)
    Optional<BigDecimal> findMaxBidAmountByBidderAndAuction(
            @Param("bidderId") Long bidderId,
            @Param("auctionId") Long auctionId
    );

    /**
     * Get all bids for an auction (ordered by highest bid first)
     */
    @Query("""
        SELECT b
        FROM Bid b
        WHERE b.auction.id = :auctionId
        ORDER BY b.bidAmount DESC
    """)
    List<Bid> findBidsByAuctionOrderedDesc(
            @Param("auctionId") Long auctionId
    );
    List<Bid> findByBidderOrderByBidTimeDesc(User bidder);

}
