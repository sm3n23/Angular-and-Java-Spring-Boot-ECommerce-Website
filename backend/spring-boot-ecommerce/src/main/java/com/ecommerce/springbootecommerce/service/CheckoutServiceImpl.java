package com.ecommerce.springbootecommerce.service;

import com.ecommerce.springbootecommerce.Entity.Customer;
import com.ecommerce.springbootecommerce.Entity.Order;
import com.ecommerce.springbootecommerce.Entity.OrderItem;
import com.ecommerce.springbootecommerce.Entity.Product;
import com.ecommerce.springbootecommerce.dao.CustomerRepository;
import com.ecommerce.springbootecommerce.dao.ProductRepository;
import com.ecommerce.springbootecommerce.dto.Purchase;
import com.ecommerce.springbootecommerce.dto.PurchaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;
    private ProductRepository productRepository;



    @Autowired

    public CheckoutServiceImpl(CustomerRepository customerRepository, ProductRepository productRepository)
    {
        this.customerRepository=customerRepository;
        this.productRepository=productRepository;


    }
    @Override
    public PurchaseResponse placeOrder(Purchase purchase) {




        //get order info from dto
        Order order = purchase.getOrder();


        //generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        //populate order with order items
        Set<OrderItem> orderItems = purchase.getOrderItems();


        for(OrderItem orderItem:orderItems) {
            Long productId= (long) orderItem.getProductId();
            Product product = productRepository.getById(productId);
            int purchasedQuantity = orderItem.getQuantity();
            int updateStock = product.getUnitsInStock() - purchasedQuantity;

            System.out.println("number of stock :" + product.getUnitsInStock());


            if (updateStock >= 0) {
                product.setUnitsInStock(updateStock);
                productRepository.save(product);
            }

        }
        orderItems.forEach(item->order.add(item));





        //populate order with address
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        //populate customer with order

        Customer customer = purchase.getCustomer();

        String theEmail = customer.getEmail();

        Customer customerFromDB = customerRepository.findByEmail(theEmail);

        if(customerFromDB!=null){
            customer=customerFromDB;
        }

        customer.add(order);

        //save to database
        customerRepository.save(customer);

        //return a response

        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {

        return UUID.randomUUID().toString();

    }
}
