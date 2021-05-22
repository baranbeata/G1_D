package com.example.security.models;

import org.springframework.lang.NonNull;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @NonNull
    private String hours;

    @OneToMany(mappedBy = "shop")
    private List<User> users=new ArrayList<User>();

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

    public String getHours() {
        return hours;
    }

    public void setHours(String hours) { this.hours = hours; }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) { this.users = users; }

}