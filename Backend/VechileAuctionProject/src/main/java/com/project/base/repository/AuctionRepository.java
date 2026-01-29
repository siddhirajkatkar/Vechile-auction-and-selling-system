
package com.project.base.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.persistence.LockModeType;

import com.project.base.pojo.Auction;
import com.project.base.pojo.AuctionStatus;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
	List<Auction> findByStatus(AuctionStatus status);
    boolean existsByCarIdAndStatus(Long carId, AuctionStatus status);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT a FROM Auction a WHERE a.id = :id")
    Optional<Auction> findByIdForUpdate(@Param("id") Long id);
}
