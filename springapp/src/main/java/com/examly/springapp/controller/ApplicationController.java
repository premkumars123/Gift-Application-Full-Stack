package com.examly.springapp.controller;

import com.examly.springapp.model.Application;
import com.examly.springapp.repository.ApplicationRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@Tag(name = "Applications", description = "Operations for managing applications")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;

    public ApplicationController(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @GetMapping
    @Operation(summary = "List all applications")
    public List<Application> list() {
        return applicationRepository.findAll();
    }

    @GetMapping("/applicant/{applicantId}")
    @Operation(summary = "List applications for an applicant")
    public List<Application> listByApplicant(@PathVariable Long applicantId) {
        return applicationRepository.findByApplicantId(applicantId);
    }

    @PostMapping
    @Operation(summary = "Create a new application")
    public Application create(@RequestBody Application body) {
        return applicationRepository.save(body);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an application")
    public ResponseEntity<Application> update(@PathVariable Long id, @RequestBody Application body) {
        return applicationRepository.findById(id)
                .map(existing -> {
                    existing.setBusinessName(body.getBusinessName());
                    existing.setContactPerson(body.getContactPerson());
                    existing.setPortfolioLink(body.getPortfolioLink());
                    existing.setStatus(body.getStatus());
                    existing.setComments(body.getComments());
                    return ResponseEntity.ok(applicationRepository.save(existing));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

