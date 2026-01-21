package com.project.base.pojo;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@NoArgsConstructor // JPA requirement
@AllArgsConstructor
@Getter
@Setter
@AttributeOverride(name="id",column = @Column(name="user_id"))
public class User extends BaseEntity {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "user_id")
//    private Long userId;

    @Column(name = "first_name", length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "phone", length = 15)
    private String phone;

    @Column(name = "address", length = 255)
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private UserStatus status = UserStatus.ACTIVE;

//    @Column(name = "created_at", updatable = false)
//    private LocalDateTime createdAt;

    //Business constructor (User Registration)
    public User(String firstName,
                String lastName,
                String email,
                String password,
                String phone,
                String address) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
    }

   // login constructor
    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

//    @PrePersist
//    protected void onCreate() {
//        this.createdAt = LocalDateTime.now();
//    }
}
