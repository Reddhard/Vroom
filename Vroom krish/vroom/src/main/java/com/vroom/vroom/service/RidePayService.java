package com.vroom.vroom.service;

import com.vroom.vroom.entity.RidePay;
import com.vroom.vroom.repository.RidePayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RidePayService {

    @Autowired
    private RidePayRepository ridePayRepository;

    // Save a new ride
    public void saveRide(RidePay ridePay) {
        if (ridePay.getRider() == null) {
            ridePay.setRider(null);
        }
        ridePayRepository.save(ridePay);
    }

    public List<RidePay> getAllRides(){
        return ridePayRepository.findAll();
    }
    // Get rides by driver ID
    public List<RidePay> getRidesByDriverId(Integer driverId) {
        return ridePayRepository.findByDriverId(driverId);
    }

    // Get rides by rider ID
    public List<RidePay> getRidesByRiderId(Integer riderId) {
        return ridePayRepository.findByRiderId(riderId);
    }
    public List<RidePay> getRidesByDriverIdAndStatus(Integer driverId, String status) {
        try {
            // Convert status string to enum
            RidePay.RideStatus rideStatus = RidePay.RideStatus.valueOf(status);
            return ridePayRepository.findByDriverIdAndStatus(driverId, rideStatus);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status value: " + status);
        }
    }
    public List<RidePay> getRidesByStatus(String status) {
        try {
            // Convert status string to enum
            RidePay.RideStatus rideStatus = RidePay.RideStatus.valueOf(status);
            return ridePayRepository.findByStatus(rideStatus);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status value: " + status);
        }
    }

    public void updateRidePay(RidePay ridePay, Integer rideId) {
        // Fetch existing RidePay using the rideId, or throw an exception if not found
        RidePay existingRidePay = ridePayRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("RidePay not found with id: " + rideId));

        // Update fields only if they are not null
        if (ridePay.getDriver() != null) {
            existingRidePay.setDriver(ridePay.getDriver());
        }

        if (ridePay.getRider() != null) {
            existingRidePay.setRider(ridePay.getRider());
        }

        if (ridePay.getVehicle() != null) {
            existingRidePay.setVehicle(ridePay.getVehicle());
        }

        if (ridePay.getLocFrom() != null) {
            existingRidePay.setLocFrom(ridePay.getLocFrom());
        }

        if (ridePay.getLocTo() != null) {
            existingRidePay.setLocTo(ridePay.getLocTo());
        }

        if (ridePay.getRideTime() != null) {
            existingRidePay.setRideTime(ridePay.getRideTime());
        }

        if (ridePay.getFare() != 0) {
            existingRidePay.setFare(ridePay.getFare());
        }

        if (ridePay.getStatus() != null) {
            existingRidePay.setStatus(ridePay.getStatus());
        }

        if (ridePay.getTransactionId() != null) {
            existingRidePay.setTransactionId(ridePay.getTransactionId());
        }

        if (ridePay.getAmount() != 0) {
            existingRidePay.setAmount(ridePay.getAmount());
        }

        if (ridePay.getMethod() != null) {
            existingRidePay.setMethod(ridePay.getMethod());
        }

        if (ridePay.getPaid() != null) {
            existingRidePay.setPaid(ridePay.getPaid());
        }

        // Save the updated RidePay entity back to the database
        ridePayRepository.save(existingRidePay);
    }

}

