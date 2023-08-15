package com.ecommerce.springbootecommerce.dto;

import lombok.Data;

import java.math.BigDecimal;
@Data
public class ProductDTO {
    private Long categoryId;

    private String sku;

    private String name;
    private String description;
    private BigDecimal unitPrice;
    private String imgUrl;
    private boolean active;
    private int unitsInStock;
}
