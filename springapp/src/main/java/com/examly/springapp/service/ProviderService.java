package com.examly.springapp.service;

import com.examly.springapp.dto.ProviderRequest;
import com.examly.springapp.model.Provider;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.ProviderRepo;
import com.examly.springapp.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepo providerRepo;

    @Autowired
    private UserRepo userRepo; // Add this repository

    public List<Provider> getAllProviders() {
        return providerRepo.findAll();
    }

    public Optional<Provider> getProviderById(Long id) {
        return providerRepo.findById(id);
    }

    public Provider saveProvider(ProviderRequest request) {
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + request.getUserId()));

        Provider provider = new Provider();
        provider.setUser(user);
        provider.setBusinessName(request.getBusinessName());
        provider.setContactPerson(request.getContactPerson());
        provider.setEmail(request.getEmail());
        provider.setPhoneNumber(request.getPhoneNumber());

        return providerRepo.save(provider);
    }

    public Provider updateProvider(Long id, ProviderRequest request) {
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + request.getUserId()));

        Provider provider = providerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Provider not found with ID: " + id));

        provider.setUser(user);
        provider.setBusinessName(request.getBusinessName());
        provider.setContactPerson(request.getContactPerson());
        provider.setEmail(request.getEmail());
        provider.setPhoneNumber(request.getPhoneNumber());

        return providerRepo.save(provider);
    }

    public void deleteProvider(Long id) {
        providerRepo.deleteById(id);
    }
}
