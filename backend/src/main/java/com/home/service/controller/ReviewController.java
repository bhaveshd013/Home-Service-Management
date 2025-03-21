package com.home.service.controller;

import com.home.service.model.Review;
import com.home.service.model.User;
import com.home.service.repository.ReviewRepository;
import com.home.service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
//@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ Save a Review
    @PostMapping("/add")
    public ResponseEntity<String> addReview(@RequestBody Review review) {
        System.out.println("Received review request: " + review);

        if (review.getCustomer() == null || review.getCustomer().getId() == null) {
            return ResponseEntity.badRequest().body("Customer ID is missing.");
        }
        if (review.getProvider() == null || review.getProvider().getId() == null) {
            return ResponseEntity.badRequest().body("Provider ID is missing.");
        }
        if (review.getRating() < 1 || review.getRating() > 5) {
            return ResponseEntity.badRequest().body("Invalid rating value. It should be between 1 and 5.");
        }
        if (review.getComment() == null || review.getComment().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Comment cannot be empty.");
        }

        User customer = userRepository.findById(review.getCustomer().getId()).orElse(null);
        User provider = userRepository.findById(review.getProvider().getId()).orElse(null);

        if (customer == null || provider == null) {
            return ResponseEntity.badRequest().body("Invalid customer or provider.");
        }

        review.setTimestamp(LocalDateTime.now());
        reviewRepository.save(review);
        return ResponseEntity.ok("Review added successfully!");
    }



    // ✅ Get Reviews for a Service Provider
    @GetMapping("/provider/{providerId}")
    public ResponseEntity<List<Review>> getProviderReviews(@PathVariable Long providerId) {
        List<Review> reviews = reviewRepository.findByProviderId(providerId);
        return ResponseEntity.ok(reviews);
    }

    // ✅ Get Reviews for a Customer
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Review>> getCustomerReviews(@PathVariable Long customerId) {
        List<Review> reviews = reviewRepository.findByCustomerId(customerId);
        return ResponseEntity.ok(reviews);
    }
    
    @GetMapping("/service-providers")
    public ResponseEntity<List<User>> getAllServiceProviders() {
    	System.out.println("Get all service providers");
        List<User> providers = userRepository.findAllServiceProviders();
        for(Object o:providers)
        {
        	System.out.println(o);
        }
        return ResponseEntity.ok(providers);
    }
    
    

}
