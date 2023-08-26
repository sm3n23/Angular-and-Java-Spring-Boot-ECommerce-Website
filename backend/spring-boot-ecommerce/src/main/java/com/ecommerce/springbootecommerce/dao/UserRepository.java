package com.ecommerce.springbootecommerce.dao;

import com.ecommerce.springbootecommerce.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsernameOrEmail(String usernameOrEmail,String usernameOrEmail1);
    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}
