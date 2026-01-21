package com.project.base.dto;

import com.project.base.pojo.Role;
import com.project.base.pojo.UserStatus;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

	
	private Long id;
    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String phone;

    private String address;

    private Role role;

}
