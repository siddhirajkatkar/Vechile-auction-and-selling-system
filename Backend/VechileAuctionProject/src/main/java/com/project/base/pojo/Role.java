package com.project.base.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name = "roles")
@NoArgsConstructor
@Getter
@Setter
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long roleId;

    @Enumerated(EnumType.STRING)   // ✅ THIS FIXES THE ERROR
    @Column(name = "role_name", nullable = false, unique = true)
    private RoleName roleName;

 // In Role.java
    @ManyToMany(mappedBy = "roles")
    @JsonIgnore // ✅ This prevents Jackson from trying to load the users of a role
    private Set<User> users = new HashSet<>();
}
