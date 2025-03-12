package com.home.service.repository;

import com.home.service.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerId(Long customerId);
    List<Booking> findByProviderId(Long providerId);
    List<Booking> findByProviderIdAndStatus(Long providerId, String status);
    List<Booking> findByCustomerIdAndStatus(Long customerId, String status);
    List<Booking> findByProviderIdAndDateAndTimeSlot(Long providerId, String date, String timeSlot);
    List<Booking> findByProviderIdAndStatusIn(Long providerId, List<String> statuses);
}
