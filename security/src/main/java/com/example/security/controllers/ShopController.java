package com.example.security.controllers;

import com.example.security.models.Product;
import com.example.security.models.Shop;
import com.example.security.payload.response.MessageResponse;
import com.example.security.repository.ShopRepository;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class ShopController {

    @Autowired
    ShopRepository shopRepository;

    @GetMapping("/shops")
    public @NotNull
    ResponseEntity<Iterable<Shop>> getShops(@RequestParam(required = false) Iterable<Shop> shops) {
        return new ResponseEntity<>(shopRepository.findAll(), HttpStatus.OK);
    }

    @DeleteMapping("/shops/{id}")
    @CrossOrigin
    public @NotNull
    ResponseEntity<Long> deleteProduct(@PathVariable long id) {
        Optional<Shop> shop = shopRepository.findById(id);
        if(shop.isEmpty())
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        shopRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PostMapping("/shops/{id}")
    @CrossOrigin(origins="http://localhost:8081")
    public @NotNull ResponseEntity<?> changeValue(@PathVariable long id,
                                                  @RequestParam(required = false) String value,
                                                  @RequestParam(required = false) String column) {
        Shop currentshop = this.shopRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Error: Shop with given id not found."));

        switch(column)
        {
            case "name":
                currentshop.setName(value);
                break;
            case "city":
                currentshop.setCity(value);
                break;
            case "address":
               currentshop.setAddress(value);
                break;
            case "hours":
                currentshop.setHours(value);
                break;

        }
      /*  if(column.equals("description"))
            currentproduct.setDescription(value);
        else if(column.equals("name")) {
           /* switch(value){
                case "XS":
                case "xs":
                 //   Size size = sizeRepository.findByName(ESize.SIZE_XS)
                           // .orElseThrow(() -> new RuntimeException("Error: Size is not found."));
                    ESize esize=ESize.SIZE_XS;
                    Size size= new Size(esize);
                    sizeRepository.save(size);
                    currentproduct.addSize(size);
            }
        }*/
        shopRepository.save(currentshop);

        return ResponseEntity.ok(new MessageResponse("Value was changed successfully!"));

    }



}


