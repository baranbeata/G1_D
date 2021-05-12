package com.example.security.models;

import org.springframework.lang.NonNull;
import javax.persistence.*;

@Entity
@Table(	name = "shops")

public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String name;

    @NonNull
    private String address;

    @NonNull
    private String city;


    public Shop() {
    }

    public Shop(String name, String address, String city) {
        this.name = name;
        this.address = address;
        this.city=city;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) { this.city = city; }

}