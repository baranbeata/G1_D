package com.example.security.payload.request;

import org.springframework.lang.NonNull;

import java.util.Set;

public class AddProductRequest {
    @NonNull
    private String name;

    @NonNull
    private Float price;

    private Set<String> size;

    private Set<String> category;

    private Set<String> type;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<String> getSize() {
        return size;
    }

    public void setSize(Set<String> size) {
        this.size = size;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Set<String> getCategory() { return this.category; }

    public void setCategory(Set<String> category) { this.category = category;}

    public Set<String> getType() { return this.type; }

    public void setType(Set<String> type) { this.type = type;}
}
