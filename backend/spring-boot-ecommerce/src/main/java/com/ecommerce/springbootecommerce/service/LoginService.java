package com.ecommerce.springbootecommerce.service;

import com.ecommerce.springbootecommerce.Entity.User;
import com.ecommerce.springbootecommerce.dto.LoginDTO;
import org.springframework.stereotype.Service;

@Service
public interface LoginService {

    User validateUser(LoginDTO loginDTO);

}
