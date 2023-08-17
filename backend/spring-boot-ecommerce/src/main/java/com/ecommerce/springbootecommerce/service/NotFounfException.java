package com.ecommerce.springbootecommerce.service;

public class NotFounfException extends RuntimeException  {
    public NotFounfException(String productNotFound) {
        super(productNotFound);
    }
}
