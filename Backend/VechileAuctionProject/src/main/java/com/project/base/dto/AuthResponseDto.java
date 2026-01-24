package com.project.base.dto;

//import com.healthcare.entities.UserRole;
import com.project.base.pojo.Role;
import com.project.base.pojo.RoleName;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

public class AuthResponseDto {

    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String role;   // ✅ String, not Role entity
    private String message;
}


