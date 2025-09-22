package com.vroom.vroom.repository;

import com.vroom.vroom.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByRequesterId(Integer requesterId);
    List<Booking> findByDriverId(Integer driverId);
    List<Booking> findByRidePay_RideId(Integer rideId);
    List<Booking> findByDriverIdAndStatus(Integer driverId, Booking.BookingStatus bookingStatus);
    List<Booking> findByRequesterIdAndStatus(Integer requesterId, Booking.BookingStatus bookingStatus);
    List<Booking> findByRidePay_RideIdAndRequesterId(Integer rideId, Integer requesterId);
}
