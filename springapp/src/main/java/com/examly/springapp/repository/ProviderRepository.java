package com.examly.springapp.repository;

import com.examly.springapp.model.Provider;
import com.examly.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProviderRepository extends JpaRepository<Provider, Long> {
    Optional<Provider> findByUser(User user);
}