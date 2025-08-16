package com.examly.springapp.service;

import com.examly.springapp.model.Provider;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepository providerRepository;

    public Provider save(Provider provider) {
        return providerRepository.save(provider);
    }

    public Optional<Provider> getByUser(User user) {
        return providerRepository.findByUser(user);
    }
}