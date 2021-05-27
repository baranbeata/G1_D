package com.example.security.security.services;

import com.example.security.models.Shop;
import com.example.security.repository.ShopRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class ShopServiceImpl implements ShopService {

    // productRepository constructor injection

    private ShopRepository shopRepository;
    @Override
    public Iterable<Shop> getAllShops() {
        return shopRepository.findAll();
    }

    @Override
    public Optional<Shop> getShop(long id) {
        return shopRepository.findById(id);

    }

    @Override
    public Shop save(Shop shop) {
        return shopRepository.save(shop);
    }
}
