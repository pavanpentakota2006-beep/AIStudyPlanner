package com.aistudyplanner.controller;

import com.aistudyplanner.dto.AIPlanRequest;
import com.aistudyplanner.service.AIPlannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIPlannerService aiPlannerService;

    @PostMapping("/generate-schedule")
    public ResponseEntity<Map<String, Object>> generateSchedule(@RequestBody AIPlanRequest request) {
        return ResponseEntity.ok(aiPlannerService.generateAISchedule(request));
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, Object>> chatWithAI(@RequestBody Map<String, String> body) {
        String prompt = body.get("prompt");
        return ResponseEntity.ok(aiPlannerService.generateChatResponse(prompt));
    }
}
