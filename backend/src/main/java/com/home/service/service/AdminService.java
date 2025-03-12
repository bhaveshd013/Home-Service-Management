package com.home.service.service;

import com.home.service.model.Role;
import com.home.service.model.User;
import com.home.service.model.Booking;
import com.home.service.repository.AdminRepository;
import com.home.service.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private BookingRepository bookingRepository;

    // ✅ Fetch all service providers
    public List<User> getAllServiceProviders() {
        return adminRepository.findByRole(Role.SERVICE_PROVIDER);
    }

    // ✅ Remove a service provider
    public String removeServiceProvider(Long id) {
        if (!adminRepository.existsById(id)) {
            return "Service provider not found!";
        }
        adminRepository.deleteById(id);
        return "Service provider removed successfully!";
    }

    // ✅ Fetch all bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

   
    // ✅ Fetch all customers
    public List<User> getAllCustomers() {
    	 List<User> customers = adminRepository.findByRole(Role.CUSTOMER);
    	    System.out.println("Customers Retrieved: " + customers.size()); // ✅ Debugging
    	    return customers;
    }

    // ✅ Remove a customer
    public String removeCustomer(Long id) {
        if (!adminRepository.existsById(id)) {
            return "Customer not found!";
        }
        adminRepository.deleteById(id);
        return "Customer removed successfully!";
    }
    
    // ✅ Get statistics for the admin dashboard
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("totalBookings", bookingRepository.count()); // ✅ Count total bookings
        stats.put("totalCustomers", adminRepository.countByRole(Role.CUSTOMER)); // ✅ Count total customers
        stats.put("totalServiceProviders", adminRepository.countByRole(Role.SERVICE_PROVIDER)); // ✅ Count total service providers
        stats.put("totalServices", adminRepository.countDistinctServiceTypes()); // ✅ Count unique services
        
        return stats;
    }
    
}