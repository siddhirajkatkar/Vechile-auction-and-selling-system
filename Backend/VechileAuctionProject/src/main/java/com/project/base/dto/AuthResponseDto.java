package com.project.base.dto;

//import com.healthcare.entities.UserRole;
import com.project.base.pojo.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class AuthResponseDto {
	private Long id;
	private String firstName;	
	private String lastName;	
	private String email;
	private Role userRole;
	private String message;

}
