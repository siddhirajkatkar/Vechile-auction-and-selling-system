package com.project.base.repository;

import com.project.base.pojo.Auction;
import com.project.base.pojo.Bid;
import com.project.base.pojo.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.persistence.LockModeType;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface BidRepository extends JpaRepository<Bid, Long> {

    // ===============================
    // HIGHEST BID (AUCTION WINNER)
    // ===============================

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
     * Get highest bid entity (used when auction ends)
     */
    Bid findTopByAuctionOrderByBidAmountDesc(Auction auction);

    // ===============================
    // USER BID HISTORY
    // ===============================

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

    /**
     * Get bid history of a user (latest bids first)
     */
    List<Bid> findByBidderOrderByBidTimeDesc(User bidder);

    // ===============================
    // CONCURRENCY SAFETY (OPTIONAL)
    // ===============================

    /**
     * Lock bids for an auction (used in high-concurrency bidding)
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
        SELECT b
        FROM Bid b
        WHERE b.auction.id = :auctionId
    """)
    List<Bid> findByAuctionIdForUpdate(
            @Param("auctionId") Long auctionId
    );
    
    @Query("""
    		SELECT b.auction
    		FROM Bid b
    		WHERE b.bidder = :user
    		AND b.bidAmount = (
    		    SELECT MAX(b2.bidAmount)
    		    FROM Bid b2
    		    WHERE b2.auction = b.auction
    		)
    		AND b.auction.status = com.project.base.pojo.AuctionStatus.COMPLETED
    		""")
    		List<Auction> findWonAuctionsByUser(@Param("user") User user);

}
