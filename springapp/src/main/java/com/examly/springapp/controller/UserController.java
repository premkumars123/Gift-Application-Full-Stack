package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users", description = "Operations for managing users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    @Operation(summary = "List all users")
    public List<User> list() { return userRepository.findAll(); }

    @PostMapping
    @Operation(summary = "Create a user")
    public User create(@RequestBody User body) { return userRepository.save(body); }

    @GetMapping("/{id}")
    @Operation(summary = "Get a user by id")
    public ResponseEntity<User> get(@PathVariable Long id) {
        return userRepository.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}

