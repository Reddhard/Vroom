package com.vroom.vroom.controller;

import com.vroom.vroom.entity.User;
import com.vroom.vroom.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    UserService user_service;

    @GetMapping("/api/users")
    @ResponseBody
    public List<User> getAllUsers(){
        return user_service.getAllUsers();
    }

    @GetMapping("/api/login")
    @ResponseBody
    public User getUserByPhone(@RequestParam String phone, @RequestParam String password) {
        return user_service.getUserByPhoneAndPassword(phone, password);
    }

    @GetMapping("/api/users/{userId}")
    @ResponseBody
    public User getUser(@PathVariable Integer userId){
        return user_service.getUser(userId);
    }

    @PostMapping("/api/signup")
    public void saveUser(@RequestBody User user){
        user_service.saveUser(user);
    }

    @PatchMapping("/api/users/{userId}")
    public ResponseEntity<String> updateUser(@RequestBody User user, @PathVariable Integer userId) {
        try {
            user_service.updateUser(user, userId);
            return ResponseEntity.ok("User updated successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with id: " + userId);
        }
    }


    @DeleteMapping("/api/users/{userId}")
    public void deleteUser(@PathVariable Integer userId){
        user_service.deleteUser(userId);
    }
}
