package com.project.base.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

import com.project.base.pojo.Car;
import com.project.base.pojo.Status;

import jakarta.persistence.LockModeType;

public interface CarRepository extends JpaRepository<Car, Long> {
	List<Car>  findBySellerId(Long sellerId);
    List<Car> findByStatus(Status status);
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT c FROM Car c WHERE c.id = :carId")
    Optional<Car> findByIdForUpdate(@Param("carId") Long carId);
  
    

}
