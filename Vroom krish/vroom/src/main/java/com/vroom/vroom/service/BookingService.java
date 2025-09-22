package com.vroom.vroom.service;

import com.vroom.vroom.entity.Booking;
import com.vroom.vroom.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    BookingRepository bookingRepository;

    public List<Booking> getBookingsByRequesterId(Integer requesterId) {
        return bookingRepository.findByRequesterId(requesterId);
    }

    public List<Booking> getBookingsByDriverId(Integer driverId) {
        return bookingRepository.findByDriverId(driverId);
    }

    public void saveBooking(Booking booking){
        bookingRepository.save(booking);
    }

    public void updateBooking(Booking booking, Integer bId) {
        
    }
    public List<Booking> getBookingsByRideId(Integer rideId) {
        return bookingRepository.findByRidePay_RideId(rideId);
    }

    public List<Booking> getBookingByDriverIdandStatus(Integer driverId, String status) {
        try {
            Booking.BookingStatus bookingStatus = Booking.BookingStatus.valueOf(status);
            return bookingRepository.findByDriverIdAndStatus(driverId, bookingStatus);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status value: " + status);
        }
    }

    public List<Booking> getBookingByRiderIdandStatus(Integer riderId, String status) {
        try {
            Booking.BookingStatus bookingStatus = Booking.BookingStatus.valueOf(status);
            return bookingRepository.findByRequesterIdAndStatus(riderId, bookingStatus);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status value: " + status);
        }
    }

    public List<Booking> getBookingByRideIdandRiderId(Integer rideId, Integer riderId) {
        try {
            return bookingRepository.findByRidePay_RideIdAndRequesterId(rideId, riderId);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status value: " + riderId);
        }
    }

    public void cancelBooking(Integer bId) {
        bookingRepository.deleteById(bId);
    }
}
