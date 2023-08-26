package com.ecommerce.springbootecommerce.controller;

import com.ecommerce.springbootecommerce.dto.RegisterDTO;
import com.ecommerce.springbootecommerce.service.RegisterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.ecommerce.springbootecommerce.Entity.User;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/register")
public class RegisterController {

    private RegisterService registerService;

    public RegisterController(RegisterService registerService){
        this.registerService =registerService;
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody RegisterDTO registerDTO){
        try {
            // Map the DTO to an entity
            User newUser = registerService.createUser(registerDTO);

            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("User creation failed.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
