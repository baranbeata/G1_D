package com.example.security.models;
import com.example.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;


import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(	name = "info")

public class InfoEdit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NonNull
    private String name;

    @NonNull
    private String surname;

    @NonNull
    private String pesel;

    @NonNull
    private String tel;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;

    public InfoEdit() {

    }

    public InfoEdit(String name, String surname, String pesel, String tel) {
        this.name = name;
        this.surname = surname;
        this.pesel = pesel;
        this.tel = tel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {return name;}

    public void setName(String name) {this.name = name;}

    public String getSurname() {return surname;}

    public void setSurname(String surname) {this.surname = surname;}

    public String getPesel() {return pesel;}

    public void setPesel(String pesel) {this.pesel = pesel;}

    public String getTel() {return pesel;}

    public void setTel(String tel) {this.tel = tel;}

}
