package com.example.security.models;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import java.sql.Date;
import javax.persistence.*;

@Entity
@Table(	name = "deliveries")

public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String destination;//do ktorego sklepu

    @Nullable
    private Boolean paid_up;//czy oplacone

    @Nullable
    private Date dateOfPlace;//data zlozenia zamowienia

    @Nullable
    private Boolean is_executed;//czy zrealizowane

    @Nullable
    private Integer amount;//ile kosztuje

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User supplier;

    public Delivery() {
    }

    public Delivery(String destination, Boolean paid_up, Date dateOfPlace, Integer amount, User supplier ) {
        this.destination = destination;
        this.paid_up = paid_up;
        this.dateOfPlace = dateOfPlace;
        this.amount=amount;
        this.supplier=supplier;
        this.is_executed=Boolean.FALSE;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Boolean isPaid_up() {
        return paid_up;
    }

    public void setPaid_up(Boolean paid) {
        this.paid_up = paid;
    }

    public Boolean isExecuted() {
        return is_executed;
    }

    public void setExecuted(Boolean executed) {
        this.is_executed=executed;
    }

    public Date getDateOfPlace() {
        return dateOfPlace;
    }

    public void setdateOfPlace(Date date) {
        this.dateOfPlace=date;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public User getSupplier() {
        return supplier;
    }

    public void setSupplier(User supplier) {
        this.supplier=supplier;
    }

}