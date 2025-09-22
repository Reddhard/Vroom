package com.vroom.vroom.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "u_id")
    private Integer id;

    @Column(name = "u_name", nullable = false, length = 60)
    private String name;

    @Column(name = "u_mail", unique = true, length = 40)
    private String email;

    @Column(name = "u_phone", nullable = false, unique = true, length = 20)
    private String phone;

    @Column(name = "u_pass", nullable = false, unique = true, length = 16)
    private String password;

    @Column(name = "u_nid", nullable = false, unique = true, length = 32)
    private String nid;

    @Enumerated(EnumType.STRING)
    @Column(name = "u_role", nullable = false)
    private Role role;

    @CreationTimestamp
    @Column(name = "u_created", updatable = false)
    private LocalDateTime createdAt;

    // Enum for role
    public enum Role {
        PASSENGER,
        RIDER
    }
    // Getters and setters for other fields

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNid() {
        return nid;
    }

    public void setNid(String nid) {
        this.nid = nid;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", password='" + password + '\'' +
                ", nid='" + nid + '\'' +
                ", role=" + role +
                ", createdAt=" + createdAt +
                '}';
    }
}