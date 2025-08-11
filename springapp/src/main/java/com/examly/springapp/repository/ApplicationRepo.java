package com.examly.springapp.repository;

import com.examly.springapp.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepo extends JpaRepository<Application, Long> {

    }
    