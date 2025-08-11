package com.examly.springapp.repository;

import com.examly.springapp.model.Provider;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProviderRepo extends JpaRepository<Provider, Long> {

    }
    