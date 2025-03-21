package com.home.service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String mobile;
    private String email;
    private String gender;
    private String state;
    private String city;
    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // CUSTOMER or SERVICE_PROVIDER

    // Fields specific to service providers
    private String serviceType;
    private Integer experience;
    private Double visitingCharges;
}
