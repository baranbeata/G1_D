package com.example.security.controllers;

import com.example.security.models.Product;
import com.example.security.models.Category;
import com.example.security.models.ECategory;
import com.example.security.models.Type;
import com.example.security.models.EType;
import com.example.security.models.Size;
import com.example.security.models.ESize;
import com.example.security.payload.request.AddProductRequest;
import com.example.security.payload.response.MessageResponse;
import com.example.security.models.Shop;
import com.example.security.repository.ProductRepository;
import com.example.security.repository.SizeRepository;
import com.example.security.repository.CategoryRepository;
import com.example.security.repository.TypeRepository;
import com.example.security.security.jwt.JwtUtils;
import com.example.security.repository.ShopRepository;
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
    SizeRepository sizeRepository;

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
    @CrossOrigin(origins="http://localhost:8081")
    public @NotNull ResponseEntity<Optional<Product>> getSingleProduct(@PathVariable long id) {

        return new ResponseEntity<>(productRepository.findById(id), HttpStatus.OK);

    }

    @PostMapping("/add-product")
    public @NotNull
    ResponseEntity<?> addProduct(@Valid @RequestBody AddProductRequest addProductRequest) {
        Product product = new Product(addProductRequest.getName(), addProductRequest.getPrice());

        Set<String> strSizes = addProductRequest.getSize();
        Set<Size> sizes = new HashSet<>();

        System.out.println("Ania");

        if (strSizes == null) {
            Size overallSize = sizeRepository.findByName(ESize.ONE_SIZE)
                    .orElseThrow(() -> new RuntimeException("Error: Size is not found."));
            sizes.add(overallSize);
        } else {
            strSizes.forEach(size -> {
                switch (size) {
                    case "xs":
                        Size xs = sizeRepository.findByName(ESize.SIZE_XS)
                                .orElseThrow(() -> new RuntimeException("Error: Size is not found."));
                        sizes.add(xs);

                        break;
                    case "s":
                        Size s = sizeRepository.findByName(ESize.SIZE_S)
                                .orElseThrow(() -> new RuntimeException("Error: Size is not found."));
                        sizes.add(s);

                        break;
                    case "m":
                        Size m = sizeRepository.findByName(ESize.SIZE_M)
                                .orElseThrow(() -> new RuntimeException("Error: Size is not found."));
                        sizes.add(m);

                        break;
                    case "l":
                        Size l = sizeRepository.findByName(ESize.SIZE_L)
                                .orElseThrow(() -> new RuntimeException("Error: Size is not found."));
                        sizes.add(l);

                        break;
                    case "xl":
                        Size xl = sizeRepository.findByName(ESize.SIZE_XL)
                                .orElseThrow(() -> new RuntimeException("Error: Size is not found."));
                        sizes.add(xl);
                        break;
                    default:
                        Size oneSize = sizeRepository.findByName(ESize.ONE_SIZE)
                                .orElseThrow(() -> new RuntimeException("Error: Size is not found."));
                        sizes.add(oneSize);
                }
            });
        }


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
            strTypes.forEach(type -> {
                switch (type) {
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
        return ResponseEntity.ok(new MessageResponse("Product added successfully!"));
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

}
