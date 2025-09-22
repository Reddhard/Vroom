package com.vroom.vroom.repository;

import com.vroom.vroom.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByPhoneAndPassword(String u_phone, String u_pass);
}
