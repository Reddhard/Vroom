package com.vroom.vroom.service;

import com.vroom.vroom.entity.Vehicle;
import com.vroom.vroom.repository.UserRepository;
import com.vroom.vroom.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {
    @Autowired
    VehicleRepository vehicleRepo;
    @Autowired
    UserRepository userRepository;

    public Vehicle getVehicleById(Integer vId){
        return vehicleRepo.findById(vId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found for id: " + vId));
    }

    public List<Vehicle> getVehicleByUId(Integer uId){
        return vehicleRepo.findByOwnerId(uId);
    }

    public void saveVehicle(Vehicle vehicle){
        vehicleRepo.save(vehicle);
    }

    public List<Vehicle> getVehicle() {
        return vehicleRepo.findAll();
    }


    public void updateVehicle(Vehicle vehicle, Integer vId) {
        Vehicle existingVehicle = vehicleRepo.findById(vId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + vId));

        // Update fields only if they are not null
        if (vehicle.getModel() != null) {
            existingVehicle.setModel(vehicle.getModel());
        }

        if (vehicle.getLicense() != null) {
            existingVehicle.setLicense(vehicle.getLicense());
        }

        if (vehicle.getFitnessExpiry() != null) {
            existingVehicle.setFitnessExpiry(vehicle.getFitnessExpiry());
        }

        // Save the updated vehicle
        vehicleRepo.save(existingVehicle);
    }

    public void deleteVehicle(Integer vId) {
        vehicleRepo.deleteById(vId);
    }
}
