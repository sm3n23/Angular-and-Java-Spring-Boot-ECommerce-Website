package com.ecommerce.springbootecommerce.service;

import com.ecommerce.springbootecommerce.Entity.Product;
import com.ecommerce.springbootecommerce.Entity.User;
import com.ecommerce.springbootecommerce.dao.ProductCategoryRepository;
import com.ecommerce.springbootecommerce.dao.ProductRepository;
import com.ecommerce.springbootecommerce.dao.UserRepository;
import com.ecommerce.springbootecommerce.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.Date;



@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private UserRepository userRepository;

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

        User user = userRepository.getById(productDTO.getUserId());
        if(user != null){
            product.setUser(user);
        }
        return productRepository.save(product);
    }

    public Product updateProduct(Long productId, ProductDTO productDTO){
        Product product = productRepository.findById(productId)
                .orElseThrow(()->new NotFounfException("Product not found"));


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

    @Override
    public void deleteProduct(Long productId) {

        productRepository.deleteById(productId);
    }
}
