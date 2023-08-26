package com.ecommerce.springbootecommerce.controller;

import com.ecommerce.springbootecommerce.Entity.User;
import com.ecommerce.springbootecommerce.dto.LoginDTO;
import com.ecommerce.springbootecommerce.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/login")
public class LoginController {

    private LoginService loginService;



    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping
    public ResponseEntity<?> validateUser(@RequestBody LoginDTO loginDTO){
        User authUser = loginService.validateUser(loginDTO);

        if(authUser!=null){
            return ResponseEntity.ok(authUser);
        }
        else {
            return ResponseEntity.status(401).body("invalid cred");
        }
    }
}
