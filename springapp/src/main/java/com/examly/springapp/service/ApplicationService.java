package com.examly.springapp.service;

import com.examly.springapp.model.Application;
import com.examly.springapp.repository.ApplicationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepo applicationRepo;

    public List<Application> getAllApplications() {
        return applicationRepo.findAll();
    }

    public Optional<Application> getApplicationById(Long id) {
        return applicationRepo.findById(id);
    }

    public Application saveApplication(Application application) {
        return applicationRepo.save(application);
    }

    public Application updateApplication(Long id, Application application) {
        application.setId(id);
        return applicationRepo.save(application);
    }

    public void deleteApplication(Long id) {
        applicationRepo.deleteById(id);
    }
}
