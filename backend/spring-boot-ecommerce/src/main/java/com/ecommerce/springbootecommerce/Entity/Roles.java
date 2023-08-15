package com.ecommerce.springbootecommerce.Entity;

public enum Roles {
    ROLE_CUSTOMER("ROLE_CUSTOMER"),
    ROLE_SELLER("ROLE_SELLER"),
    ROLE_ADMIN("ROLE_ADMIN");

    private final String role;

    Roles(String role){
        this.role=role;
    }

    public String getRoleString(){
        return role;
    }

}
