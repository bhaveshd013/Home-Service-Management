package com.home.service.repository;

import com.home.service.model.User;
import com.home.service.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdminRepository extends JpaRepository<User, Long> {
    
    // ✅ Fetch only customers
    List<User> findByRole(Role role);
    
    
    // ✅ Count users by role (Customer or Service Provider)
    long countByRole(Role role);

    // ✅ Count unique services provided by service providers
    @Query("SELECT COUNT(DISTINCT u.serviceType) FROM User u WHERE u.role = 'SERVICE_PROVIDER'")
    long countDistinctServiceTypes();
}
