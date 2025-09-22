package com.vroom.vroom.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private int bookingId;

    @ManyToOne
    @JoinColumn(name = "r_id")
    private RidePay ridePay;

    @ManyToOne
    @JoinColumn(name = "req_id")
    private User requester;

    @ManyToOne
    @JoinColumn(name = "drv_id")
    private User driver;

    @Column(name = "loc_from")
    private String locFrom;

    @Column(name = "loc_to")
    private String locTo;

    @Column(name = "fare")
    private int fare;

    @Enumerated(EnumType.STRING)
    @Column(name = "stat", nullable = false)
    private BookingStatus status = BookingStatus.PENDING;

    @Column(name = "booked", updatable = false)
    @CreationTimestamp
    private LocalDateTime booked;

    @Column(name = "message")
    private String message;

    @Column(name = "sent", updatable = false)
    @CreationTimestamp
    private LocalDateTime sent;

    // Getters and setters

    public enum BookingStatus {
        PENDING,
        ACCEPTED,
        CANCELLED
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public RidePay getRidePay() {
        return ridePay;
    }

    public void setRidePay(RidePay ridePay) {
        this.ridePay = ridePay;
    }

    public User getRequester() {
        return requester;
    }

    public void setRequester(User requester) {
        this.requester = requester;
    }

    public User getDriver() {
        return driver;
    }

    public void setDriver(User driver) {
        this.driver = driver;
    }

    public String getLocFrom() {
        return locFrom;
    }

    public void setLocFrom(String locFrom) {
        this.locFrom = locFrom;
    }

    public String getLocTo() {
        return locTo;
    }

    public void setLocTo(String locTo) {
        this.locTo = locTo;
    }

    public int getFare() {
        return fare;
    }

    public void setFare(int fare) {
        this.fare = fare;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public LocalDateTime getBooked() {
        return booked;
    }

    public void setBooked(LocalDateTime booked) {
        this.booked = booked;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getSent() {
        return sent;
    }

    public void setSent(LocalDateTime sent) {
        this.sent = sent;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "bookingId=" + bookingId +
                ", ridePay=" + ridePay +
                ", requester=" + requester +
                ", driver=" + driver +
                ", locFrom='" + locFrom + '\'' +
                ", locTo='" + locTo + '\'' +
                ", fare=" + fare +
                ", status=" + status +
                ", booked=" + booked +
                ", message='" + message + '\'' +
                ", sent=" + sent +
                '}';
    }
}
