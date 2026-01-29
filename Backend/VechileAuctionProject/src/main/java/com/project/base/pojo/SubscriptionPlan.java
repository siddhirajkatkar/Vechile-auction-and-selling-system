package com.project.base.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "subscription_plans")
@Getter
@Setter
public class SubscriptionPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plan_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "plan_name", unique = true, nullable = false)
    private PlanName planName;

    private double price;

    @Column(name = "total_bids")
    private int totalBids;

    @Column(name = "bids_per_auction")
    private int bidsPerAuction;
}
