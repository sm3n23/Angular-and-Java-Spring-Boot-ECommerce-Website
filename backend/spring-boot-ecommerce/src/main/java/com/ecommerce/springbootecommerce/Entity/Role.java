package com.ecommerce.springbootecommerce.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "roles")
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    public Role() {
    }

    public static Role getCustomerRole(){
        return new Role(1l,Roles.ROLE_CUSTOMER.getRoleString());
    }

    public Role(Long id,String name){
        this.id=id;
        this.name=name;
    }


}
