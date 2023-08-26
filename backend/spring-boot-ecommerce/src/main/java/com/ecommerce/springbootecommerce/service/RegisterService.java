package com.ecommerce.springbootecommerce.service;

import com.ecommerce.springbootecommerce.Entity.User;
import com.ecommerce.springbootecommerce.dto.RegisterDTO;

public interface RegisterService {
    User createUser(RegisterDTO registerDTO);
}
