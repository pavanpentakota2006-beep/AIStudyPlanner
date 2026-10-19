package com.aistudyplanner.controller;

import com.aistudyplanner.entity.User;
import com.aistudyplanner.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserProfile(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
}
