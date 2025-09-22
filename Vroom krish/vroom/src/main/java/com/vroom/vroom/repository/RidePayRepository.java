package com.vroom.vroom.repository;

import com.vroom.vroom.entity.RidePay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RidePayRepository extends JpaRepository<RidePay, Integer> {
    // Find rides by driver ID
    List<RidePay> findByDriverId(Integer driverId);
    // Find rides by rider ID
    List<RidePay> findByRiderId(Integer riderId);

    List<RidePay> findByDriverIdAndStatus(Integer driverId, RidePay.RideStatus status);
    List<RidePay> findByStatus(RidePay.RideStatus rideStatus);
}
