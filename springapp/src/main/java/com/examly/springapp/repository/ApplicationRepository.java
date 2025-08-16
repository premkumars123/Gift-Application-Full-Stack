package com.examly.springapp.repository;

import com.examly.springapp.model.Application;
import com.examly.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByApplicant(User user);
}