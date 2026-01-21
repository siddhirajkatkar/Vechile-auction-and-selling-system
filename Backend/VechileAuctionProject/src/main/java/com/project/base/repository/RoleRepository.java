package com.project.base.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.base.pojo.Role;
import com.project.base.pojo.RoleName;
import com.project.base.pojo.User;

public interface RoleRepository extends JpaRepository<Role, Long> {

	Role findByRoleName(RoleName roleName);

}
