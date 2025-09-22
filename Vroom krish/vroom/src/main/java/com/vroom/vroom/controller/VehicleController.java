package com.vroom.vroom.controller;

import com.vroom.vroom.entity.Vehicle;
import com.vroom.vroom.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class VehicleController {
    @Autowired
    VehicleService vehicleService;

    @GetMapping("/api/vehicles")
    @ResponseBody
    public List<Vehicle> getVehicle(){
        return vehicleService.getVehicle();
    }

    @GetMapping("/api/vehicle/{vId}")
    @ResponseBody
    public Vehicle getVehicleById(@PathVariable Integer vId){
        return vehicleService.getVehicleById(vId);
    }

    @GetMapping("/api/vehicles/{uId}")
    @ResponseBody
    public List<Vehicle> getVehicleByUId(@PathVariable Integer uId){
        return vehicleService.getVehicleByUId(uId);
    }

    @PostMapping("/api/vehicle")
    public void saveVehicle(@RequestBody Vehicle vehicle){
        vehicleService.saveVehicle(vehicle);
    }

    @PatchMapping("/api/vUpdate/{vId}")
    public ResponseEntity<String> updateVehicle(@RequestBody Vehicle vehicle, @PathVariable Integer vId) {
        try {
            vehicleService.updateVehicle(vehicle, vId);
            return ResponseEntity.ok("Vehicle updated successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vehicle not found with id: " + vId);
        }
    }
    @DeleteMapping("/api/vDelete/{vId}")
    public void deleteVehicle(@PathVariable Integer vId){
        vehicleService.deleteVehicle(vId);
    }
}
