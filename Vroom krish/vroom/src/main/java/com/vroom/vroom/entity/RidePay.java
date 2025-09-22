package com.vroom.vroom.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "ride_pay")
public class RidePay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "r_id")
    private int rideId;

    @ManyToOne
    @JoinColumn(name = "drv_id")
    private User driver;

    @ManyToOne
    @JoinColumn(name = "rdr_id")
    private User rider;

    @ManyToOne
    @JoinColumn(name = "vh_id")
    private Vehicle vehicle;

    @Column(name = "loc_from", nullable = false)
    private String locFrom;

    @Column(name = "loc_to", nullable = false)
    private String locTo;

    @Column(name = "ride_time", nullable = false)
    private LocalDateTime rideTime;

    @Column(name = "post_time", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime postTime;

    @Column(name = "fare")
    private int fare;

    @Enumerated(EnumType.STRING)
    @Column(name = "stat", nullable = false)
    private RideStatus status = RideStatus.PENDING;

    @Column(name = "trnx_id")
    private String transactionId;

    @Column(name = "amount")
    private int amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "method", nullable = false)
    private PaymentMethod method = PaymentMethod.CASH;

    @Column(name = "paid")
    private LocalDateTime paid;

    // Getters and setters

    public enum RideStatus {
        PENDING,
        ON_GOING,
        COMPLETE,
        CANCELLED,
        REFUNDED,
        OTHERS
    }

    public enum PaymentMethod {
        CASH,
        MOBILE_BANKING,
        OTHER,
        NONE
    }

    public int getRideId() {
        return rideId;
    }

    public void setRideId(int rideId) {
        this.rideId = rideId;
    }

    public User getDriver() {
        return driver;
    }

    public void setDriver(User driver) {
        this.driver = driver;
    }

    public User getRider() {
        return rider;
    }

    public void setRider(User rider) {
        this.rider = rider;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
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

    public LocalDateTime getRideTime() {
        return rideTime;
    }

    public void setRideTime(LocalDateTime rideTime) {
        this.rideTime = rideTime;
    }

    public LocalDateTime getPostTime() {
        return postTime;
    }

    public void setPostTime(LocalDateTime postTime) {
        this.postTime = postTime;
    }

    public int getFare() {
        return fare;
    }

    public void setFare(int fare) {
        this.fare = fare;
    }

    public RideStatus getStatus() {
        return status;
    }

    public void setStatus(RideStatus status) {
        this.status = status;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public PaymentMethod getMethod() {
        return method;
    }

    public void setMethod(PaymentMethod method) {
        this.method = method;
    }

    public LocalDateTime getPaid() {
        return paid;
    }

    public void setPaid(LocalDateTime paid) {
        this.paid = paid;
    }

    @Override
    public String toString() {
        return "RidePay{" +
                "rideId=" + rideId +
                ", driver=" + driver +
                ", rider=" + rider +
                ", vehicle=" + vehicle +
                ", locFrom='" + locFrom + '\'' +
                ", locTo='" + locTo + '\'' +
                ", rideTime=" + rideTime +
                ", postTime=" + postTime +
                ", fare=" + fare +
                ", status=" + status +
                ", transactionId='" + transactionId + '\'' +
                ", amount=" + amount +
                ", method=" + method +
                ", paid=" + paid +
                '}';
    }
}
