package com.ecommerce.springbootecommerce.dao;

import com.ecommerce.springbootecommerce.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
