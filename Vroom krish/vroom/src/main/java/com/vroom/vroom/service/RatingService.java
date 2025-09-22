package com.vroom.vroom.service;

import com.vroom.vroom.entity.Rating;
import com.vroom.vroom.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    // Get ratings given by a specific user (gvr_id)
    public List<Rating> getRatingsGivenByUser(Integer giverId) {
        return ratingRepository.findByGiverId(giverId);
    }

    // Get ratings received by a specific user (rcv_id)
    public List<Rating> getRatingsReceivedByUser(Integer receiverId) {
        return ratingRepository.findByReceiverId(receiverId);
    }

    // Save a new rating
    public void saveRating(Rating rating) {
        ratingRepository.save(rating);
    }
}
