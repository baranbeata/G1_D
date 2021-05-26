package com.example.security.models;

import javax.persistence.*;

@Entity
@Table(name = "sizes")
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ESize name;

    public Size() {

    }

    public Size(ESize name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ESize getName() {
        return name;
    }

    public void setName(ESize name) {
        this.name = name;
    }
}