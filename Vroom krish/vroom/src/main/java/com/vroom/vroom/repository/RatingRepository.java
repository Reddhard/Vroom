package com.vroom.vroom.repository;

import com.vroom.vroom.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {

    // Find ratings given by a specific user (gvr_id)
    List<Rating> findByGiverId(Integer giverId);

    // Find ratings received by a specific user (rcv_id)
    List<Rating> findByReceiverId(Integer receiverId);
}
