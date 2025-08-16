package com.examly.springapp.controller;

import com.examly.springapp.model.Provider;
import com.examly.springapp.model.User;
import com.examly.springapp.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/providers")
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    @PostMapping("/")
    public ResponseEntity<Provider> createProvider(@RequestBody Provider provider) {
        Provider savedProvider = providerService.save(provider);
        return ResponseEntity.ok(savedProvider);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Provider> getProviderByUser(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);
        Optional<Provider> providerOpt = providerService.getByUser(user);
        return providerOpt.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}