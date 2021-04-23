package com.example.BabaApp.users;

import java.util.Optional;
import java.util.Collection;

public interface UserServiceInterface {
    public Optional<User> findUserByEmail(String email);
    public Optional<User> findUserByResetToken(String resetToken);
    public void save(User user);
}
