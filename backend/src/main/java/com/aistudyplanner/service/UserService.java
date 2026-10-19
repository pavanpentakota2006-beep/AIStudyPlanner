package com.aistudyplanner.service;

import com.aistudyplanner.entity.User;
import com.aistudyplanner.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseGet(() -> User.builder()
                        .id(id)
                        .name("Alex Johnson")
                        .email("alex.johnson@university.edu")
                        .department("Computer Science & Engineering")
                        .semester("7th Semester")
                        .targetGpa(3.95)
                        .dailyTargetHours(4.5)
                        .build());
    }
}
