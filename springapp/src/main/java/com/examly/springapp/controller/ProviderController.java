package com.examly.springapp.controller;

import com.examly.springapp.dto.ProviderRequest;
import com.examly.springapp.model.Provider;
import com.examly.springapp.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/providers")
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    @GetMapping
    public List<Provider> getAllProviders() {
        return providerService.getAllProviders();
    }

    @GetMapping("/{id}")
    public Optional<Provider> getProviderById(@PathVariable Long id) {
        return providerService.getProviderById(id);
    }

    @PostMapping
    public Provider createProvider(@RequestBody ProviderRequest request) {
        return providerService.saveProvider(request);
    }

    @PutMapping("/{id}")
    public Provider updateProvider(@PathVariable Long id, @RequestBody ProviderRequest request) {
        return providerService.updateProvider(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteProvider(@PathVariable Long id) {
        providerService.deleteProvider(id);
    }
}
