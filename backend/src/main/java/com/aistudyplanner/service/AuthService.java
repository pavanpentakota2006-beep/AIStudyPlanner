package com.aistudyplanner.service;

import com.aistudyplanner.dto.LoginRequest;
import com.aistudyplanner.dto.RegisterRequest;
import com.aistudyplanner.entity.User;
import com.aistudyplanner.repository.UserRepository;
import com.aistudyplanner.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public Map<String, Object> login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseGet(() -> User.builder()
                        .id(101L)
                        .name("Alex Johnson")
                        .email(request.getEmail())
                        .department("Computer Science & Engineering")
                        .semester("7th Semester")
                        .role(User.Role.STUDENT)
                        .build());

        String token = "demo_jwt_token_" + System.currentTimeMillis();
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return response;
    }

    public User register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return userRepository.findByEmail(request.getEmail()).orElse(null);
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .department(request.getDepartment())
                .semester(request.getSemester())
                .role(User.Role.STUDENT)
                .build();

        return userRepository.save(user);
    }
}
