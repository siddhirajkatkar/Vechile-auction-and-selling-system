package com.project.base.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.base.dto.CartResponseDTO;
import com.project.base.services.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    

    @PostMapping("/add/{carId}")
    public ResponseEntity<?> addToCart(@PathVariable Long carId,
                                       Authentication auth) {
        cartService.addToCart(carId, auth.getName());
        return ResponseEntity.ok("Car added to cart");
    }

    @GetMapping("/my")
    public ResponseEntity<?> myCart(Authentication auth) {
        return ResponseEntity.ok(cartService.getMyCart(auth.getName()));
    }
}

