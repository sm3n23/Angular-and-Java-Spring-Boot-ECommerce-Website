package com.ecommerce.springbootecommerce.dto;

import com.ecommerce.springbootecommerce.Entity.*;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;

    private Set<OrderItem> orderItems;

}
