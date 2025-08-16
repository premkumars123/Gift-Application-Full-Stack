package com.examly.springapp.controller;

import com.examly.springapp.dto.ApplicationRequestDTO;
import com.examly.springapp.model.Application;
import com.examly.springapp.model.User;
import com.examly.springapp.service.ApplicationService;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private UserService userService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitApplication(@RequestBody ApplicationRequestDTO dto) {
        Optional<User> userOpt = userService.findById(dto.getApplicantId());

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid applicant user ID: " + dto.getApplicantId());
        }

        Application app = new Application();
        app.setApplicant(userOpt.get());
        app.setBusinessName(dto.getBusinessName());
        app.setContactPerson(dto.getContactPerson());
        app.setPortfolioLink(dto.getPortfolioLink());
        app.setComments(dto.getComments());

        Application savedApp = applicationService.submitApplication(app);
        return ResponseEntity.ok(savedApp);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Application>> getApplicationsByUser(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);
        List<Application> applications = applicationService.getApplicationsByUser(user);
        return ResponseEntity.ok(applications);
    }
}