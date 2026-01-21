package com.project.base.services;

import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.base.dto.AuthRequestDto;
import com.project.base.dto.AuthResponseDto;
import com.project.base.dto.UserDTO;
import com.project.base.exception.ApiException;
import com.project.base.pojo.Role;
import com.project.base.pojo.RoleName;
import com.project.base.pojo.User;
import com.project.base.pojo.UserStatus;
import com.project.base.repository.RoleRepository;
import com.project.base.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServicesImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	private final RoleRepository roleRepo;
//	private final ModelMapper modelMapper;
//	private PasswordEncoder passwordEncoder;
	
	
	 public String RegisterUser(UserDTO userDto) throws ApiException {

	        if (userRepo.existsByEmail(userDto.getEmail())) {
	            throw new ApiException("Email already exists");
	        }

	        RoleName roleName = userDto.getRole();
	        if (roleName == null) {
	            roleName = RoleName.ROLE_BUYER;
	        }

	        if (roleName == RoleName.ROLE_ADMIN) {
	            throw new ApiException("Admin registration not allowed");
	        }

	        Role role = roleRepo.findByRoleName(roleName);
	        if (role == null) {
	            throw new ApiException("Role not found in database");
	        }

	        User user = new User();
	        user.setFirstName(userDto.getFirstName());
	        user.setLastName(userDto.getLastName());
	        user.setEmail(userDto.getEmail());
	        user.setPassword(userDto.getPassword()); // encode later
	        user.setPhone(userDto.getPhone());
	        user.setAddress(userDto.getAddress());
	        user.setRole(role);
	        user.setStatus(UserStatus.ACTIVE);

	        userRepo.save(user);

	        return "User registered successfully";
	    }
	

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
