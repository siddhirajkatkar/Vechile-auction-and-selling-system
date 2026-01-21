package com.project.base.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.base.dto.AuthRequestDto;
import com.project.base.dto.AuthResponseDto;
import com.project.base.pojo.User;
import com.project.base.pojo.UserStatus;
import com.project.base.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServicesImpl implements UserService {

    private final UserRepository userRepo;

    @Override
    public AuthResponseDto authenticate(AuthRequestDto dto) {

        User user = userRepo.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!dto.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new RuntimeException("User account is not active");
        }

        AuthResponseDto response = new AuthResponseDto();
        response.setEmail(user.getEmail());
        response.setMessage("Successful Login!");

        return response;
    }
}
