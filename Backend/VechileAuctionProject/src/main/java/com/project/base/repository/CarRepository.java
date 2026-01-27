package com.project.base.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.base.pojo.Car;
import com.project.base.pojo.Status;

public interface CarRepository extends JpaRepository<Car, Long> {

    List<Car> findByStatus(Status status);
}
