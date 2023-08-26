package com.ecommerce.springbootecommerce.service;

import org.springframework.http.HttpStatus;

public class ShopAPIException extends RuntimeException{

    private final HttpStatus status;
    private final String message;

    public ShopAPIException(HttpStatus status, String message) {
        super(message);
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
