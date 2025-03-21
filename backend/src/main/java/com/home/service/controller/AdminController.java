package com.home.service.controller;

import com.home.service.model.User;
import com.home.service.model.Booking;
import com.home.service.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
//@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // ✅ Fetch all service providers
    @GetMapping("/service-providers")
    public List<User> getAllServiceProviders() {
        return adminService.getAllServiceProviders();
    }


    // ✅ Remove a service provider
    @DeleteMapping("/service-providers/{id}")
    public ResponseEntity<String> removeServiceProvider(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.removeServiceProvider(id));
    }

    // ✅ Fetch all bookings
    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return adminService.getAllBookings();
    }
    @GetMapping("/customers")
    public List<User> getAllCustomers() {
        return adminService.getAllCustomers();
    }
    
    @DeleteMapping("/customers/{id}")
    public ResponseEntity<String> removeCustomer(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.removeCustomer(id));
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = adminService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }
    
    
}