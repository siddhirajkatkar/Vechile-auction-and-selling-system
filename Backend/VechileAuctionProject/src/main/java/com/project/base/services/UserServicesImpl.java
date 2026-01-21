package com.project.base.services;

import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
	
	
	 private final UserRepository userRepo;
	 private final RoleRepository roleRepo;
	 private final PasswordEncoder passwordEncoder;
	
	
	@Transactional
	public String RegisterUser(UserDTO userDto) throws ApiException {

	    if (userRepo.existsByEmail(userDto.getEmail())) {
	        throw new ApiException("Email already exists");
	    }

	    // Default role
	    RoleName roleName = userDto.getRole();
	    if (roleName == null) {
	        roleName = RoleName.ROLE_BUYER;
	    }

	    // Prevent admin registration
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
	    user.setPassword(passwordEncoder.encode(userDto.getPassword())); // ✅ ENCODE
	    user.setPhone(userDto.getPhone());
	    user.setAddress(userDto.getAddress());
	    user.setStatus(UserStatus.ACTIVE);

	    // Assign role
	    user.getRoles().add(role);
	    role.getUsers().add(user); // ✅ maintain bidirectional consistency
	    System.out.println("ROLE FOUND: " + role);


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
