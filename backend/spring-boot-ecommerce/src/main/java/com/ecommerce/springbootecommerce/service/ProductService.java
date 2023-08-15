package com.ecommerce.springbootecommerce.service;

import com.ecommerce.springbootecommerce.Entity.Product;
import com.ecommerce.springbootecommerce.dto.ProductDTO;

public interface ProductService {

    Product createProduct(ProductDTO productDTO);
}
