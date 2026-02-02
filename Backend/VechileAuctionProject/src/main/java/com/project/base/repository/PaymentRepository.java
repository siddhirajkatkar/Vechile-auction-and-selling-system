package com.project.base.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.base.pojo.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{
    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);


}
