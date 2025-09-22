package com.vroom.vroom.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "v_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "ownr_id", referencedColumnName = "u_id", nullable = false)
    private User owner; // Vehicle owner's user reference

    @Column(name = "model", length = 50)
    private String model;

    @Column(name = "license", nullable = false, length = 15)
    private String license;

    @Column(name = "fitness_exp")
    private LocalDate fitnessExpiry; // Vehicle fitness expiry date

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getLicense() {
        return license;
    }

    public void setLicense(String license) {
        this.license = license;
    }

    public LocalDate getFitnessExpiry() {
        return fitnessExpiry;
    }

    public void setFitnessExpiry(LocalDate fitnessExpiry) {
        this.fitnessExpiry = fitnessExpiry;
    }

    @Override
    public String toString() {
        return "Vehicle{" +
                "id=" + id +
                ", owner=" + owner +
                ", model='" + model + '\'' +
                ", license='" + license + '\'' +
                ", fitnessExpiry=" + fitnessExpiry +
                '}';
    }
}

