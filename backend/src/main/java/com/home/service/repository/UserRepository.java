package com.home.service.repository;

import com.home.service.model.Role;
import com.home.service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.serviceType = :serviceType")
    List<User> findByRoleAndServiceType(@Param("role") Role role, @Param("serviceType") String serviceType);
    
    @Query("SELECT u FROM User u WHERE u.role = 'SERVICE_PROVIDER'")
    List<User> findAllServiceProviders();

}
