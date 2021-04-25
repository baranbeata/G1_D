package com.example.BabaApp.users;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import lombok.*;
import org.springframework.lang.NonNull;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@ToString

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NonNull
    private String username;

    //@Transient it can be added if we want to hide password in db
    @NonNull
    //@Size(min=8, max=30) to do
    private String password;

    @NonNull
    private String email;

    @NonNull
    private String resetToken;

    @NonNull
    private String role;
}
