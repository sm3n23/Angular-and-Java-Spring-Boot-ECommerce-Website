package com.ecommerce.springbootecommerce.service;

import com.ecommerce.springbootecommerce.Entity.User;
import com.ecommerce.springbootecommerce.dao.UserRepository;
import com.ecommerce.springbootecommerce.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class LoginServiceImpl implements LoginService{


    private UserRepository userRepository;

    public LoginServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    @Override
    public User validateUser(LoginDTO loginDTO) {

        String username = loginDTO.getUsername();
        String password = loginDTO.getPassword();


        Optional<User> userOptional = userRepository.findByUsernameOrEmail(username,username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();


            if (password.equals(user.getPassword())) {


                return user;
            }
        }

        return null;
    }
}
