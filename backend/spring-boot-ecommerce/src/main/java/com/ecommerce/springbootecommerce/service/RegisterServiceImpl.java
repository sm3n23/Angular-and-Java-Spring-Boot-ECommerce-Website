package com.ecommerce.springbootecommerce.service;

import com.ecommerce.springbootecommerce.Entity.User;
import com.ecommerce.springbootecommerce.dao.UserRepository;
import com.ecommerce.springbootecommerce.dto.RegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class RegisterServiceImpl implements RegisterService {


    @Autowired
    private UserRepository userRepository;


    @Override
    public User createUser(RegisterDTO registerDTO) {

        if (Boolean.TRUE.equals(userRepository
                .existsByUsername(registerDTO.getUsername()))) {
            throw new ShopAPIException(HttpStatus.BAD_REQUEST,
                    "Username already exists!.");
        }

        if (Boolean.TRUE.equals(userRepository
                .existsByEmail(registerDTO.getEmail()))) {
            throw new ShopAPIException(HttpStatus.BAD_REQUEST,
                    "Email already exists!.");
        }

        User user = new User();
        user.setFirstName(registerDTO.getFirstName());
        user.setLastName(registerDTO.getLastName());
        user.setEmail(registerDTO.getEmail());
        user.setUsername(registerDTO.getUsername());
        user.setPassword(registerDTO.getPassword());
        user.setRole(registerDTO.getRole());

        return userRepository.save(user);
    }
}
