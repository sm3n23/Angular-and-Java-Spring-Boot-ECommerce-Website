package com.ecommerce.springbootecommerce.service;

import com.ecommerce.springbootecommerce.Entity.Product;
import com.ecommerce.springbootecommerce.dao.ProductCategoryRepository;
import com.ecommerce.springbootecommerce.dao.ProductRepository;
import com.ecommerce.springbootecommerce.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;



@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Override
    public Product createProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setCategory(productCategoryRepository.getById(productDTO.getCategoryId()));
        product.setSku(productDTO.getSku());
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setUnitPrice(productDTO.getUnitPrice());
        product.setImgUrl(productDTO.getImgUrl());
        product.setActive(productDTO.isActive());
        product.setUnitsInStock(productDTO.getUnitsInStock());
        return productRepository.save(product);
    }
}
