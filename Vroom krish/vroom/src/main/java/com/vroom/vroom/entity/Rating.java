package com.vroom.vroom.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer rtId; // Rating ID

    // Giver of the rating (User who gave the rating)
    @ManyToOne
    @JoinColumn(name = "gvr_id", referencedColumnName = "u_id", nullable = true)
    private User giver; // Giver of the rating

    // Receiver of the rating (User who received the rating)
    @ManyToOne
    @JoinColumn(name = "rcv_id", referencedColumnName = "u_id", nullable = false)
    private User receiver; // Receiver of the rating

    // Rating score (e.g., 1-5)
    @Column(nullable = false)
    private Integer score;

    // Optional review message
    private String review;

    // Timestamp of when the rating was given
    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime rated; // Time when the rating was made

    // Getters and Setters
    public Integer getRtId() {
        return rtId;
    }

    public void setRtId(Integer rtId) {
        this.rtId = rtId;
    }

    public User getGiver() {
        return giver;
    }

    public void setGiver(User giver) {
        this.giver = giver;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public LocalDateTime getRated() {
        return rated;
    }

    public void setRated(LocalDateTime rated) {
        this.rated = rated;
    }

    @Override
    public String toString() {
        return "Rating{" +
                "rtId=" + rtId +
                ", giver=" + giver +
                ", receiver=" + receiver +
                ", score=" + score +
                ", review='" + review + '\'' +
                ", rated=" + rated +
                '}';
    }
}
