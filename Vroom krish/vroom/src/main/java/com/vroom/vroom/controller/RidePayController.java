package com.vroom.vroom.controller;

import com.vroom.vroom.entity.RidePay;
import com.vroom.vroom.service.RidePayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class RidePayController {

    @Autowired
    private RidePayService ridePayService;

    @GetMapping("/api/ridepays")
    public List<RidePay> getAllRides(){
        return ridePayService.getAllRides();
    }

    // Create a new ride
    @PostMapping("/api/ridepay")
    public ResponseEntity<RidePay> createRide(@RequestBody RidePay ridePay) {
        ridePayService.saveRide(ridePay);
        return ResponseEntity.status(201).body(ridePay);
    }

    // Get all rides by driver ID
    @GetMapping("/api/ridepay/driver/{driverId}")
    public ResponseEntity<List<RidePay>> getRidesByDriver(@PathVariable Integer driverId) {
        List<RidePay> rides = ridePayService.getRidesByDriverId(driverId);
        return ResponseEntity.ok(rides);
    }

    // Get all rides by rider ID
    @GetMapping("/api/ridepay/rider/{riderId}")
    public ResponseEntity<List<RidePay>> getRidesByRider(@PathVariable Integer riderId) {
        List<RidePay> rides = ridePayService.getRidesByRiderId(riderId);
        return ResponseEntity.ok(rides);
    }

    @GetMapping("/api/ridepay/drvStatus")
    @ResponseBody
    public List<RidePay> getRideByStatus(
            @RequestParam Integer driverId,
            @RequestParam String status) {
        return ridePayService.getRidesByDriverIdAndStatus(driverId, status);
    }

    @GetMapping("/api/ridepay/Status")
    @ResponseBody
    public List<RidePay> getRideByStatuses(
            @RequestParam String status) {
        return ridePayService.getRidesByStatus(status);
    }

    @PatchMapping("/api/rideUpdate/{rideId}")
    public ResponseEntity<String> updateRide(@RequestBody RidePay ride, @PathVariable Integer rideId){
        try {
            ridePayService.updateRidePay(ride, rideId);
            return ResponseEntity.ok("Ride updated successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with id: " + rideId);
        }
    }

}