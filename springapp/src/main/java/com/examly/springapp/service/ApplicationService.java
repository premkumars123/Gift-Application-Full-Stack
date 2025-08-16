package com.examly.springapp.service;

import com.examly.springapp.model.Application;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public List<Application> getApplicationsByUser(User user) {
        return applicationRepository.findByApplicant(user);
    }

    public Application submitApplication(Application application) {
        application.setCreatedAt(LocalDateTime.now());
        application.setStatus(Application.Status.PENDING);
        return applicationRepository.save(application);
    }
}