package com.ecommerce.springbootecommerce.dto;

import lombok.Data;

@Data
public class RegisterDTO {

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private String role;
}
