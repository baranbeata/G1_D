package com.example.security.payload.request;

import org.springframework.lang.NonNull;

public class InfoEditRequest {

    @NonNull
    private String name;

    @NonNull
    private String surname;

    @NonNull
    private String pesel;

    @NonNull
    private String tel;

    @NonNull
    private String username_fk;
    @NonNull
    private String username;

    public String getUsername_fk() {
        return username_fk;
    }

    public void setUsername_fk(String username_fk) {
        this.username_fk = username_fk;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username_fk) {
        this.username= username;
    }

    public String getName() {return name;}

    public void setName(String name) {this.name = name;}

    public String getSurname() {return surname;}

    public void setSurname(String surname) {this.surname = surname;}

    public String getPesel() {return pesel;}

    public void setPesel(String pesel) {this.pesel = pesel;}

    public String getTel() {return tel;}

    public void setTel(String tel) {this.tel = tel;}

}
