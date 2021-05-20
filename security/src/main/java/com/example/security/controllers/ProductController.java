package com.example.security.controllers;

import com.example.security.models.Product;
import com.example.security.models.Category;
import com.example.security.models.ECategory;
import com.example.security.models.Type;
import com.example.security.models.EType;
import com.example.security.payload.request.AddProductRequest;
import com.example.security.payload.response.MessageResponse;
import com.example.security.repository.ProductRepository;
import com.example.security.repository.CategoryRepository;
import com.example.security.repository.TypeRepository;
import com.example.security.security.jwt.JwtUtils;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;


@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    TypeRepository typeRepository;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/products")
    public @NotNull
    ResponseEntity<Iterable<Product>> getProducts(@RequestParam(required = false) Iterable<Product> products) {
        return new ResponseEntity<>(productRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/products/{id}")
    public @NotNull
    ResponseEntity<Optional<Product>> getSingleProduct(@PathVariable long id) {
            return new ResponseEntity<>(productRepository.findById(id), HttpStatus.OK);
            
    }

    @PostMapping("/products/add-product")
    public @NotNull
    ResponseEntity<?> addProduct(@Valid @RequestBody AddProductRequest addProductRequest) {
        Product product = new Product(addProductRequest.getName(),
                addProductRequest.getSize(),
                addProductRequest.getPrice());

        Set<String> strCategories = addProductRequest.getCategory();
        Set<Category> categories = new HashSet<>();

        if (strCategories == null) {
            Category overallCategory = categoryRepository.findByName(ECategory.CATEGORY_OVERALL)
                    .orElseThrow(() -> new RuntimeException("Error: Category is not found."));
            categories.add(overallCategory);
        } else {
            strCategories.forEach(category -> {
                switch (category) {
                    case "shirt":
                        Category shirtCategory = categoryRepository.findByName(ECategory.CATEGORY_SHIRT)
                                .orElseThrow(() -> new RuntimeException("Error: Category is not found."));
                        categories.add(shirtCategory);

                        break;
                    case "skirt":
                        Category skirtCategory = categoryRepository.findByName(ECategory.CATEGORY_SKIRT)
                                .orElseThrow(() -> new RuntimeException("Error: Category is not found."));
                        categories.add(skirtCategory);

                        break;
                    case "jeans":
                        Category jeansCategory = categoryRepository.findByName(ECategory.CATEGORY_JEANS)
                                .orElseThrow(() -> new RuntimeException("Error: Category is not found."));
                        categories.add(jeansCategory);

                        break;
                    case "accessories":
                        Category accessoriesCategory = categoryRepository.findByName(ECategory.CATEGORY_ACCESSORIES)
                                .orElseThrow(() -> new RuntimeException("Error: Category is not found."));
                        categories.add(accessoriesCategory);

                        break;
                    case "shoes":
                        Category shoesCategory = categoryRepository.findByName(ECategory.CATEGORY_SHOES)
                                .orElseThrow(() -> new RuntimeException("Error: Category is not found."));
                        categories.add(shoesCategory);

                        break;
                    case "dress":
                        Category dressCategory = categoryRepository.findByName(ECategory.CATEGORY_DRESS)
                                .orElseThrow(() -> new RuntimeException("Error: Category is not found."));
                        categories.add(dressCategory);

                        break;
                    default:
                        Category overallCategory = categoryRepository.findByName(ECategory.CATEGORY_OVERALL)
                                .orElseThrow(() -> new RuntimeException("Error: Category is not found."));
                        categories.add(overallCategory);
                }
            });
        }

        Set<String> strTypes = addProductRequest.getType();
        Set<Type> types = new HashSet<>();

        if (strTypes == null) {
            Type overallType = typeRepository.findByName(EType.TYPE_OVERALL)
                    .orElseThrow(() -> new RuntimeException("Error: Type is not found."));
            types.add(overallType);
        } else {
            strCategories.forEach(category -> {
                switch (category) {
                    case "men":
                        Type menType = typeRepository.findByName(EType.TYPE_MEN)
                                .orElseThrow(() -> new RuntimeException("Error: Type is not found."));
                        types.add(menType);

                        break;
                    case "women":
                        Type womenType = typeRepository.findByName(EType.TYPE_WOMEN)
                                .orElseThrow(() -> new RuntimeException("Error: Type is not found."));
                        types.add(womenType);

                        break;
                    case "children":
                        Type childrenType = typeRepository.findByName(EType.TYPE_CHILDREN)
                                .orElseThrow(() -> new RuntimeException("Error: Type is not found."));
                        types.add(childrenType);

                        break;
                    case "babies":
                        Type babiesType = typeRepository.findByName(EType.TYPE_BABIES)
                                .orElseThrow(() -> new RuntimeException("Error: Type is not found."));
                        types.add(babiesType);

                        break;
                    default:
                        Type overallType = typeRepository.findByName(EType.TYPE_OVERALL)
                                .orElseThrow(() -> new RuntimeException("Error: Type is not found."));
                        types.add(overallType);
                }
            });
        }

        productRepository.save(product);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

}
