package com.vroom.vroom.service;

import com.vroom.vroom.entity.User;
import com.vroom.vroom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository user_repo;

    public List<User> getAllUsers(){
        return user_repo.findAll();
    }
    
    public User getUser(Integer userId){
        return user_repo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: "+ userId));
    }

    public void saveUser(User user){
        user_repo.save(user);
    }

    public void updateUser(User user, Integer userId) {
        User existingUser = user_repo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Update only the fields that are not null
        if (user.getName() != null) {
            existingUser.setName(user.getName());
        }

        if (user.getEmail() != null) {
            existingUser.setEmail(user.getEmail());
        }

        if (user.getPhone() != null) {
            existingUser.setPhone(user.getPhone());
        }

        if (user.getPassword() != null) {
            existingUser.setPassword(user.getPassword());
        }

        if (user.getNid() != null) {
            existingUser.setNid(user.getNid());
        }

        if (user.getRole() != null) {
            existingUser.setRole(user.getRole());
        }

        // Save the updated user to the database
        user_repo.save(existingUser);
    }



    public void deleteUser(Integer userId){
        user_repo.deleteById(userId);
    }

    public User getUserByPhoneAndPassword(String phone, String password) {
        User user = user_repo.findByPhoneAndPassword(phone, password);
        if (user == null) {
            System.out.println("No user found with phone=" + phone + " and password=" + password);
        } else {
            System.out.println("User found: " + user.getId());
        }
        return user;
    }
}
