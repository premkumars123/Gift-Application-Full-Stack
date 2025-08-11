package com.examly.springapp.service;

import com.examly.springapp.model.Provider;
import com.examly.springapp.repository.ProviderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepo providerRepo;

    public List<Provider> getAllProviders() {
        return providerRepo.findAll();
    }

    public Optional<Provider> getProviderById(Long id) {
        return providerRepo.findById(id);
    }

    public Provider saveProvider(Provider provider) {
        return providerRepo.save(provider);
    }

    public Provider updateProvider(Long id, Provider provider) {
        provider.setId(id);
        return providerRepo.save(provider);
    }

    public void deleteProvider(Long id) {
        providerRepo.deleteById(id);
    }
}
