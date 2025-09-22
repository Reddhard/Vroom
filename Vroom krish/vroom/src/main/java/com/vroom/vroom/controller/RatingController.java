package com.vroom.vroom.controller;

import com.vroom.vroom.entity.Rating;
import com.vroom.vroom.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    // Get all ratings given by a specific user
    @GetMapping("/giver/{giverId}")
    public ResponseEntity<List<Rating>> getRatingsGivenByUser(@PathVariable Integer giverId) {
        List<Rating> ratings = ratingService.getRatingsGivenByUser(giverId);
        return ResponseEntity.ok(ratings);  // Return the ratings
    }

    // Get all ratings received by a specific user
    @GetMapping("/receiver/{receiverId}")
    public ResponseEntity<List<Rating>> getRatingsReceivedByUser(@PathVariable Integer receiverId) {
        List<Rating> ratings = ratingService.getRatingsReceivedByUser(receiverId);
        return ResponseEntity.ok(ratings);  // Return the ratings
    }

    // Save a new rating
    @PostMapping("/")
    public ResponseEntity<Rating> saveRating(@RequestBody Rating rating) {
        ratingService.saveRating(rating);
        return ResponseEntity.status(201).body(rating);  // Return the saved rating
    }
}
