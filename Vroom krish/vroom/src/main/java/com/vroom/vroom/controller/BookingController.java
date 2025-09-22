package com.vroom.vroom.controller;

import com.vroom.vroom.entity.Booking;
import com.vroom.vroom.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class BookingController {

    @Autowired
    BookingService bookingService;

    @GetMapping("/api/booking-r/{uId}")
    @ResponseBody
    public List<Booking> getBookingByuReqId(@PathVariable Integer uId){
        return bookingService.getBookingsByRequesterId(uId);
    }

    @GetMapping("/api/booking-d/{uId}")
    @ResponseBody
    public List<Booking> getBookingBydId(@PathVariable Integer uId){
        return bookingService.getBookingsByDriverId(uId);
    }

    @GetMapping("/api/booking-ride/{rideId}")
    @ResponseBody
    public List<Booking> getBookingsByRideId(@PathVariable Integer rideId) {
        return bookingService.getBookingsByRideId(rideId);
    }

    @PostMapping("/api/booking")
    public void saveBooking(@RequestBody Booking booking){
        bookingService.saveBooking(booking);
    }

    @PatchMapping("/api/booking-u/{bId}")
    public ResponseEntity<String> updateBooking(@RequestBody Booking booking, @PathVariable Integer bId) {
        try {
            bookingService.updateBooking(booking, bId);
            return ResponseEntity.ok("Booking updated successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found with id: " + bId);
        }
    }

    @GetMapping("/api/booking/drvStatus")
    @ResponseBody
    public List<Booking> getBookingsByDrvStatuses(
            @RequestParam Integer driverId,
            @RequestParam String status){
        return bookingService.getBookingByDriverIdandStatus(driverId, status);
    }

    @GetMapping("/api/booking/rdrStatus")
    @ResponseBody
    public List<Booking> getBookingsByRdrStatuses(
            @RequestParam Integer riderId,
            @RequestParam String status){
        return bookingService.getBookingByRiderIdandStatus(riderId, status);
    }

    @GetMapping("/api/booking/rdrRide")
    @ResponseBody
    public List<Booking> getBookingsByRideAndRdrId(
            @RequestParam Integer rideId,
            @RequestParam Integer riderId){
        return bookingService.getBookingByRideIdandRiderId(rideId, riderId);
    }
    @DeleteMapping("/api/cancel/{bId}")
    public void cancelBooking(@PathVariable Integer bId){
        bookingService.cancelBooking(bId);
    }

}
