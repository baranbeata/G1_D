package com.example.security.security.services;

import com.example.security.models.Shop;
import com.example.security.repository.ShopRepository;

import java.util.Optional;

public interface ShopService {

    public Iterable<Shop> getAllShops();

    public Optional<Shop> getShop(long id);

    public Shop save(Shop shop);
}
