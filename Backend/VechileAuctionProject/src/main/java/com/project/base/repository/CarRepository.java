package com.project.base.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.base.pojo.Car;
@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
		
}
