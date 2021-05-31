package com.example.security.controllers;

import com.example.security.models.*;
import com.example.security.payload.response.MessageResponse;
import com.example.security.repository.ProductRepository;
import com.example.security.repository.SizeRepository;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    SizeRepository sizeRepository;

    @GetMapping("/products")
    public @NotNull
    ResponseEntity<Iterable<Product>> getProducts(@RequestParam(required = false) Iterable<Product> products) {
        return new ResponseEntity<>(productRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/products/{id}")
    @CrossOrigin(origins="http://localhost:8081")
    public @NotNull ResponseEntity<Optional<Product>> getSingleProduct(@PathVariable long id) {

        return new ResponseEntity<>(productRepository.findById(id), HttpStatus.OK);

    }

    @DeleteMapping("/products/{id}")
    @CrossOrigin
    public @NotNull
    ResponseEntity<Long> deleteProduct(@PathVariable long id) {
        Optional<Product> product = productRepository.findById(id);
        if(product.isEmpty())
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PostMapping("/products/{id}")
    @CrossOrigin(origins="http://localhost:8081")
    public @NotNull ResponseEntity<?> changeValue(@PathVariable long id,
                                                  @RequestParam(required = false) String value,
                                                  @RequestParam(required = false) String column) {
        Product currentproduct = this.productRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Error: Product with given id not found."));

       switch(column)
        {
            case "description":
                currentproduct.setDescription(value);
                break;
            case "name":
                currentproduct.setName(value);
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
        productRepository.save(currentproduct);

        return ResponseEntity.ok(new MessageResponse("Value was changed successfully!"));

    }

}
