package com.ecommerce.springbootecommerce.dao;

import com.ecommerce.springbootecommerce.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Long> {

    Optional findByName(String name);
}
