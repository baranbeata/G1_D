package com.example.security.controllers;

import com.example.security.models.Delivery;
import com.example.security.models.Product;
import com.example.security.payload.response.MessageResponse;
import com.example.security.repository.CategoryRepository;
import com.example.security.repository.DeliveryRepository;
import com.example.security.repository.UserRepository;
import com.example.security.repository.TypeRepository;
import com.example.security.security.jwt.JwtUtils;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
public class DeliveryController {

    @Autowired
    DeliveryRepository deliveryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/deliveries")
    public @NotNull
    ResponseEntity<Iterable<Delivery>> getDeliveries(@RequestParam(required = false) Iterable<Delivery> deliveries) {
        return new ResponseEntity<>(deliveryRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/deliveries/{id}")
    @CrossOrigin(origins="http://localhost:8081")
    public @NotNull ResponseEntity<Optional<Delivery>> getSingleDelivery(@PathVariable long id) {

        return new ResponseEntity<>(deliveryRepository.findById(id), HttpStatus.OK);
    }

    @PostMapping("/deliveries/{id}")
    @CrossOrigin(origins="http://localhost:8081")
    public @NotNull ResponseEntity<?> changeValue(@PathVariable long id,
                                                  @RequestParam(required = false) String value,
                                                  @RequestParam(required = false) String column) {
        Delivery currentdelivery = this.deliveryRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Error: Delivery with given id not found."));
        switch(column)
        {
            case "executed":
                try {
                    Boolean val=Boolean.parseBoolean(value);
                    currentdelivery.setExecuted(val);
                }catch(NumberFormatException | NullPointerException ex){
                    System.out.println("An exception has occured.\n Plz enter a valid integer");
                }
                break;
            case "paid_up":
                try {
                    Boolean val=Boolean.parseBoolean(value);
                    currentdelivery.setPaid_up(val);
                }catch(NumberFormatException | NullPointerException ex){
                    System.out.println("An exception has occured.\n Plz enter a valid integer");
                }
                break;

        }

        deliveryRepository.save(currentdelivery);
        return ResponseEntity.ok(new MessageResponse("Value was changed successfully!"));
    }

    @DeleteMapping("/deliveries/{id}")
    @CrossOrigin
    public @NotNull
    ResponseEntity<Long> deleteDelivery(@PathVariable long id) {
        Optional<Delivery> delivery = deliveryRepository.findById(id);
        if(delivery.isEmpty())
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        deliveryRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
