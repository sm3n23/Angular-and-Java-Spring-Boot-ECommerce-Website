package com.ecommerce.springbootecommerce.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Entity
@Table(name = "order_item")
@Getter
@Setter
public class OrderItem {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "product_id")
    private int productId;


    

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    /*@ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    // Add this method to get the associated product
    public Product getProduct() {
        return product;
    }*/





}
